import { SenseInput, type SenseOptionsType, /* type SenseOptionsType */ } from "../../inputs/SenseInput/SenseInput";
import { WrapMultipleSelect } from "../SongForm/WrapMultipleSelect";

type Props = {
    data?: GenerationFormsBaseFields,
    onChange: (Event: any) => void,
}
export type GenerationFormsBaseFields = {
    genders?: string[],
    senses?: SenseOptionsType[], // senses?: string[],
    singers?: string[],
    languages?: string[],
    // goal?: number,
    // user_id?: string,
}

export const emptyFields : GenerationFormsBaseFields = { genders: [], senses: [], singers: [], languages: [] };

export const GenerationFormBase = ({ data = emptyFields, onChange }: Props) => {
    data = {...emptyFields, ...data};

    const onChangeSense = (selection: any) => { onChange({ target: { name: 'senses', value: selection } }); }
    const onChangeMultipleSelect = (event: any) => {
        const values = Array.from(event.target.selectedOptions, (option: any) => option.value);
        const key = event.target.name;
        onChange({ target: { name: key, value: values } });
    }
    const theKeys = Object.keys(data).map((item : string) => item.substring(0, item.length - 1)).filter( f => f != 'sense');

    return (
        <>
            {
                theKeys.map((item: string) => {
                        return (
                            <WrapMultipleSelect
                                entity={item}
                                values={data[`${item}s` as keyof GenerationFormsBaseFields] as string[] || []} // values={data[`${item}` as keyof GenerationFormsBaseFields] as string[] || []}
                                onChangeMultipleSelect={onChangeMultipleSelect}
                                key={item}
                            />
                        );
                })
            }

            <div className="w-full shadow-md px-2 py-4 my-3 border-[1px] border-gray-200">
                <SenseInput defaultValues={data.senses || []} onChange={onChangeSense} isMultiple={true} />
            </div>

        </>
    );
}
