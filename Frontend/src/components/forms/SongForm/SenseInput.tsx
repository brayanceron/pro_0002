import { useEffect, useState, type BaseSyntheticEvent } from "react";
import { WrapMultipleSelect } from "./WrapMultipleSelect";

type OptionsType = {
    id: string,
    name: string,
    score: number,
}

const SenseInput = ({ options, onChange }: { options: any, onChange: (selection: OptionsType[]) => void }) => {
    const [selection, setSelection] = useState<OptionsType[]>([]);

    const onChangeRange = ({ name, score/* ,id */ }: OptionsType) => {
        const updatedSelection = selection.map((item: OptionsType) => { return item.name === name ? { ...item, score: score } : item; });
        if (updatedSelection) setSelection(updatedSelection);
    }

    useEffect(() => { onChange(selection); }, [selection]);

    return (
        <>
            <WrapMultipleSelect
                entity="sense"
                values={options}
                onChangeMultipleSelect={(event: BaseSyntheticEvent) => { // onChangeMultipleSelect={onChangeMultipleSelect}
                    const newSelection: OptionsType[] = [];
                    const options = Array.from(event.target.selectedOptions);

                    options.forEach((option: any) => {
                        const f: OptionsType | undefined = selection.find((s) => s.name === option.text);
                        if (f) { newSelection.push({'id': f.id, 'name': f.name, 'score': f.score });}
                        else{newSelection.push({'id': option.value, 'name': option.text, 'score': 0.00});} // default score
                        // const { name, id, score } = f ? f : { name: option.text, id: option.value, score: 0.00 };
                        // newSelection.push({ name, id, score }); // default score
                    });
                    setSelection(newSelection);
                }}
            />
            <br />
            <SensesRanges selectedSenses={selection} onChangeRange={onChangeRange} />
        </>
    );
}

const SensesRanges = ({ selectedSenses, onChangeRange }: { selectedSenses: OptionsType[], onChangeRange: (values: OptionsType) => void }) => {
    return (
        <>
            {
                selectedSenses.map(({ name, score }: OptionsType) => {
                    return (
                        <>
                            <div className="flex align-middle justify-center items-center">
                                <p className="mr-2 w-auto text-sm text-center">{name}</p>
                                <input
                                    type="range"
                                    className="range w-4/5"
                                    aria-label="range"
                                    defaultValue={score} // value={rangeValue}
                                    onChange={(e) => onChangeRange({ name: name, score: parseFloat(e.target.value), id: '' })}
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