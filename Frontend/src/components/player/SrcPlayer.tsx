import {  useContext, useEffect, useRef, useState} from "react";
import { ProgressBarPlayer } from "./ProgressBarPlayer";
import { isValidSrcUrl } from '../../utils/urls';
import { PlayListContext } from "../../context/PlayListContext";

interface Props {
    url: string,
    playing: boolean,
    setPlaying: (val: boolean) => void,
    onFinishSong : () => void,
}


//TODO verify if url is a url supported by audio element or is url of backend
export const SrcPlayer = ({ url, playing, onFinishSong } : Props) => {
    const { currentIndex } = useContext(PlayListContext);
    const [error, setError] = useState(!isValidSrcUrl(url));
    const rep = useRef<HTMLAudioElement>(null);
    const [duration, setDuration] = useState<number>(0);
    

    useEffect(() => { setError(!isValidSrcUrl(url)); }, [url]);
    useEffect(() => { exec(); }, [playing]);
    useEffect(() => { exec(); }, [duration]);
    useEffect(() => { rep.current!.src = url; }, [currentIndex]);  // useEffect(() => { rep.current!.src = url; }, [url]);
    useEffect(() => {
        if(!error) return;
        setDuration(0);
    }, [error]);

    const exec = () => {
        if(error) return;
        if (duration <= 0) return;
        if (playing) { rep.current!.play(); }
        else { rep.current!.pause(); }
    }

    const onError = () => { setError(true); }
    const onCanPlay =  () => { if (rep.current) { setDuration(rep.current.duration); } }

    const onChangeProgress = (newVal : number) => {
        console.log("New val : ", newVal)
        if(!rep.current) return;
        rep.current.currentTime = newVal;
    }
    return (
        <>
            <div>
                {
                    error ? <p>Error loading src video</p> :
                        <ProgressBarPlayer
                            key={url}
                            duration={duration} // duration={rep.current?.duration || 0}
                            playing={playing}
                            onChangeTime={onChangeProgress}
                        />
                }

                <audio
                    ref={rep}
                    src={url}
                    controls className="hidden w-full"
                    onError={onError}
                    onEnded={ _ => onFinishSong()}
                    onCanPlay={ _ => onCanPlay()} // onCanPlayThrough={onLoaded}
                />
            </div>

        </>
    )

}

