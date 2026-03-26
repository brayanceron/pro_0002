import gifPlaying from '../../assets/playing.gif';
import gifPause from '../../assets/pause.gif';


const PlayerControls = ({playing, play, pause, move,  onChangeVolume, initVol, srcLink = '/'}:{ playing :boolean, play : () => void, pause : () => void, move : (step: number) => void, initVol: number, onChangeVolume : (value: number) => void , srcLink? : string}) => {
    const onChangeInputVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if(isNaN(value)) return alert("Please enter a valid number for volume.");
        onChangeVolume(value);
    }

    return (
        <div className="flex items-center justify-between">

                <div className="flex-1 flex justify-start items-center">
                    <a href={srcLink} target="_blank">
                        <span className="icon-[tabler--external-link] size-4 invert m-0 p-0"></span>
                    </a>
                    { <div className="w-[15px] ml-3"> <img className="rounded-sm" src={ playing ? gifPlaying :gifPause } alt="play state" /> </div> }
                </div>

                <div style={{flex : '0 0 auto'}}>
                <button className="btn btn-circle btn-soft btn-default glass text-white" aria-label="Circle Soft Icon Button">
                    <span className="icon-[tabler--repeat]"></span>
                </button>

                <button onClick={ _ => move(-1)} className="btn btn-circle btn-soft btn-default glass text-white" aria-label="Circle Soft Icon Button">
                    <span className="icon-[tabler--track-prev]"></span>
                </button>

                <button onClick={pause} className="btn btn-circle btn-soft btn-default glass text-white" aria-label="Circle Soft Icon Button">
                    <span className="icon-[tabler--pause]"></span>
                </button>

                <button onClick={play} className="btn btn-circle btn-soft btn-default glass text-white" aria-label="Circle Soft Icon Button">
                    <span className="icon-[tabler--play]"></span>
                </button>

                <button onClick={ _ => move(1)} className="btn btn-circle btn-soft btn-default glass text-white" aria-label="Circle Soft Icon Button">
                    <span className="icon-[tabler--track-next]"></span>
                </button>
                </div>

                <div className="flex-1">
                    <div className="w-auto flex items-center gap-1 justify-end mx-1">
                        <span className="icon-[tabler--volume] size-4 invert"></span>
                        <input type="range" className="range range-xs w-[60px] bg-transparent border-solid border-white border-[1px]" aria-label="range" defaultValue={initVol} onChange={onChangeInputVolume} />
                    </div>
                </div>

                {/* <div>
                    <span className="icon-[tabler--brand-youtube-filled] size-4 invert"></span>
                </div> */}
            </div>
    )
}

export { PlayerControls }