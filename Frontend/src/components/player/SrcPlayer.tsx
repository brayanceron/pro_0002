import { useEffect, useRef, useState, useImperativeHandle, forwardRef } from "react";
import { ProgressBarPlayer } from "./ProgressBarPlayer";

interface Props {
    url: string,
    index: number,
}

export interface HandleSrc {
    play: () => void,
    pause: () => void,
}

//TODO verify if url is a url supported by audio element or is url of backend
// export function Src({ url }: { url: string }) {
export const SrcPlayer = forwardRef<HandleSrc, Props>(({ url, index }, ref) => {
    const [playing, setPlaying] = useState(false)
    const [error, setError] = useState(false)
    const [isLoadingSrc, setIsLoadingSrc] = useState(true)
    const rep = useRef<HTMLAudioElement>(null);

    const play = () => { setPlaying(true); };
    const pause = () => { setPlaying(false); };
    useImperativeHandle(
        ref, () => ({ play, pause, })
    );


    {/* PROGRESS SECTION */ }
    console.log("SRC =>", url)
    useEffect(() => { exec(); }, [playing]);
    useEffect(() => { exec(); }, [isLoadingSrc]);
    useEffect(() => { rep.current!.src = url; }, [index]);  // useEffect(() => { rep.current!.src = url; }, [url]);
    const exec = () => { // console.log("playing=", playing, " isLoading=", isLoading)
        if (isLoadingSrc == true) return;
        if (playing) { rep.current!.play(); }
        else { rep.current!.pause(); }
    }

    const onLoaded = () => { setIsLoadingSrc(false); }
    const loadStart = () => { setIsLoadingSrc(true); }
    const onError = () => { setError(true); }


    // const [progress, setProgress] = useState(0);

    /* const onChangeProgress = (event: ChangeEvent) => {
        const ele = event.target as HTMLInputElement
        const totalTime = rep.current!.duration;

        setProgress(parseInt(ele.value))
        rep.current!.currentTime = totalTime * (parseFloat(ele.value) / 100);
    } */


    function onChangeProgress(newValue: number) {
        pause();
        rep.current!.currentTime = newValue;
        play()
    }
    function isYt() { return url.includes("youtube.com") }

    return (
        <>

            <div>
                {
                    !isYt() ?
                        <ProgressBarPlayer
                            key={url}
                            duration={rep.current?.duration || 0}
                            playing={playing}
                        />
                        : <p>Youtube video</p>
                }

                <audio
                    ref={rep}
                    src={url}
                    controls className="hidden w-full"
                    onLoadStart={loadStart}
                    onCanPlayThrough={onLoaded}
                    onError={onError}
                />
            </div>

        </>
    )

}
)

