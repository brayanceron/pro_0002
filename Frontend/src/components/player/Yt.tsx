import { useContext, useEffect, useRef, useState,/*  useImperativeHandle, forwardRef */ } from 'react';
import { ProgressBarPlayer } from './ProgressBarPlayer';
import { getYouYubeVideoId, isValidYouTubeUrl } from '../../utils/urls';
import { PlayListContext } from '../../context/PlayListContext';

interface Props {
    url: string,
    playing: boolean,
    onFinishSong : () => void,
    setPlaying: (val: boolean) => void,
}

declare global {
    interface Window {
        YT: any;
        onYouTubeIframeAPIReady: () => void;
    }
}

//TODO what happen when video is paused for slow connection?
//TODO verify if url is a youtube url
export const YouTubePlayer = ({ url, playing, setPlaying, onFinishSong } : Props) => {
    const { currentIndex } = useContext(PlayListContext);

    const playerRef = useRef<HTMLDivElement>(null);
    const playerInstance = useRef<any>(null);
    const [error, setError] = useState<boolean>(!isValidYouTubeUrl(url));
    const [duration, setDuration] = useState(0)// const [duration, setDuration] = useState(-2)
    const [playerState, setPlayerState] = useState<number | null>(null);


    useEffect(() => { exec(); }, [playing]);
    useEffect(() => { 
        if(error) return;
        if (playerState == 0 ) { onFinishSong(); }
        if (playerState == 1 ) { setError(false);} // if (status == 1 ) { setPlaying(true); setError(false);}
        setterDuration();
    }, [playerState]);

    useEffect(() => {
        if(!error) return;
        setDuration(0);
        setterDuration();
        setPlayerState(null);
        if(playerInstance.current && playerInstance.current.pauseVideo) playerInstance.current.pauseVideo();
    }, [error]);
    
    useEffect(() => {
        console.log("INDEX :: ", currentIndex)
        setError(!isValidYouTubeUrl(url));
        setDuration(0)
        exec()

        const videoId = isValidYouTubeUrl(url) ? getYouYubeVideoId(url) : null;
        if (!videoId || !playerInstance.current || !playerInstance.current.loadVideoById) return; // if (!videoId || !playerRef.current || !playerInstance || !playerInstance.current) return;
        playerInstance.current.loadVideoById(videoId)
        setterDuration();
        exec()
    }, [currentIndex, url]);
    // }, [currentIndex]) //[currentIndex, url]


    const exec = () => {
        if(error) return;
        if (!playerInstance.current || !playerInstance || !playerInstance.current.pauseVideo || !playerInstance.current.playVideo) return; // if (!playerInstance.current || !playerInstance || !playerInstance.current.getDuration) return;

        if (playing) { playerInstance.current.playVideo(); }
        else { playerInstance.current.pauseVideo(); }
    }

    const setterDuration = () => {
        if(error) return;
        if(playerInstance.current && playerInstance.current.getDuration) { setDuration(playerInstance.current.getDuration()); }
    }
    /* 
    const getVideoData = () => {
        if (!playerInstance.current || !playerInstance || !playerInstance.current.getDuration) return null;
        // console.log("INFO>>>", playerInstance.current.getVideoData());
        return playerInstance.current.getVideoData();
    }
    */

    const onChangeProgress = (newVal : number) => {
        if(!playerInstance.current || !playerInstance || !playerInstance.current.seekTo) return;
        playerInstance.current.seekTo(newVal, true);
    }

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
                },
                events: {
                    onReady: () => {
                        console.log("--- PLAYER READY");
                        setterDuration();
                        setError(false)
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

        return () => { 
            if (playerInstance.current?.destroy) { playerInstance.current.destroy(); }
        };
    }, []);// [url]

    return (
        <>
            <div ref={playerRef} id="youtube-player" className='hidden' ></div>
                {
                        error ? <p>Error loading youtube video</p> :
                            <ProgressBarPlayer duration={duration} playing={playing} onChangeTime={onChangeProgress}/>
                }
        </>);
}




/* const getVideoId = (url: string): string | null => {
    // if(!url.includes("youtube") ) return null
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}; */


// ======================================================================
// import { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';

// interface Props {
//     videoUrl: string;
// }

// export interface YouTubePlayerHandle {
//     play: () => void;
//     pause: () => void;
// }

// declare global {
//     interface Window {
//         YT: any;
//         onYouTubeIframeAPIReady: () => void;
//     }
// }

// const getVideoId = (url: string): string | null => {
//     // if(!url.includes("youtube") ) return null
//     const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/;
//     const match = url.match(regex);
//     return match ? match[1] : null;
// };

// export const YouTubePlayer = forwardRef<YouTubePlayerHandle, Props>(
//     ({ videoUrl }, ref) => {

//         const playerRef = useRef<HTMLDivElement>(null);
//         const playerInstance = useRef<any>(null);

//         useImperativeHandle(ref, () => ({
//             play: () => {
//                 if (playerInstance.current?.playVideo) {
//                     playerInstance.current.playVideo();
//                 }
//             },
//             pause: () => {
//                 if (playerInstance.current?.pauseVideo) {
//                     playerInstance.current.pauseVideo();
//                 }
//             }
//         }));

//         useEffect(() => {
//             const videoId = getVideoId(videoUrl);
//             console.log("YT => ", videoUrl, videoId)
//             if (!videoId || !playerRef.current) return;

//             const onYouTubeIframeAPIReady = () => {
//                 playerInstance.current = new window.YT.Player(playerRef.current, {
//                     videoId,
//                     events: {},
//                     playerVars: {
//                         autoplay: 0,
//                         controls: 1,
//                     },
//                 });
//             };

//             if (!window.YT || !window.YT.Player) {
//                 const tag = document.createElement('script');
//                 tag.src = 'https://www.youtube.com/iframe_api';
//                 document.body.appendChild(tag);
//                 window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
//             } else {
//                 onYouTubeIframeAPIReady();
//             }

//             return () => {
//                 if (playerInstance.current?.destroy) {
//                     playerInstance.current.destroy();
//                 }
//             };
//         }, [videoUrl]);

//         return <div ref={playerRef} id="youtube-player" />;
//     }
// );
