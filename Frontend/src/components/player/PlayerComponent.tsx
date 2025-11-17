import { useRef, useContext, useState } from "react"

import songDefault from "../../assets/songDefault.jpeg"
import { YouTubePlayer } from "./Yt"; //TODO change name to YouTubePlayer
import { SrcPlayer, type HandleSrc } from "./SrcPlayer"
import { PlayListContext } from "../../context/PlayListContext"
import { getUrlBySong, isValidYouTubeUrl } from "../../utils/urls"
import './style.css'


const PlayerComponent = () => {
    const { playList, currentIndex, setCurrentIndex } = useContext(PlayListContext);
    const songs: string[] = playList.map(s => getUrlBySong(s.url));
    const [playing, setPlaying] = useState(false)
    
    const nameSong = "¡Hola, este es un texto en movimiento que se repite! ";

    const back = () => {
        pause();
        const newIndex = currentIndex - 1;
        if (newIndex < 0) { 
            console.log("newIndex less than 0"); 
            return setCurrentIndex(0); }
        else { setCurrentIndex(newIndex); }
        play()
    }
    const next = () => {
        pause();
        const newIndex = currentIndex + 1;
        console.log("/////>", currentIndex,'->',newIndex)
        if (newIndex < 0) { 
            console.log("newIndex less than 0"); 
            return setCurrentIndex(0); }
        else { setCurrentIndex(newIndex); }
        play()
    }
    const play = () => {
        // if (isValidYouTubeUrl(songs[currentIndex])) {/*  YtPlayerRef.current?.play(); */  }  // if (isExternal()) { YtPlayerRef.current?.play(); }
        // else { SrcPlayerRef.current?.play(); }
        // console.log(YtPlayerRef.current?.getVideoData())
        setPlaying(true);
    }
    const pause = () => {
        // if (isValidYouTubeUrl(songs[currentIndex])) {/*  YtPlayerRef.current?.pause() */  } // if (isExternal()) { YtPlayerRef.current?.pause() }
        // else { SrcPlayerRef.current?.pause(); }
        // console.log(songs, currentIndex)
        setPlaying(false);
    }

    // const YtPlayerRef = useRef<YouTubePlayerHandle>(null);
    const SrcPlayerRef = useRef<HandleSrc>(null);

    return (
        <div className="w-full overflow-hidden px-3 box-border">

            <div className="w-full flex justify-center mt-10">
                <div className="avatar">
                    <div className="size-40 rounded-full mask mask-decagon">
                        <img src={songDefault} alt="Mu" /> {/* <img src={imgUrl} alt="avatar" /> */}
                    </div>
                </div>
            </div>


            {/* NAME SONG SECTION */}
            <div className="flex w-full items-center justify-center mt-8">

                <div className="w-full relative text-white italic text-center text-[1rem] font-light ">
                    <div className="flex justify-center w-[200%] absolute left-[-100%] animate-text ">
                        <h1 className="w-full ">{nameSong}</h1>
                        <h1 className="w-full ">{nameSong}</h1>
                    </div>
                </div>

            </div>


            {/* PROGRESS SECTION */}
            <div className="mt-10">
                {
                    songs.length > 0 ?
                        <>
                            <SrcPlayer url={songs[currentIndex]} index={currentIndex} ref={SrcPlayerRef} />
                            <YouTubePlayer url={songs[currentIndex]} onFinishSong={next} playing={playing} setPlaying={setPlaying} />
                        </>
                        : <p>Empty reproduction playlist</p>
                }
            </div>


            {/* CONTROLS SECTION */}

            <div className="flex justify-center my-4">

                <button className="btn btn-circle btn-soft btn-default glass text-white" aria-label="Circle Soft Icon Button">
                    <span className="icon-[tabler--repeat]"></span>
                </button>

                <button onClick={back} className="btn btn-circle btn-soft btn-default glass text-white" aria-label="Circle Soft Icon Button">
                    <span className="icon-[tabler--track-prev]"></span>
                </button>

                <button onClick={pause} className="btn btn-circle btn-soft btn-default glass text-white" aria-label="Circle Soft Icon Button">
                    <span className="icon-[tabler--pause]"></span>
                </button>

                <button onClick={play} className="btn btn-circle btn-soft btn-default glass text-white" aria-label="Circle Soft Icon Button">
                    <span className="icon-[tabler--play]"></span>
                </button>

                <button onClick={next} className="btn btn-circle btn-soft btn-default glass text-white" aria-label="Circle Soft Icon Button">
                    <span className="icon-[tabler--track-next]"></span>
                </button>

            </div>

        </div>
    )
}

export { PlayerComponent }



/* 
 function isExternal(): boolean {
        // if (currentSong.song.includes("youtube.com")) return true
        if (songs[currentIndex].includes("youtube.com")) return true
        return false
        // if (songs[currentSong].includes("youtube.com")) return true
    }
*/