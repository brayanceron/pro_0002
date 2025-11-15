import { useState, useEffect } from "react";

function ProgressBarPlayer({ duration, playing, isLoadingSrc, error, url, onChangeProgress }: { duration: number, isLoadingSrc: boolean, playing: boolean, error : boolean, url: string, onChangeProgress: (newValue: number) => void }) {
    const [progress, setProgress] = useState<number>(0);
    const [currentTime, setCurrentTime] = useState<number>(0);

    const rate = 500;
    let durationL = duration * 1000; // transform to milliseconds

    // useEffect(() => { adv(); })
    useEffect(() => { 
        console.log("isLoadingSrc=", isLoadingSrc, "playing = ", playing); 
        adv(); 
    })
    // console.log("timesOut=", timesOut)^^^^
    // },[currentTime])


    // let timesOut: number[] = [];
    const [timesOut, setTimesOut] = useState<number | null | undefined>(undefined) // let timesOut: number | null | undefined = undefined;
    function adv() {
        if(error) return;
        if (!playing) return;
        if (isLoadingSrc) return;

        // console.log("timesOut=", timesOut)
        if (timesOut) { setTimesOut(null); return; }
        setTimesOut(setTimeout(() => {
            setCurrentTime(currentTime + rate)
            setProgress((currentTime / durationL!) * 100)
        }, rate));
    }


    useEffect(() => {
        console.log("CAMBIO LA DURACION POR ENDE CAMBIO LA CANCION")
        if (timesOut === undefined) return;
        setCurrentTime(0);
        setProgress(0);

        clearTimeout(timesOut || 100)
        setTimesOut(null)
        // timesOut = null;
    // }, [duration])
    }, [url])


    //  const onChangeProgress = (event: ChangeEvent) => {
    const onChangeProgress_ = (event: React.ChangeEvent) => {
        const ele = event.target as HTMLInputElement
        // const totalTime = rep.current!.duration;

        console.log("ele.value=", ele.value)

        // rep.current!.currentTime = totalTime * (parseFloat(ele.value) / 100);
        // rep.current!.currentTime = durationSeconds * (parseFloat(ele.value) / 100);
        const newPercentProgress = ele.value;
        const newCurrentTimeValue: number = duration * (parseFloat(newPercentProgress) / 100);

        setProgress(parseInt(newPercentProgress));
        setCurrentTime(newCurrentTimeValue)
        onChangeProgress(newCurrentTimeValue)
    }

    function formatTime() {
        const seconds: number = Math.trunc(currentTime / 1000) % 60;
        const minutes: number = Math.trunc(currentTime / (1000 * 60));
        return `${minutes <= 9 ? 0 : ''}${minutes}:${seconds <= 9 ? 0 : ''}${seconds}`
    }

    return (
        <div className="py-1">
            <input type="range"
                className="range bg-transparent border-solid border-2"
                aria-label="range"
                value={progress}
            // onChange={event => onChangeProgress_(event)}
            onChange={onChangeProgress_}
            />
            <p className="text-xs">{formatTime()}</p>
        </div>

    );
}

export {ProgressBarPlayer}