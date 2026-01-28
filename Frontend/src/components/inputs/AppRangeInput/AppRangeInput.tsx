import { useRef, useEffect, useState } from 'react'
import type { SenseOptionsType, ScoreType } from '../SenseInput/SenseInput';

import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import './slider.css';

type AppRangeInputsProps = {
    id: string,
    isMultiple?: boolean
    defaultValue?: ScoreType,
    onChangeRange: (values: SenseOptionsType) => void,
    addStyles?: any,
}

export const AppRangeInput = ({ defaultValue = { min: 2, max: 3 }, id, isMultiple = false, onChangeRange, addStyles }: AppRangeInputsProps) => {
    const sliderRef: any = useRef(null);
    const [currentValues, setCurrentValues] = useState<ScoreType>(defaultValue);

    useEffect(() => { onChangeRange({ id: id, name: '', score: currentValues }); }, [currentValues]);
    useEffect(() => {
        if (sliderRef.current && !sliderRef.current.noUiSlider) {
            noUiSlider.create(sliderRef.current, {
                start: isMultiple ? [defaultValue.min, defaultValue.max] : defaultValue.max,  // start: defaultValue, 
                connect: isMultiple ? true : 'lower',
                range: {
                    'min': 0,
                    'max': 5, // 'max': 100 //TODO - max and min should be props
                },
                ...addStyles,
                step: 0.01,
                cssPrefix: 'noUi-',
            });

            sliderRef.current.noUiSlider.on('update', (values : any) => {
                setCurrentValues(isMultiple ? { min: parseFloat(values[0]), max: parseFloat(values[1]) } : { min: -1, max: parseFloat(values[0]) });
                // onChangeRange({ id: id, name: '', score: isMultiple ? { min: parseFloat(values[0]), max: parseFloat(values[1]) } : { min: -1, max: parseFloat(values[0]) } });
            });
        }

        return () => {
            if (sliderRef.current && sliderRef.current.noUiSlider) { sliderRef.current.noUiSlider.destroy(); }
        };
    }, []);


    return (
        <div className="w-full my-[5px] ml-[5px]">  {/* <div className="p-8 w-full max-w-md" style={{ position: 'relative', display: 'block' }}></div> */}
            <div
                ref={sliderRef}
                className="slider-styled slider-round"
                id={id}
            >
            </div>
        </div>
    );
}

{/* <input
    type="range"
    className="range w-9/12 mx-0"
    aria-label="range"
    value={score.max} // defaultValue={score.max}
    onChange={(e) => onChangeRange({ name, id, score: { min: isMultiple ? 0 : -1, max: parseFloat(e.target.value)} })}
    min={0}
    max={5}
    step={0.01}
/> */}


// import { HSRangeSlider } from "flyonui/flyonui";
// import { HSRangeSlider } from "flyonui/flyonui";

// import noUiSlider from '../../../../node_modules/nouislider/dist/nouislider.ts'
// import noUiSlider from '../../../../node_modules/nouislider/dist/nouislider.min.js'
// import noUiSlider from '../../../../node_modules/nouislider/src/nouislider'

// import noUiSlider from 'nouislider/dist/nouislider.mjs';
// import nouislider from '../../../../node_modules/nouislider/dist/nouislider.min.js';
// import nouislider from '../../../../node_modules/nouislider/dist/nouislider.js';
// import nouislide from '../../../../node_modules/nouislider/dist/nouislider.js';
// import nouislider from '../../../../node_modules/nouislider/dist/nouislider.min.js';
// import {} from '../../../../node_modules/nouislider/dist/nouislider';

// import nouislider from 'nouislider';
// import nouislider from 'nouislider';
// import nouislider from 'nouislider/dist/nouislider.min.js';

// import noUiSlider from 'nouislider';
// import * as noUiSlider from 'nouislider';
// import '../../../../node_modules/nouislider/dist/nouislider.min.css'
// import 'nouislider/dist/nouisliderds.css';
// import 'nouislider/dist/nouislider.css';
// import './slider.css'



// const MyRange = ({defaultValue, id} : {defaultValue : number[], id : string }) => {
//     // const sliderRef = useRef<HTMLDivElement>(null);
//     const sliderRef : any = useRef(null);
//     // let rgi : any = null;
    
//     // const [rang, setRang] = useState(defaultValue);
//     const [rangeStyles, setRangeStyles] = useState({
//         // "start": [35, 85],
//         "start": defaultValue,
//         // "start": [0,0],
//         // "start": rang,
//         "range": {
//             "min": 0,
//             "max": 100
//         },
//         "connect": true,
//         "cssClasses": {
//             "target": "relative h-2 rounded-full bg-neutral/10 range-slider-disabled:pointer-events-none range-slider-disabled:opacity-50",
//             "base": "size-full relative z-[1]",
//             "origin": "absolute top-0 end-0 rtl:start-0 size-full origin-[0_0] rounded-full",
//             "handle": "absolute top-1/2 end-0 rtl:start-0 size-4 bg-base-100 border-[3px] border-primary rounded-full translate-x-2/4 -translate-y-2/4 hover:cursor-grab active:cursor-grabbing hover:ring-2 ring-primary active:ring-[3px]",
//             "connects": "relative z-0 w-full h-2 overflow-hidden",
//             "connect": "absolute top-0 end-0 rtl:start-0 z-[1] size-full bg-primary origin-[0_0] -translate-y-2/4",
//             "touchArea": "absolute -top-1 -bottom-1 -start-1 -end-1"
//         }
//     });

//     useEffect(()=>{
//         setRangeStyles({...rangeStyles, start : defaultValue})
//         // if (rgref.current && !rgi){ rgi = new HSRangeSlider(rgref.current)}
//         // if (sliderRef.current && !rgi.current.noUiSlider){ rgi = new HSRangeSlider(sliderRef.current)}
//         // if(rgi) rgi.el.noUiSlider.set([20, 25])

//         // return () => {
//             // if (sliderRef.current && sliderRef.current.noUiSlider) {
//                 // sliderRef.current.noUiSlider.destroy();
//                 // }
//         // };
//         if (sliderRef.current && sliderRef.current.noUiSlider) {
//         // if (sliderRef.current) {
//             console.log("AQUIIIII")
//             // const rangeInstance = new HSRangeSlider(sliderRef.current)
//             // sliderRef.current.noUiSlider.on('change', (value : any) =>{
//             sliderRef.current.noUiSlider.on('update', (value : any) =>{
//                 // console.log("value", value, rangeInstance.formattedValue)
//                 console.log("value", value)
//             });
//         }
//         // 3. LIMPIEZA: Esto es lo más importante para el .map()
//         return () => {
//             if (sliderRef.current && sliderRef.current.noUiSlider) {
//                 sliderRef.current.noUiSlider.destroy();
//             }
//         };
//     },[])
//     // })

//     useEffect(()=>{
//         setRangeStyles({...rangeStyles, start : defaultValue})
//     },[defaultValue])

//     return (
//         <div className="bg-lime-500">
//             {/* <label className="sr-only">Example</label> */}
//             <p>---</p>
//             <div
//                 id = { id.toString() }
//                 ref = {sliderRef}
//                 data-range-slider={JSON.stringify(rangeStyles)}
//                 // onChange={}
//                 // className="noUi-target relative h-2 rounded-full bg-neutral/10 range-slider-disabled:pointer-events-none range-slider-disabled:opacity-50 noUi-ltr noUi-horizontal noUi-txt-dir-ltr"
//             ></div>
//         </div>
//     )
// }

// const MyRangeII = ({ defaultValue = { min : 2, max : 3 }, id, isMultiple = false, onChangeRange } : {defaultValue? : ScoreType, id : string, onChangeRange: (values: SenseOptionsType) => void, isMultiple? : boolean }) => {
//     const sliderRef : any= useRef(null);

//     useEffect(() => {
//         if (sliderRef.current && !sliderRef.current.noUiSlider) {
//             noUiSlider.create(sliderRef.current, {
//                 start: isMultiple ? [defaultValue.min, defaultValue.max] : defaultValue.max,  // start: defaultValue, 
//                 connect: isMultiple ? true : 'lower',
//                 range: {
//                     'min': 0,
//                     'max': 5,
//                     // 'max': 100 //TODO - max and min should be props
//                 },
//                 step : 0.01,
//                 cssPrefix : 'noUi-',
//             });

//             sliderRef.current.noUiSlider.on('update', (values : any) => {
//             // sliderRef.current.noUiSlider.on('change', (values : any) => {
//                 // console.log("Valores actualizados:", values);
//                 // onChangeRange({ id: '', name: '', score: isMultiple ? { min: parseFloat(values[0]), max: parseFloat(values[1]) } : { min: -1, max: parseFloat(values[0]) } });
//                 onChangeRange({ id: id, name: '', score: isMultiple ? { min: parseFloat(values[0]), max: parseFloat(values[1]) } : { min: -1, max: parseFloat(values[0]) } });
//                 // onChangeRange({ id: id, name: '', score: { min: isMultiple ? parseFloat(values[0]) : -1, max: parseFloat(values[1]) } });
//             });
//         }

//         return () => {
//             if (sliderRef.current && sliderRef.current.noUiSlider) { sliderRef.current.noUiSlider.destroy(); }
//         };
//     }, []);


//     return (
//         <div className="w-full my-[10px]">  {/* <div className="p-8 w-full max-w-md" style={{ position: 'relative', display: 'block' }}></div> */}
//             <div 
//                 // className="slider-styled"
//                 className="slider-styled slider-round"
//                 id={id}
//                 key={id}
//                 // id="slider-round" // id={id} //FIXME - id must be unique when multiple sliders are rendered
//                 ref={sliderRef}>
//                 {/* name = {name} */}
//             </div>
//         </div>
//     );
// }


/*  const [rangeStyles, setRangeStyles] = useState({
"cssClasses": {
    "target": "relative h-2 rounded-full bg-neutral/10 range-slider-disabled:pointer-events-none range-slider-disabled:opacity-50",
    "base": "size-full relative z-[1]",
    "origin": "absolute top-0 end-0 rtl:start-0 size-full origin-[0_0] rounded-full",
    "handle": "absolute top-1/2 end-0 rtl:start-0 size-4 bg-base-100 border-[3px] border-primary rounded-full translate-x-2/4 -translate-y-2/4 hover:cursor-grab active:cursor-grabbing hover:ring-2 ring-primary active:ring-[3px]",
    "connects": "relative z-0 w-full h-2 overflow-hidden",
    "connect": "absolute top-0 end-0 rtl:start-0 z-[1] size-full bg-primary origin-[0_0] -translate-y-2/4",
    "touchArea": "absolute -top-1 -bottom-1 -start-1 -end-1"
}
}); */