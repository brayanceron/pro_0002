import {  forwardRef, useContext, useEffect, useImperativeHandle, useReducer, useRef, /* useState */} from "react";
import { isValidSrcUrl, isValidYouTubeUrl } from '../../utils/urls';
import { PlayListContext } from "../../context/PlayListContext";

interface Props {
    url: string,
    playing: boolean,
    setPlaying: (val: boolean) => void,
    onFinishSong : () => void,
    onChangeStates: (error: boolean, duration: number, currentTime: number) => void,
}

interface PlayerStates {
    error : boolean | null,
    duration : number | null,
    // playerState : number | null,
}
type ReduxAction = {
    type : string,
    payload : PlayerStates,
}
const reducer = (prevState : PlayerStates, action : ReduxAction ) : PlayerStates => {
    const {duration, error } = action.payload;
    switch(action.type){
        case 'ERROR' : { return { error, duration : -1 }; }
        case 'PLAYERSTATE' : { return {error, duration };}
        case 'ONCHANGEURL' : { return { error , duration } }
        default : { return prevState; }
    }
}

//TODO verify if url is a url supported by audio element or is url of backend
export const SrcPlayer = forwardRef ( ({ url, playing, onFinishSong, onChangeStates } : Props, ref) => {
    const { currentIndex } = useContext(PlayListContext);
    const rep = useRef<HTMLAudioElement>(null);
    const initialState : PlayerStates = {error : !isValidSrcUrl(url), duration : 0,};
    const [plState, dispatch] = useReducer(reducer, initialState);
    

    useEffect(() => { exec(); }, [playing]);
    useEffect(() => {
        if(plState.error && /* isValidSrcUrl(url) == false && */ isValidYouTubeUrl(url)) return;
        if(plState.duration == null || plState.duration <= 0) return;
        console.log("CALL FROM :: SrcPlayer")
        onChangeStates(plState.error != null ? plState.error : false, plState.duration ? plState.duration : 0, rep.current && rep.current.currentTime ? rep.current.currentTime : 0);
    }, [ plState.error, plState.duration]);
    
    useEffect(() => {
        dispatch({type : 'ONCHANGEURL', payload : {error : !isValidSrcUrl(url), duration : getDuration(), /* playerState : null, */ /* url */}}) // dispatch payload without side-effect functions; run side-effects after dispatch
        changeUrl();
    }, [currentIndex, url]);

    const changeUrl = () =>{
        if (!rep.current) return;
        rep.current!.src = url;
        exec()
    }
    const getDuration = () => {
        if(isValidSrcUrl(url) == false) return -1;
        if(rep.current && rep.current.duration) { return rep.current.duration; }
        return -1;
    }
    
    const exec = () => {
        if(!rep.current) return;
        if(plState.error) rep.current.pause();
        if (playing) { rep.current!.play(); }
        else { rep.current!.pause(); }
    }

    const onError = () => { dispatch({type : 'ERROR', payload : {error : true, duration : -1}}) }
    const onCanPlay =  () => { if (rep.current) { dispatch({type : 'PLAYERSTATE', payload : {error : false, duration : getDuration(),}}) } }

    useImperativeHandle(ref, () => ({
        onChangeProgress(newVal: number) {
            if(rep.current) rep.current.currentTime = newVal;
        },
        getCurrentTime : () => { return rep.current ? rep.current.currentTime : 0; },
    }));

    return (
        <>
            <div>
                { plState.error && <p>Error loading src video</p> }

                <audio
                    ref={rep}
                    src={url}
                    controls className="hidden w-full"
                    onError={onError}
                    onEnded={ () => {
                        if(plState.error) return;
                        onFinishSong();
                    }}
                    onCanPlay={ () => onCanPlay()} // onCanPlayThrough={onLoaded}
                />
            </div>

        </>
    )
})

// }

