import { useEffect, useState, type BaseSyntheticEvent } from "react";
import { WrapMultipleSelect } from "./WrapMultipleSelect";

export type SenseOptionsType = {
    id: string,
    name: string,
    score: { min : number, max: number }, // score: number,
}

//TODO change this file to inputs folder
const SenseInput = ({ defaultValues, onChange, isMultiple = false }: { defaultValues: SenseOptionsType[], onChange: (selection: SenseOptionsType[]) => void, isMultiple?: boolean }) => {
    const [selection, setSelection] = useState<SenseOptionsType[]>(defaultValues ? defaultValues : []);

    const onChangeRange = ({ /* name, */ score, id }: SenseOptionsType) => {
        const updatedSelection = selection.map((item: SenseOptionsType) => { return item.id === id ? { ...item, score } : item; });
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
                selectedSenses.map(({ name, score, id }: SenseOptionsType) => {
                    return (
                        <>
                            <div className="flex align-middle justify-center items-center mb-[3px]">
                                <p className="mr-1 px-0 w-2/12 text-xs text-right">{name}</p>
                                <input
                                    type="range"
                                    className="range w-9/12 mx-0"
                                    aria-label="range"
                                    defaultValue={score.max}
                                    value={score.max}
                                    onChange={(e) => onChangeRange({ name, id, score: { min: isMultiple ? 0 : -1, max: parseFloat(e.target.value)} })}
                                    min={0}
                                    max={5}
                                    step={0.01}
                                />
                                <p className="text-xs text-gray-500 ml-2 w-1/12">{score.max}</p>
                            </div>
                        </>
                    );
                })
            }
        </>
    );
}


export { SenseInput }