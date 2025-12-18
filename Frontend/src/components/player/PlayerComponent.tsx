import { useContext, useEffect, useRef, useState } from "react"
import songDefault from "../../assets/songDefault.jpeg"
import { YouTubePlayer } from "./Yt"; //TODO change name to YouTubePlayer
import { SrcPlayer } from "./SrcPlayer"
import { PlayListContext } from "../../context/PlayListContext"
import { getUrlBySong, isValidYouTubeUrl } from "../../utils/urls"
import './style.css'
import { ProgressBarPlayer } from "./ProgressBarPlayer";

type states = {
    error : boolean | null,
    duration : number,
    currentTime : number | null,
}


const PlayerComponent = () => {
    const { playList, currentIndex, setCurrentIndex } = useContext(PlayListContext);
    const songs: string[] = playList.map(s => getUrlBySong(s.url));
    const [playing, setPlaying] = useState(false)
    const [playerSelected, setPlayerSelected] = useState<states | null>(null);
    
    // const nameSong = "¡Hola, este es un texto en movimiento que se repite! ";
    // BUG when there is error to playing song and player play next song, it pass 2 songs

    const move = (step: number) => {
        pause();
        validateAndSetIndex(currentIndex + step);
        play();
    }
    const validateAndSetIndex = (index: number) => {
        if (index < 0) { return setCurrentIndex(0); }
        if (index >= playList.length) { return setCurrentIndex(playList.length -1); }
        setCurrentIndex(index);
    }

    const play = () => { setPlaying(true); }
    const pause = () => { setPlaying(false); }

    const srcPlayerRef = useRef<any>(null);
    const ytPlatyerRef = useRef<any>(null);


    useEffect(() => { if(playerSelected && playerSelected?.error) { nextIfError();} }, [playerSelected]);
    
    const nextIfError = () => {
        console.log("NEXT IF ERROR WAS CALLED")
        if(currentIndex + 1 < playList.length) setCurrentIndex(currentIndex + 1); /* if(currentIndex + 1 < playList.length) move(1); */
    }
    
    const onChangeStatesInternal = (error : boolean, duration: number, currentTime: number) => {
        setPlayerSelected({error, duration, currentTime});
    }
    const onChangeProgress = (newVal: number) => {
        // if(srcPlayerRef && srcPlayerRef.current && !srcPlayerRef.current.getError()) return srcPlayerRef.current.onChangeProgress(newVal);
        // else if(ytPlatyerRef && ytPlatyerRef.current && !playerSelected?.error) return ytPlatyerRef.current.onChangeProgress(newVal); // else if(ytPlatyerRef && ytPlatyerRef.current && !ytPlatyerRef.current.getError()) return ytPlatyerRef.current.onChangeProgress(newVal);
        if(!isValidYouTubeUrl(songs[currentIndex]) && srcPlayerRef && srcPlayerRef.current && !playerSelected?.error){
            return srcPlayerRef.current.onChangeProgress(newVal);
        }
        else {
            if(ytPlatyerRef && ytPlatyerRef.current && !playerSelected?.error) return ytPlatyerRef.current.onChangeProgress(newVal)
        }
    }
    
    return (
        <div className="w-full overflow-hidden px-3 box-border">

        {
            !isValidYouTubeUrl(songs[currentIndex])?
            <div className="w-full flex justify-center mt-10">
                <div className="avatar">
                    <div className="size-40 rounded-full mask mask-decagon">
                        <img src={songDefault} alt="Mu" /> {/* <img src={imgUrl} alt="avatar" /> */}
                    </div>
                </div>
            </div>
            : <></>
        }

            {/* NAME SONG SECTION */}
            {/* 
            <div className="flex w-full items-center justify-center mt-8">

                <div className="w-full relative text-white italic text-center text-[1rem] font-light ">
                    <div className="flex justify-center w-[200%] absolute left-[-100%] animate-text ">
                        <h1 className="w-full ">{nameSong}</h1>
                        <h1 className="w-full ">{nameSong}</h1>
                    </div>
                </div>

            </div>
            */}


            {/* PROGRESS SECTION */}
            <div className="mt-10">
                {
                    songs.length > 0 ?
                        <>
                            <SrcPlayer url={songs[currentIndex]} onFinishSong={() => move(1)} playing={playing} setPlaying={setPlaying} ref={srcPlayerRef} onChangeStates={onChangeStatesInternal} />
                            <YouTubePlayer url={songs[currentIndex]} onFinishSong={() => move(1)} playing={playing} setPlaying={setPlaying} ref={ytPlatyerRef} onChangeStates={onChangeStatesInternal} />
                            
                            <ProgressBarPlayer url={songs[currentIndex]} 
                                currentIndex={currentIndex}
                                currentTime = {playerSelected?.currentTime ? playerSelected.currentTime : 0}
                                duration={playerSelected ? playerSelected.duration : 0}
                                playing={playing} onChangeTime={onChangeProgress}/>
                        </>
                        : <p>Empty playlist</p>
                }
            </div>


            {/* CONTROLS SECTION */}
            <PlayerControls play={play} pause={pause} move={move} />

        </div>
    )
}


const PlayerControls = ({play, pause, move}:{play : () => void, pause : () => void, move : (step: number) => void}) => {
    return (
        <div className="flex justify-center my-4">

                <button className="btn btn-circle btn-soft btn-default glass text-white" aria-label="Circle Soft Icon Button">
                    <span className="icon-[tabler--repeat]"></span>
                </button>

                <button onClick={_ => move(-1)} className="btn btn-circle btn-soft btn-default glass text-white" aria-label="Circle Soft Icon Button">
                    <span className="icon-[tabler--track-prev]"></span>
                </button>

                <button onClick={pause} className="btn btn-circle btn-soft btn-default glass text-white" aria-label="Circle Soft Icon Button">
                    <span className="icon-[tabler--pause]"></span>
                </button>

                <button onClick={play} className="btn btn-circle btn-soft btn-default glass text-white" aria-label="Circle Soft Icon Button">
                    <span className="icon-[tabler--play]"></span>
                </button>

                <button onClick={_ => move(1)} className="btn btn-circle btn-soft btn-default glass text-white" aria-label="Circle Soft Icon Button">
                    <span className="icon-[tabler--track-next]"></span>
                </button>

            </div>
    )
}

export { PlayerComponent }
