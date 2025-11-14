import { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';
import { ProgressBarPlayer } from './ProgressBarPlayer';
import { getYouYubeVideoId } from '../../utils/urls';

interface Props {
    url: string,
    index: string,
}

export interface YouTubePlayerHandle {
    play: () => void;
    pause: () => void;
    getVideoData: () => any;
}

declare global {
    interface Window {
        YT: any;
        onYouTubeIframeAPIReady: () => void;
    }
}

/* const getVideoId = (url: string): string | null => {
    // if(!url.includes("youtube") ) return null
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}; */

export const YouTubePlayer = forwardRef<YouTubePlayerHandle, Props>(({ url, index }, ref) => {

    const playerRef = useRef<HTMLDivElement>(null);
    const playerInstance = useRef<any>(null);
    const [playerState, setPlayerState] = useState(-1);

    const [playing, setPlaying] = useState(false)
    const [error, setError] = useState(false)
    const [isLoadingSrc, setIsLoadingSrc] = useState(true)
    const [duration, setDuration] = useState(0)

    const play = () => { if (!playerInstance.current) return; setPlaying(true); }
    const pause = () => { if (!playerInstance.current) return; setPlaying(false); }
    useImperativeHandle(ref, () => ({ play, pause, getVideoData }));

    {/* PROGRESS SECTION */ }
    function see() {
        console.log("$$$$$$$$$$$$$")
        console.log("YT =>", url)
        console.log("isLoadingSrc = ", isLoadingSrc)
        console.log("playerInstance = ", playerInstance)
        console.log("playing = ", playing)
        console.log("$$$$$$$$$$$$$")
    }

    useEffect(() => { exec(); see(); }, [playing]);
    useEffect(() => { exec(); }, [isLoadingSrc]);
    // useEffect(() => { rep.current!.src = url; }, [index]);
    // useEffect(() => { loadStart() }, [index]);
    useEffect(() => {
        loadStart()
        setTimeout(() => { onLoaded() }, 200)
        // onLoaded()
        see()

    }, [index]);
    // useEffect(() => { see() }, [playing]);




    const exec = () => { // console.log("playing=", playing, " isLoading=", isLoading)
        // console.log("isLoadingSrc = " ,isLoadingSrc)
        // console.log("playerInstance = " ,playerInstance)
        if (!playerInstance.current || !playerInstance || !playerInstance.current.getDuration) return;
        if (isLoadingSrc == true) return;

        if (playing) { playerInstance.current.playVideo(); }
        else { playerInstance.current.pauseVideo(); }
        //  if (playing) { rep.current!.play(); }
        //  else { rep.current!.pause(); }
    }

    const onLoaded = () => {
        // if(!playerInstance.current) return setIsLoadingSrc(true);
        if (!playerInstance.current || !playerInstance || !playerInstance.current.getDuration) return setIsLoadingSrc(true);
        setIsLoadingSrc(false);
    }
    const loadStart = () => {
        // if(!playerInstance.current) return setIsLoadingSrc(true);

        if (!playerInstance.current || !playerInstance || !playerInstance.current.getDuration) return setIsLoadingSrc(true);
        setIsLoadingSrc(true);
    }

    const getVideoData = () => {
        if (!playerInstance.current || !playerInstance || !playerInstance.current.getDuration) return null;
        // console.log("INFO>>>", playerInstance.current.getVideoData());
        return playerInstance.current.getVideoData();
    }

    useEffect(() => {
        // const videoId = isYt()? getVideoId(url) : getVideoId("https://www.youtube.com/watch?v=EfdsfdsfsaI");
        const videoId = isYt() ? getYouYubeVideoId(url) : getYouYubeVideoId("https://www.youtube.com/watch?v=videofalsoo");
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
                        onLoaded()
                        setDuration(playerInstance.current.getDuration())
                        setError(false)
                    },
                    onStateChange: (event: any) => {
                        setPlayerState(event.data)
                    },
                    onAutoplayBlocked: () => {
                        setPlaying(false)
                    },
                    onError: () => {
                        setError(true);
                    }
                },
            });
        };

        if (!window.YT || !window.YT.Player) {
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            document.body.appendChild(tag);
            window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
        } else {
            onYouTubeIframeAPIReady();
        }

        return () => {
            if (playerInstance.current?.destroy) {
                playerInstance.current.destroy();
            }
        };
    }, [url]);

    useEffect(() => {
        console.log(">>>  playerState", playerState)
        // console.log("isLoadingSrc", isLoadingSrc)
        // console.log("playing", playing)
        // console.log("duration = ", playerInstance.current.getDuration())
        // if (playerState == -1 ) {  console.log("duration = ", playerInstance.current.getDuration()) } 
        // if (playerState == 0 ) {  console.log("duration0 = ", playerInstance.current.getDuration()) } 
        // if (playerState == 1 ) {  console.log("duration1 = ", playerInstance.current.getDuration()) } 
        // if (playerState == 2 ) {  console.log("duration2 = ", playerInstance.current.getDuration()) } 
        // if (playerState == 3 ) {  console.log("duration3 = ", playerInstance.current.getDuration()) } 
        // if (playerState == 5 ) {  console.log("duration5 = ", playerInstance.current.getDuration()) } 
        // if (playerState == -1 ) { loadStart() } 
        // if (playerState == -1 ) { onLoaded() } 
        // if (playerState === 0 ) {  } 
        // if (playerState === 1 ) { onLoaded() } 
        // if (playerState === 2 ) { onLoaded() } 
        // if (playerState == 3 ) {  onLoaded() } 
        // if (playerState === 4 ) {  } 
        // if (playerState == 5 ) { onLoaded() } 
        // onLoaded()
        // if(playerInstance.current) onLoaded()


    }, [playerState])


    /* function getInfoVideo() {
        playerInstance.current.getDuration()
     } */


    function onChangeProgress() { }
    function isYt() { return url.includes("youtube.com") }

    return (
        <>
            <div ref={playerRef} id="youtube-player" className='hidden' ></div>
            <div>
                {
                    isYt() ?
                        <ProgressBarPlayer
                            key={url}
                            url={url}
                            duration={duration}
                            playing={playing}
                            isLoadingSrc={isLoadingSrc}
                            onChangeProgress={onChangeProgress}
                            error={error}
                        />
                        : <p>src video</p>
                }
            </div>
        </>);
}
);





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
