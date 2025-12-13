import {  forwardRef, useContext, useEffect, useImperativeHandle, useRef, useState} from "react";
import { /* isValidSrcUrl, */ isValidYouTubeUrl } from '../../utils/urls';
import { PlayListContext } from "../../context/PlayListContext";

interface Props {
    url: string,
    playing: boolean,
    setPlaying: (val: boolean) => void,
    onFinishSong : () => void,
    onChangeStates: (error: boolean, duration: number, currentTime: number) => void,
}

//TODO verify if url is a url supported by audio element or is url of backend
export const SrcPlayer = forwardRef ( ({ url, playing, onFinishSong, onChangeStates } : Props, ref) => {
    const { currentIndex } = useContext(PlayListContext);
    const [error, setError] = useState(isValidYouTubeUrl(url)); // const [error, setError] = useState(!isValidSrcUrl(url));
    const rep = useRef<HTMLAudioElement>(null);
    const [duration, setDuration] = useState<number>(0);
    

    useEffect(() => { exec(); }, [playing]);
    useEffect(() => { 
        // setError(!isValidSrcUrl(url));
        setError(isValidYouTubeUrl(url));
        rep.current!.src = url; 
        exec();
    }, [currentIndex, url]);  // useEffect(() => { rep.current!.src = url; }, [url]);
    useEffect(() => {
        if(!error) return;
        setDuration(0);
        if(rep.current) rep.current.pause();
    }, [error]);

    useEffect(() => {
        if(error && isValidYouTubeUrl(url)) return; 
        onChangeStates(error, duration, rep.current && rep.current.currentTime ? rep.current.currentTime  : 0);
    }, [error, duration, playing]);

    const exec = () => {
        // if(isValidYouTubeUrl(url)==true) return; //HACK
        if(!rep.current) return; // if (duration <= 0) return;
        if(error) rep.current?.pause(); // if(error) return;
        
        if (playing) { rep.current!.play(); }
        else { rep.current!.pause(); }
    }

    const onError = () => { setError(true); }
    const onCanPlay =  () => { if (rep.current) { setDuration(rep.current.duration); exec(); } }

    useImperativeHandle(ref, () => ({
        onChangeProgress(newVal: number) {
            if(rep.current) rep.current.currentTime = newVal;
        },
        getCurrentTime : () => { return rep.current ? rep.current.currentTime : 0; }, // get currentTime() {
    }));

    return (
        <>
            <div>
                {
                    error && <p>Error loading src video</p> 
                }

                <audio
                    ref={rep}
                    src={url}
                    controls className="hidden w-full"
                    onError={onError}
                    onEnded={ _ => {if(error) return; onFinishSong()}}
                    onCanPlay={ _ => onCanPlay()} // onCanPlayThrough={onLoaded}
                />
            </div>

        </>
    )
})

// }

