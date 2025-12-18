import { useContext, useEffect, useRef, useImperativeHandle, forwardRef, useReducer, } from 'react';
import { getYouYubeVideoId, /* isValidSrcUrl, */ isValidYouTubeUrl } from '../../utils/urls';
import { PlayListContext } from '../../context/PlayListContext';

interface Props {
    url: string,
    playing: boolean,
    onFinishSong: () => void,
    onChangeStates: (error: boolean, duration: number, currentTime: number) => void,
    setPlaying: (val: boolean) => void,
}

declare global {
    interface Window {
        YT: any;
        onYouTubeIframeAPIReady: () => void;
    }
}

interface PlayerStates {
    error: boolean | null,
    duration: number | null,
    playerState: number | null,
}
type ReduxAction = {
    type: string,
    payload: PlayerStates,
}

const reducer = (prevState: PlayerStates, action: ReduxAction): PlayerStates => {
    let { duration, error, playerState } = action.payload;
    switch (action.type) {
        case 'ERROR': { return { playerState: null, error, duration: -1 } }
        case 'PLAYERSTATE': { 
            if(prevState.error) { return prevState; } // it solves a bug where error was overwritten, becuase onError event was called before that this event
            return { error: playerState == 1 ? false : error, playerState, duration }; 
        }
        case 'ONCHANGEURL': { return { error : null, duration, playerState: null } } // case 'ONCHANGEURL': { return { error, duration, playerState: null } }
        default: { return prevState; }
    }
}

export const YouTubePlayer = forwardRef(({ url, playing, setPlaying, onFinishSong, onChangeStates }: Props, ref) => {
    const playerRef = useRef<HTMLDivElement>(null);
    const playerInstance = useRef<any>(null);
    const { currentIndex } = useContext(PlayListContext);

    const initialState: PlayerStates = { error: !isValidYouTubeUrl(url), duration: 0, playerState: null };
    const [plState, dispatch] = useReducer(reducer, initialState);

    const exec = () => {
        if (!playerInstance.current || !playerInstance || !playerInstance.current.pauseVideo || !playerInstance.current.playVideo) return; // if (!playerInstance.current || !playerInstance || !playerInstance.current.getDuration) return;
        if (plState.error) playerInstance.current.pauseVideo();
        if (playing) { playerInstance.current.playVideo(); }
        else { playerInstance.current.pauseVideo(); }
    }

    const getDuration = () => { //FIXME - current error or new error???
        if (isValidYouTubeUrl(url) == false) return -1;
        if (playerInstance.current && playerInstance.current.getDuration) { return playerInstance.current.getDuration(); }
        return -1;
    }

    useEffect(() => { exec(); }, [playing]);

    useEffect(() => {
        if (plState.error && isValidYouTubeUrl(url) == false /* && isValidSrcUrl(url) */) return;
        const newDuration = getDuration();
        if (newDuration == null || newDuration <= 0 && !plState.error) return; // if (newDuration == null || newDuration <= 0) return;
        console.log("CALL FROM :: YtPlayer")

        onChangeStates(plState.error != null ? plState.error : false, newDuration, playerInstance.current && playerInstance.current.getCurrentTime ? playerInstance.current.getCurrentTime() : 0);
        if (plState.playerState === 0 && !plState.error) { onFinishSong(); }
        // FIXME - DURATION BUG
        /* NOTE : pltState.duration was giving wrong duration, so it is necessary to get duration again with getDuration(). 
        for solving this, it is necessary add a useEffect that updates duration when video is loaded(plState.state is good) */
    }, [plState.playerState, plState.error, plState.duration]);

    useEffect(() => {
        dispatch({ type: 'ONCHANGEURL', payload: { error: null, duration: getDuration(), playerState: null } }) // dispatch payload without side-effect functions; run side-effects after dispatch
        changeUrl();
    }, [currentIndex, url]);

    /* 
    const getVideoData = () => {
        if (!playerInstance.current || !playerInstance || !playerInstance.current.getDuration) return null;
        // console.log("INFO>>>", playerInstance.current.getVideoData());
        return playerInstance.current.getVideoData();
    }
    */
    const changeUrl = () => {
        const videoId = isValidYouTubeUrl(url) ? getYouYubeVideoId(url) : 'null';
        // if (!videoId || !playerInstance.current || !playerInstance.current.loadVideoById) return; // if (!videoId || !playerRef.current || !playerInstance || !playerInstance.current) return;
        if (!playerInstance.current || !playerInstance.current.loadVideoById) return; // if (!videoId || !playerRef.current || !playerInstance || !playerInstance.current) return;
        playerInstance.current.loadVideoById(videoId)
        exec()
    }

    useEffect(() => {
        const videoId = isValidYouTubeUrl(url) ? getYouYubeVideoId(url) : getYouYubeVideoId("https://www.youtube.com/watch?v=videofalsoo"); // const videoId = isYt()? getVideoId(url) : getVideoId("https://www.youtube.com/watch?v=EfdsfdsfsaI");
        if (!videoId || !playerRef.current) return;

        const onYouTubeIframeAPIReady = () => {
            playerInstance.current = new window.YT.Player(playerRef.current, {
                videoId,
                playerVars: {
                    autoplay: 0,
                    controls: 1,
                    rel: 0,
                },
                events: {
                    onReady: () => {
                        dispatch({ type: 'PLAYERSTATE', payload: { error: false, duration: getDuration(), playerState: null } })
                        exec();
                    },
                    // onStateChange: (event: any) => { dispatch({type : 'PLAYERSTATE', payload : {playerState : event.data, error : null, duration : getDuration()}}) },
                    onStateChange: (event: any) => { dispatch({ type: 'PLAYERSTATE', payload: { playerState: event.data, error: false, duration: getDuration() } }) },
                    onAutoplayBlocked: () => { setPlaying(false); },
                    onError: () => {
                        dispatch({ type: 'ERROR', payload: { error: true, duration: -1, playerState: null } })
                    },
                },
            });
        };

        if (!window.YT || !window.YT.Player) {
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            document.body.appendChild(tag);
            window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
        }
        else { onYouTubeIframeAPIReady(); }

        return () => { if (playerInstance.current?.destroy) { playerInstance.current.destroy(); } };
    }, []);

    useImperativeHandle(ref, () => ({
        onChangeProgress(newVal: number) {
            if (playerInstance.current && playerInstance.current.seekTo) playerInstance.current.seekTo(newVal, true);
        },
        /* getCurrentTime : () => { 
            if(!playerInstance.current || !playerInstance || !playerInstance.current.getCurrentTime) return 0;
            return playerInstance.current.getCurrentTime();
        } // get currentTime() { */
    }));
    return (
        <>
            <div className={`w-full ${plState.error ? 'hidden' : ''}`}>
                <div ref={playerRef} id="youtube-player" className={`w-full`}></div>
            </div>
            {plState.error && <p>Error loading youtube video</p>}
        </>);
})
// }

/* let newerror = error;
            if (playerState == 1 ) { newerror = false; } // if (status == 1 ) { setPlaying(true); setError(false);}
            return {error : newerror, playerState, duration }  */