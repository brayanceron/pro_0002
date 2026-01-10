import { useEffect, useState, type BaseSyntheticEvent } from "react";
import { WrapMultipleSelect } from "./WrapMultipleSelect";

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


export { SenseInput }