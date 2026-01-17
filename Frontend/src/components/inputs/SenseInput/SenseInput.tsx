import { useEffect, /* useRef, */ useState, type BaseSyntheticEvent } from "react";
import { WrapMultipleSelect } from "./WrapMultipleSelect";

import { AppInputRange } from "./AppInputRange";

export type SenseOptionsType = {
    id: string,
    name: string,
    score: ScoreType,
}

export type ScoreType = {
    min : number,
    max : number,
}

//TODO change this file to inputs folder
const SenseInput = ({ defaultValues, onChange, isMultiple = false }: { defaultValues: SenseOptionsType[], onChange: (selection: SenseOptionsType[]) => void, isMultiple?: boolean }) => {
    const [selection, setSelection] = useState<SenseOptionsType[]>(defaultValues ? defaultValues : []);

    const onChangeRange = ({ /* name, */ score, id }: SenseOptionsType) => {
        const updatedSelection = selection.map((item: SenseOptionsType) => { return item.id === id ? { ...item, score } : item; }); // const updatedSelection = selectionData.map((item: SenseOptionsType) => { return item.id === id ? { id: item.id, name: item.name, score : newScore } : item; });
        if (updatedSelection) {console.log("saving..."); setSelection(updatedSelection);}
    }

    const [ids, setIds] = useState<string[]>(); //TODO validate what happens when id of defaultVales is not valid id of options available in MultipleSelect/backend
    useEffect(() => { onChange(selection); }, [selection]);
    useEffect(() => { setIds(defaultValues.map((item) => item.id)); },[]);
    
    return (
        <>
            <WrapMultipleSelect
                entity="sense"
                values={ids!}
                onChangeMultipleSelect={(event: BaseSyntheticEvent) => { // onChangeMultipleSelect={onChangeMultipleSelect}
                    const newSelection: SenseOptionsType[] = [];
                    const options = Array.from(event.target.selectedOptions);

                    options.forEach((option: any) => {
                        const f: SenseOptionsType | undefined = selection.find((s) => s.id === option.value);
                        if (f) { newSelection.push({'id': f.id, 'name': f.name, 'score': f.score });}
                        else{newSelection.push({'id': option.value, 'name': option.text, 'score': {min: isMultiple ? 0 : -1, max: 0}});} // default score
                    });
                    setSelection(newSelection);
                }}
            />
            <br />

            <SensesRanges selectedSenses={selection} onChangeRange={onChangeRange} isMultiple={isMultiple} />
        </>
    );
}

const SensesRanges = ({ selectedSenses, onChangeRange, isMultiple }: { selectedSenses: SenseOptionsType[], onChangeRange: (values: SenseOptionsType) => void, isMultiple: boolean }) => {
    return (
        <>
            {
                selectedSenses.map(({ name, score, id }: SenseOptionsType, _ : number ) => {
                    return (
                        <>
                            <div className="flex align-middle justify-center items-center mb-[3px]">
                                <p className="mr-1 px-0 w-2/12 text-xs text-right">{name}</p>

                                <AppInputRange
                                    key={id}
                                    defaultValue={score}
                                    id={id}
                                    isMultiple={isMultiple}
                                    onChangeRange={ onChangeRange } // onChangeRange={(e:SenseOptionsType) => { onChangeRange({ name : e.name, id : e.id, score: { min: isMultiple ? parseFloat(e.score.min.toString()) : -1, max: parseFloat(e.score.max.toString()) } }) }}
                                />
                                <p className={`text-xs text-gray-500 ml-2 ${isMultiple ? 'w-3/12' : 'w-1/12'}`}>{ isMultiple ? `${score.min} - ${score.max}` : score.max}</p>
                            </div>
                        </>
                    );
                })
            }
        </>
    );
}

export { SenseInput }

// {
//     // selectedSenses.map( (item, index) => <MyRange id={(index+100).toString()} defaultValue={[21, 41]} /* key={index+50} *//>)
//     // selectedSenses.map((item, index) => <MyRangeII name={(index+100).toString()} isMultiple={true} onChangeRange={ _ =>{}}/>)
// }
// {
//     // [[10, 30],[20, 40],/* [10,30], */[20, 40]].map((item, index) => <MyRange id={index.toString()} defaultValue={[item[0], item[1]]}/>)
//     // [[1, 3],[2, 4],/* [10,30], */[2, 4]].map((item, index) => <AppInputRange isMultiple={false} id={index.toString()} defaultValue={{min: item[0], max: item[1]}} onChangeRange={ _ =>{}}/>)
// }