import { SenseInput, /* type SenseOptionsType */ } from "../../inputs/SenseInput/SenseInput";
import type { GenerationFormsFields } from "../GenerationForm";
import { WrapMultipleSelect } from "../SongForm/WrapMultipleSelect";

type Props = {
    data: any,
    onChange: (Event: any) => void,
    // onChangeSense: (selection: SenseOptionsType[]) => void
    keyThatAreArrays: string[],
}
// const keyThatAreArrays = ['gender', /* 'sense', */ 'singer', 'language'];
export const GenerationFormBase = ({ data, keyThatAreArrays, onChange }: Props) => {

    const onChangeSense = (data: any) => { onChange({ target: { name: 'senses', value: data } }); }
    const onChangeMultipleSelect = (event: any) => {
        const values = Array.from(event.target.selectedOptions, (option: any) => option.value);
        const key = event.target.name;
        onChange({ target: { name: key, value: values } });
    }

    return (
        <>
            {
                <>
                    {keyThatAreArrays.map((item: string) => {
                        return (
                            <WrapMultipleSelect
                                entity={item}
                                values={data[`${item}s` as keyof GenerationFormsFields] as string[] || []}
                                onChangeMultipleSelect={onChangeMultipleSelect}
                                key={item}
                            />
                        );
                    })}

                    <div className="w-full shadow-md px-2 py-4 my-3 border-[1px] border-gray-200">
                        {/* <SenseInput defaultValues={values.senses || []} onChange={onChangeSense} isMultiple={true} /> */}
                        <SenseInput defaultValues={data.senses || []} onChange={onChangeSense} isMultiple={true} />
                    </div>

                    {/* <GoalInput key="1" value={data.goal} name="goal" id="goal" label="Score" onChange={onChange} /> */}

                    {/* <AppButton text="Generate" onClick={onSubmit} isLoading={isLoading} /> */}
                </>

            }
        </>

    );
}
