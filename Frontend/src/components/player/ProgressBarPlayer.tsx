import { useEffect, useState, useRef } from "react";

type Props = {
    duration: number,
    playing: boolean,
    url: string,
    currentIndex: number,
    currentTime?: number,
    onChangeTime : (nreVal : number) => void,   // callback: cuando usuario mueve la barra
}

const ProgressBarPlayer = ({ duration, url, playing, currentIndex, onChangeTime, currentTime}: Props) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const progressRef = useRef(0);   // progress, time in seconds
    const lastFrameRef = useRef(0);
    const animRef = useRef(0); // const animRef = useRef(null);

    useEffect(() => { resetValues(); }, [currentIndex]);
    const resetValues = () => {
        if (progressRef.current && progressRef.current > 0) { progressRef.current = 0; } // progressRef.current = 0;
        if (inputRef.current) { inputRef.current.value = "0"; }
        setDisplayTime(0);
    };
    url;

    // start / stop animation
    useEffect(() => {
        console.log("playing = ", playing, " duration = ", duration, " progressRef = ", progressRef)
        if (!duration || duration <= 0) { resetValues(); return; } // it reset when duration is 0, it means song changed, it fix whe change song and duration not updated yet
        if (!playing) { cancelAnimationFrame(animRef.current); return; }
        
        const tick = (now: any) => {
            // console.log("progressRef : ", progressRef) //TODO - it was active
            const delta = (now - lastFrameRef.current) / 1000; // tiempo del último frame// ms->segundos
            lastFrameRef.current = now;
            progressRef.current += delta;

            if (progressRef.current > duration) { progressRef.current = duration; }
            if (inputRef.current) { inputRef.current.value = progressRef.current.toString(); } // actualización directa al DOM (sin re-render)

            animRef.current = requestAnimationFrame(tick); /*  */
        };

        lastFrameRef.current = performance.now(); /* seconds passed from open tab  */
        animRef.current = requestAnimationFrame(tick);

        return () => cancelAnimationFrame(animRef.current);
    }, [playing, duration]);

    const handleChange = (e : any) => {
        const val = Number(e.target.value);

        progressRef.current = val;
        setDisplayTime(val);
        onChangeTime && onChangeTime(val);
    };

    const [displayTime, setDisplayTime] = useState(0);

    useEffect(() => {
        if(currentTime !== undefined && currentTime !== null) {
            progressRef.current = currentTime;
            if(inputRef.current) inputRef.current.value = currentTime.toString();
            setDisplayTime(currentTime);
        }
        const id = setInterval(() => { setDisplayTime(progressRef.current); }, 250);
        return () => clearInterval(id);
    }, []);

    function formatTime(time: number) {
        const seconds: number = Math.trunc(time / 1000) % 60;
        const minutes: number = Math.trunc(time / (1000 * 60));
        return `${minutes <= 9 ? 0 : ''}${minutes}:${seconds <= 9 ? 0 : ''}${seconds}`
        // const seconds: number = Math.trunc(currentTime / 1000) % 60;
        // const minutes: number = Math.trunc(currentTime / (1000 * 60));
    }
    const format = (sec: number) => {
        const m = Math.floor(sec / 60);
        const s = Math.floor(sec % 60);
        return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    };

    return (
        <div className="py-1">

            <input
                className="range bg-transparent border-solid border-2"
                ref={inputRef}
                type="range"
                min={0}
                max={duration}
                step={0.01}
                defaultValue={0}
                onChange={handleChange}
            />
            <p className="text-xs">{format(displayTime)} / {formatTime(duration * 1000)}</p>
        </div>
    );
}

export { ProgressBarPlayer };
