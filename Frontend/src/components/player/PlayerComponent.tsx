import { useContext, useEffect, useRef, useState } from "react"
import { YouTubePlayer } from "./Yt"; //TODO change name to YouTubePlayer
import { SrcPlayer } from "./SrcPlayer"
import { PlayListContext } from "../../context/PlayListContext"
import { getUrlBySong, isValidYouTubeUrl } from "../../utils/urls"
import './style.css'
import { ProgressBarPlayer } from "./ProgressBarPlayer";
import type { SongModelExtended } from "../../models/SongModel";
import { PlayerControls } from "./PlayerControls";

type Props = {
    playList? : SongModelExtended[],
    currentIndex? : number,
    setCurrentIndex? : (index: number) => void,
    onChangeState? : (state: states) => void,

    //configs
    showPlayer?: boolean,
    showProgressBar?: boolean,
    showControls?: boolean,
}

export type states = {
    error : boolean | null,
    duration : number,
    currentTime : number | null,
}
const initVol = 60; // read from localStorage

const PlayerComponent = ({ playList, currentIndex, setCurrentIndex, onChangeState, showPlayer = true, showProgressBar = true, showControls = true } : Props) => {
    const { playList :plGlobal, currentIndex :currentIndexGlobal, setCurrentIndex : setCurrentIndexGlobal } = useContext(PlayListContext);
    playList = Array.isArray(playList) ? playList : plGlobal || [];
    currentIndex = Number.isInteger(currentIndex) ? currentIndex! : currentIndexGlobal || 0;
    setCurrentIndex = setCurrentIndex || setCurrentIndexGlobal;

    const [songs, setSongs] = useState<string[]>(playList.map(s => getUrlBySong(s.url))); // const songs: string[] = playList.map(s => getUrlBySong(s.url));
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

    useEffect(() => { setSongs(playList.map(s => getUrlBySong(s.url))); }, [playList])
    useEffect(() => { if(playerSelected && playerSelected?.error) { nextIfError();} }, [playerSelected]);
    
    const nextIfError = () => { if(currentIndex + 1 < playList.length) setCurrentIndex(currentIndex + 1); }/* if(currentIndex + 1 < playList.length) move(1); */
    
    const onChangeStatesInternal = (error : boolean, duration: number, currentTime: number) => {
        setPlayerSelected({error, duration, currentTime});
        if(onChangeState) onChangeState({error, duration, currentTime});
    }
    const onChangeProgress = (newVal: number) => {
        if(!isValidYouTubeUrl(songs[currentIndex]) && srcPlayerRef && srcPlayerRef.current && !playerSelected?.error){
            return srcPlayerRef.current.onChangeProgress(newVal);
        }
        else { if(ytPlatyerRef && ytPlatyerRef.current && !playerSelected?.error) { return ytPlatyerRef.current.onChangeProgress(newVal); }}
    }
    const onChangeVolume = (value: number) => {
        if(!isValidYouTubeUrl(songs[currentIndex]) && srcPlayerRef && srcPlayerRef.current && !playerSelected?.error){
            return srcPlayerRef.current.onChangeVolume(value);
        }
        else { if(ytPlatyerRef && ytPlatyerRef.current && !playerSelected?.error) { return ytPlatyerRef.current.onChangeVolume(value); }}
    }
    
    return (
        <div className="w-full overflow-hidden px-3 box-border">

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

            <p className={`text-center invert py-5 ${( playerSelected && playerSelected.error) ? '' : 'hidden'}`}>Error trying to play the song {/* <span className="icon-[tabler--square-x] size-6"></span> */}</p>
            <div className="">
                {
                    // playerSelected && playerSelected.error ? <p className="text-center">Error trying to play the song</p> :
                    songs.length > 0 ?
                        <>
                            <div className={`w-full ${showPlayer ? '' : 'hidden'}`}>
                                <SrcPlayer url={songs[currentIndex]} onFinishSong={() => move(1)} playing={playing} setPlaying={setPlaying} ref={srcPlayerRef} onChangeStates={onChangeStatesInternal} volume={initVol} />
                                <YouTubePlayer url={songs[currentIndex]} onFinishSong={() => move(1)} playing={playing} setPlaying={setPlaying} ref={ytPlatyerRef} onChangeStates={onChangeStatesInternal} volume={initVol} />
                            </div>
                            
                            {/* PROGRESS SECTION */}
                            <div className={`w-full mt-7 ${showProgressBar ? '' : 'hidden'} ${playerSelected?.error ? 'hidden' : ''}`}>
                                <ProgressBarPlayer url={songs[currentIndex]} 
                                    currentIndex={currentIndex}
                                    currentTime = {playerSelected?.currentTime ? playerSelected.currentTime : 0}
                                    duration={playerSelected ? playerSelected.duration : 0}
                                    playing={playing} onChangeTime={onChangeProgress}
                                />
                            </div>
                        </>
                        : <p className="text-center invert py-5">Empty playlist (0 Songs) {/* <span className="icon-[tabler--alert-triangle] size-6"></span> */}</p>
                }
            </div>


            {/* CONTROLS SECTION */}
            <div className={`w-full mt-0 mb-2 ${showControls ? '' : 'hidden'} ${(playerSelected && playerSelected.error) ? 'cursor-not-allowed' : ''} ${songs.length === 0 ? 'hidden' : ''}`}>
                <PlayerControls playing={playing} play={play} pause={pause} move={move} onChangeVolume={onChangeVolume} initVol={initVol} srcLink={songs[currentIndex]} />
            </div>
        </div>
    )
}


export { PlayerComponent }
