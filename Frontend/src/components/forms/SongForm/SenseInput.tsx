import { useEffect, /* useRef, */ useState, type BaseSyntheticEvent } from "react";
import { WrapMultipleSelect } from "./WrapMultipleSelect";

import { AppInputRange } from "./AppInputRange";

export type SenseOptionsType = {
    id: string,
    name: string,
    score: ScoreType, // score: number,
}

export type ScoreType = {
    min : number,
    max : number,
}

//TODO change this file to inputs folder
const SenseInput = ({ defaultValues, onChange, isMultiple = false }: { defaultValues: SenseOptionsType[], onChange: (selection: SenseOptionsType[]) => void, isMultiple?: boolean }) => {
    const [selectionData, setSelectionData] = useState<SenseOptionsType[]>(defaultValues ? defaultValues : []);

    const onChangeRange = ({ /* name, */ score : newScore, id }: SenseOptionsType) => {
        console.log("id : ", id," score : ", newScore)
        console.log("current selection: ", selectionData)
        
        const updatedSelection = selectionData.map((item: SenseOptionsType) => { return item.id === id ? { id: item.id, name: item.name, score : newScore } : item; });
        // const updatedSelection = selectionData.map((item: SenseOptionsType) => { return item.id === id ? { ...item, score } : item; });
        // const updatedSelection = selectionData.map((item: SenseOptionsType) => { return { ...item, score : item.id == id ? score : item.score }; });
        console.log("update selection: ", updatedSelection );
        if (updatedSelection) {console.log("saving..."); setSelectionData(updatedSelection);}
    }

    const [ids, setIds] = useState<string[]>(); //TODO validate what happens when id of defaultVales is not valid id of options available in MultipleSelect/backend
    useEffect(() => { onChange(selectionData); }, [selectionData]);
    useEffect(() => { setIds(defaultValues.map((item) => item.id)); },[]);
    
    return (
        <>
            <WrapMultipleSelect
                entity="sense"
                values={ids!} // values={options}
                onChangeMultipleSelect={(event: BaseSyntheticEvent) => { // onChangeMultipleSelect={onChangeMultipleSelect}
                    const newSelection: SenseOptionsType[] = [];
                    const options = Array.from(event.target.selectedOptions);

                    options.forEach((option: any) => {
                        const f: SenseOptionsType | undefined = selectionData.find((s) => s.id === option.value);
                        if (f) { newSelection.push({'id': f.id, 'name': f.name, 'score': f.score });}
                        else{newSelection.push({'id': option.value, 'name': option.text, 'score': {min: isMultiple ? 0 : -1, max: 0}});} // default score
                    });
                    setSelectionData(newSelection);
                }}
            />
            <br />

            <SensesRanges selectedSenses={selectionData} onChangeRange={onChangeRange} isMultiple={isMultiple} />
            {/* <SensesRanges selectedSenses={selectionData} onChangeRange={onChangeRange} isMultiple={true} /> */}
        </>
    );
}

const SensesRanges = ({ selectedSenses, onChangeRange, isMultiple }: { selectedSenses: SenseOptionsType[], onChangeRange: (values: SenseOptionsType) => void, isMultiple: boolean }) => {
    return (
        <>
            <div className='w-full'>
                {
                    // [[10, 30],[20, 40],/* [10,30], */[20, 40]].map((item, index) => <MyRange id={index.toString()} defaultValue={[item[0], item[1]]}/>)
                    // [[1, 3],[2, 4],/* [10,30], */[2, 4]].map((item, index) => <AppInputRange isMultiple={false} id={index.toString()} defaultValue={{min: item[0], max: item[1]}} onChangeRange={ _ =>{}}/>)
                }
            </div>
            {
                // selectedSenses.map( (item, index) => <MyRange id={(index+100).toString()} defaultValue={[21, 41]} /* key={index+50} *//>)
                // selectedSenses.map((item, index) => <MyRangeII name={(index+100).toString()} isMultiple={true} onChangeRange={ _ =>{}}/>)
            }
            {
                // selectedSenses.map(({ name, score, id }: SenseOptionsType, index : number ) => {
                selectedSenses.map(({ name, score, id }: SenseOptionsType, _ : number ) => {
                    return (
                        <>
                            <div className="flex align-middle justify-center items-center mb-[3px]">
                                <p className="mr-1 px-0 w-2/12 text-xs text-right">{name}</p>
                                
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

                                <AppInputRange
                                    key={id}
                                    defaultValue={score}
                                    id={id}
                                    isMultiple={isMultiple} // isMultiple={true}
                                    // onChangeRange={(e) => onChangeRange({ name, id, score: { min: isMultiple ? 0 : -1, max: parseFloat(e.target.value)} })}
                                    // onChangeRange={(e:SenseOptionsType) => onChangeRange({ name, id, score: { min: isMultiple ? parseFloat(e.score.min.toString()) : -1, max: parseFloat(e.score.max.toString()) } })}
                                    onChangeRange={(e:SenseOptionsType) => { onChangeRange({ name : e.name, id : e.id, score: { min: isMultiple ? parseFloat(e.score.min.toString()) : -1, max: parseFloat(e.score.max.toString()) } }) }}

                                    // onChangeRange={(updatedScore: SenseOptionsType) => onChangeRange({ name, id, score: updatedScore.score })}
                                    // onChangeRange={(updatedScore: SenseOptionsType) => onChangeRange({ ...updatedScore, id :id })}
                                    // onChangeRange={ onChangeRange }
                                />

                                {/* <p className="text-xs text-gray-500 ml-2 w-1/12">{ isMultiple ? `${score.min} - ${score.max}` : score.max}</p> */}
                                <p className={`text-xs text-gray-500 ml-2 ${isMultiple ? 'w-3/12' : 'w-1/12'}`}>{ isMultiple ? `${score.min} - ${score.max}` : score.max}</p>
                            </div>
                        </>
                    );
                })
            }
        </>
    );
}

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

export { SenseInput }