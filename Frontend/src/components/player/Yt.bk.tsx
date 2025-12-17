import { useContext, useEffect, useRef, useState, useImperativeHandle, forwardRef, } from 'react';
import { getYouYubeVideoId, isValidYouTubeUrl } from '../../utils/urls';
import { PlayListContext } from '../../context/PlayListContext';

interface Props {
    url: string,
    playing: boolean,
    onFinishSong : () => void,
    onChangeStates: (error: boolean, duration: number, currentTime: number) => void,
    setPlaying: (val: boolean) => void,
}

declare global {
    interface Window {
        YT: any;
        onYouTubeIframeAPIReady: () => void;
    }
}

//TODO what happen when video is paused for slow connection?
// BUG when there is error to playing song and player play next song, it pass 2 songs
export const YouTubePlayer = forwardRef(({ url, playing, setPlaying, onFinishSong, onChangeStates } : Props, ref) => {
    const { currentIndex, /* playList */ } = useContext(PlayListContext);

    const playerRef = useRef<HTMLDivElement>(null);
    const playerInstance = useRef<any>(null);

    const [error, setError] = useState<boolean>(!isValidYouTubeUrl(url));
    const [duration, setDuration] = useState(0)// const [duration, setDuration] = useState(-2)
    const [playerState, setPlayerState] = useState<number | null>(null);

    useEffect(() => { exec(); }, [playing]);
    useEffect(() => { 
        if (playerState == 0 ) { if(!error) onFinishSong(); }
        if (playerState == 1 ) { setError(false);} // if (status == 1 ) { setPlaying(true); setError(false);}
        setterDuration();
    }, [playerState]);

    useEffect(() => {
        // if(isValidYouTubeUrl(url)==false) return; //HACK
        if(!error) return;
        setterDuration();
        setPlayerState(null);
        if(playerInstance.current && playerInstance.current.pauseVideo) playerInstance.current.pauseVideo();
    }, [error]);
    
    useEffect(() => {
        if(error && isValidYouTubeUrl(url) == false) return; 
        onChangeStates(error, duration, playerInstance.current && playerInstance.current.getCurrentTime ? playerInstance.current.getCurrentTime() : 0);
    }, [error, duration, playing]);

    
    useEffect(() => {
        // if(isValidYouTubeUrl(url)==false) return; //HACK
        setError(!isValidYouTubeUrl(url));
        exec()

        const videoId = isValidYouTubeUrl(url) ? getYouYubeVideoId(url) : 'null';
        // if (!videoId || !playerInstance.current || !playerInstance.current.loadVideoById) return; // if (!videoId || !playerRef.current || !playerInstance || !playerInstance.current) return;
        if (!playerInstance.current || !playerInstance.current.loadVideoById) return; // if (!videoId || !playerRef.current || !playerInstance || !playerInstance.current) return;
        playerInstance.current.loadVideoById(videoId)
        setterDuration();
        exec()
    }, [currentIndex, url]);


    const exec = () => {
        if (!playerInstance.current || !playerInstance || !playerInstance.current.pauseVideo || !playerInstance.current.playVideo) return; // if (!playerInstance.current || !playerInstance || !playerInstance.current.getDuration) return;
        if(error) playerInstance.current.pauseVideo(); // if(error) return;
        // if(error || !isValidYouTubeUrl(url)) playerInstance.current.pauseVideo(); // if(error) return;

        if (playing) { playerInstance.current.playVideo(); }
        else { playerInstance.current.pauseVideo(); }
    }

    const setterDuration = () => {
        if(isValidYouTubeUrl(url)==false) return; //HACK
        if(error) setDuration(-1); // if(error) return;
        if(playerInstance.current && playerInstance.current.getDuration) { setDuration(playerInstance.current.getDuration()); }
    }
    /* 
    const getVideoData = () => {
        if (!playerInstance.current || !playerInstance || !playerInstance.current.getDuration) return null;
        // console.log("INFO>>>", playerInstance.current.getVideoData());
        return playerInstance.current.getVideoData();
    }
    */

    useEffect(() => {
        setError(!isValidYouTubeUrl(url));
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
                        console.log("--- PLAYER READY");
                        setterDuration();
                        setPlayerState(-1);
                        setError(false)
                        exec();
                    },
                    onStateChange: (event: any) => { setPlayerState(event.data); },
                    onAutoplayBlocked: () => { setPlaying(false); },
                    onError: () => { setError(true); },
                },
            });
        };

        if (!window.YT || !window.YT.Player) {
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            document.body.appendChild(tag);
            window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
        } 
        else { onYouTubeIframeAPIReady();}
        // exec();

        return () => { 
            if (playerInstance.current?.destroy) { playerInstance.current.destroy(); }
        };
    }, []);// [url]

    useImperativeHandle(ref, () => ({
        onChangeProgress(newVal: number) {
            if(playerInstance.current && playerInstance.current.seekTo) playerInstance.current.seekTo(newVal, true);
        },
        /* getCurrentTime : () => { 
            if(!playerInstance.current || !playerInstance || !playerInstance.current.getCurrentTime) return 0;
            return playerInstance.current.getCurrentTime();
        } // get currentTime() { */
    }));
    return (
        <>
            <div className={`w-full ${error ? 'hidden' : ''}`}>
                <div ref={playerRef} id="youtube-player" className={`w-full`}></div>
            </div>
                {
                        error && <p>Error loading youtube video</p>
                }
        </>);
})
// }

