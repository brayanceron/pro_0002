import { useEffect, useRef, useState, type BaseSyntheticEvent } from "react";
import { WrapMultipleSelect } from "./WrapMultipleSelect";
// import nouislider from 'nouislider';
// import nouislider from 'nouislider';
// import nouislider from 'nouislider/dist/nouislider.min.js';
// import 'nouislider/dist/nouislider.css';
import noUiSlider from 'nouislider';
import './test.css'
// import { HSRangeSlider } from "flyonui/flyonui";
// import noUiSlider from 'nouislider/dist/nouislider.mjs';

// import nouislider from '../../../../node_modules/nouislider/dist/nouislider.min.js';
// import nouislider from '../../../../node_modules/nouislider/dist/nouislider.js';
// import nouislide from '../../../../node_modules/nouislider/dist/nouislider.js';
// import nouislider from '../../../../node_modules/nouislider/dist/nouislider.min.js';
// import {} from '../../../../node_modules/nouislider/dist/nouislider';

export type SenseOptionsType = {
    id: string,
    name: string,
    score: number,
}

//TODO change this file to inputs folder
const SenseInput = ({ defaultValues, onChange }: { defaultValues: SenseOptionsType[], onChange: (selection: SenseOptionsType[]) => void }) => {
    const [selection, setSelection] = useState<SenseOptionsType[]>(defaultValues ? defaultValues : []);

    const onChangeRange = ({ /* name, */ score, id }: SenseOptionsType) => {
        const updatedSelection = selection.map((item: SenseOptionsType) => { return item.id === id ? { ...item, score: score } : item; });
        if (updatedSelection) setSelection(updatedSelection);
    }

    const [ids, setIds] = useState<string[]>(); //TODO validate what happens when id of defaultVales is not valid id of options available in MultipleSelect/backend
    useEffect(() => { onChange(selection); }, [selection]);
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
                        const f: SenseOptionsType | undefined = selection.find((s) => s.id === option.value);
                        if (f) { newSelection.push({'id': f.id, 'name': f.name, 'score': f.score });}
                        else{newSelection.push({'id': option.value, 'name': option.text, 'score': 0.00});} // default score
                        // const { name, id, score } = f ? f : { name: option.text, id: option.value, score: 0.00 };
                    });
                    setSelection(newSelection);
                }}
            />
            <br />
            <SensesRanges selectedSenses={selection} onChangeRange={onChangeRange} />
            <IISensesRange />
            {/* <IIISensesRange /> */}
        </>
    );
}

const SensesRanges = ({ selectedSenses, onChangeRange }: { selectedSenses: SenseOptionsType[], onChangeRange: (values: SenseOptionsType) => void }) => {
    return (
        <>
            {
                selectedSenses.map(({ name, score, id }: SenseOptionsType) => {
                    return (
                        <>
                            <div className="flex align-middle justify-center items-center">
                                <p className="mr-2 w-auto text-sm text-center">{name}</p>
                                <input
                                    type="range"
                                    className="range w-4/5"
                                    aria-label="range"
                                    defaultValue={score} // value={rangeValue}
                                    onChange={(e) => onChangeRange({ name, id, score: parseFloat(e.target.value) })}
                                    min={0}
                                    max={5}
                                    step={0.01}
                                />
                                <p className="text-xs text-gray-500 ml-2 w-auto">{score}</p>
                            </div>
                        </>
                    );
                })
            }
        </>
    );
}

const IISensesRange = () => {
    // let rangeInstance = null;
    const sliderRef = useRef(null);
    const config = {
        start: [20,50],
        // start: 25,
        // connect: 'lower',
        // connect: "upper",
        connect: true,
        range : {
            min: 0,
            max: 100
        },
        // margin: 300,
        // cssPrefix: 'noUi-',

        // style: 'tap',
        // orientation: 'horizontal',
        /* cssClasses: {
            target: "relative h-2 rounded-full bg-neutral/10",
            base: "size-full relative z-[1]",
            origin: "absolute top-0 end-0 rtl:start-0 size-full origin-[0_0] rounded-full",
            handle: "absolute top-1/2 end-0 rtl:start-0 size-4 bg-base-100 border-[3px] border-primary rounded-full translate-x-2/4 -translate-y-2/4 hover:cursor-grab active:cursor-grabbing hover:ring-2 ring-primary active:ring-[3px]",
            connects: "relative z-0 w-full h-2 rtl:rounded-e-full rtl:rounded-s-none rounded-s-full overflow-hidden",
            connect: "absolute top-0 end-0 rtl:start-0 z-[1] size-full bg-primary origin-[0_0]  -translate-y-2/4",
            touchArea: "absolute -top-1 -bottom-1 -start-1 -end-1",
            horizontal: "h-2",
        }, */


        /* "cssClasses": {
            "target": "relative h-1 rounded-full bg-neutral/10",
            // "target": " h-1 bg-neutral/10 range-slider",
            "base": "size-full relative z-[1]",
            // "base": " z-[1]",
            "origin": "absolute top-0 end-0 rtl:start-0 size-full origin-[0_0] rounded-full",
            // "origin": " rounded-full ",
            // "handle": "absolute top-1/2 end-0 rtl:start-0 size-2.5 bg-base-100 border-[2.5px] border-primary rounded-full translate-x-2/4 -translate-y-2/4 hover:cursor-grab active:cursor-grabbing hover:ring-2 ring-primary active:ring-[3px]",
            "handle": "absolute top-1/2 end-0 rtl:start-0 size-2.5 bg-base-100 border-[2.5px] border-primary rounded-full  hover:cursor-grab active:cursor-grabbing hover:ring-2 ring-primary active:ring-[3px]",
            // "handle": " top-1/2 end-0 rtl:start-0 size-2.5 bg-base-100 border-[2.5px] border-primary rounded-full translate-x-2/4 -translate-y-2/4 hover:cursor-grab active:cursor-grabbing hover:ring-2 ring-primary active:ring-[3px]",
            // "handle": " size-2.5 border-[2.5px]  ",
            "connects": "relative z-0 w-full h-1 rtl:rounded-e-full rtl:rounded-s-none rounded-s-full overflow-hidden",
            // "connects": " z-0 w-full h-1 ",
            "connect": "absolute top-0 end-0 rtl:start-0 z-[1] size-full bg-primary origin-[0_0]  -translate-y-2/4",
            // "connect": "z-[1] size-full bg-primary origin-[0_0]  ",
            "touchArea": "absolute -top-1 -bottom-1 -start-1 -end-1"
            // "touchArea": " ",
        } */
        
    }

    useEffect(() => {
        if (sliderRef.current) {
            // rangeInstance = new HSRangeSlider(sliderRef.current);
            // console.log(rangeInstance)
            if (sliderRef.current && !sliderRef.current.noUiSlider) {
            noUiSlider.create(sliderRef.current, config);
            }
            return () => {
                if (sliderRef.current && sliderRef.current.noUiSlider) {
                    sliderRef.current.noUiSlider.destroy();
                    }
            };
        }
    }, []);

    // return (<>Testtt...</>)

    return (
        // <div className="p-8 w-full max-w-md" style={{ position: 'relative', display: 'block' }}>
        <div className="p-8 w-full max-w-md relative block" >
            
            {/* <label className="sr-only">Example</label> */}
            <div 
                className="slider-styled"
                // data-range-slider = {JSON.stringify(config)}
                /* data-range-slider='{
                    "start": 50,
                    "connect": "lower",
                    "range": {
                    "min": 0,
                    "max": 100
                    },
                    "cssClasses": {
                    "target": "relative h-2 rounded-full bg-neutral/10",
                    "base": "size-full relative z-[1]",
                    "origin": "absolute top-0 end-0 rtl:start-0 size-full origin-[0_0] rounded-full",
                    "handle": "absolute top-1/2 end-0 rtl:start-0 size-4 bg-base-100 border-[3px] border-primary rounded-full translate-x-2/4 -translate-y-2/4 hover:cursor-grab active:cursor-grabbing hover:ring-2 ring-primary active:ring-[3px]",
                    "connects": "relative z-0 w-full h-2 rtl:rounded-e-full rtl:rounded-s-none rounded-s-full overflow-hidden",
                    "connect": "absolute top-0 end-0 rtl:start-0 z-[1] size-full bg-primary origin-[0_0]  -translate-y-2/4",
                    "touchArea": "absolute -top-1 -bottom-1 -start-1 -end-1"
                    }
                }' */
                ref={sliderRef}>
            </div>

        </div>

            // {/* <script src="/nouislider/dist/nouislider.min.js"></script> */}
            // {/* <script src="../../../../node_modules/nouislider/dist/nouislider"></script> */}
    );
}

const IIISensesRange = () => {
    const min = 0;
    const max = 100;
    // const middle = (min + max) / 2;
    const middle = 20;

    const [range1, setRange1] = useState(25);
    const [range2, setRange2] = useState(25);
    const onChangeRange1 = (event : React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseFloat(event.target.value);
        setRange1(newValue)
    }
    const onChangeRange2 = (event : React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseFloat(event.target.value);
        setRange2(newValue)
    }
    const [divition, setDivition] = useState<number>(middle);

    useEffect(() => {
        // setDivition((min + max) / 2);
        setDivition(middle );
    }, []);
    useEffect(() => {
        console.log("change", range1, range2, divition)
        // if (!range1Ref.current || !range2Ref.current) return;
        // if(range1Ref.current.value == divition) setDivition(parseFloat(range1Ref.current.value));
        if(range1 == Math.trunc(divition)){ 
            console.log("is equal")
            setDivition(divition+5);
        }
        // if(range2Ref.current.value < divition) setDivition(max - parseFloat(range2Ref.current.value));

        // setDivition((min + max) / 2);
    }, [range1, range2]);

    return(
        <div className="w-full flex justify-center items-center">
            <input type="range" onChange={onChangeRange1} className={`bg-red-600 rounded-[0px] w-[${divition}%]`} value={range1} />
            <input type="range" onChange={onChangeRange2} className={`bg-blue-600 rounded-[0px] w-auto`} value={range2} />
            {/* <input type="range" onChange={onChangeRange2} className={`bg-blue-600 rounded-[0px]  w-[${100 - divition}%]`} /> */}

            {/* <input type="range" onChange={onChangeRange1} className={`bg-red-600 rounded-[0px] outline-0 ring-0 w-[20%]`} /> */}
            {/* <input type="range" onChange={onChangeRange2} className={`bg-blue-600 rounded-[0px] outline-0 ring-0 w-[80%]`} /> */}
        </div>
    );
    return (
        {/* <div className="w-full relative">
            <input type="range" className="bg-[#7c2323] absolute border-0 " name="" id="" />
            <input type="range" className="bg-[#092284] border-0 pointer-events-none" name="" id="" />
        </div> */}
    );
}

export { SenseInput }