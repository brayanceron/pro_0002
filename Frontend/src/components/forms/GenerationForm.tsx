import { WrapMultipleSelect } from './SongForm/WrapMultipleSelect';
import { GoalInput } from '../inputs/GoalInput';
import AppButton from '../buttons/AppButton';
import { useFormData } from '../../hooks/useFormData';
import { usePost, type reqProps } from '../../hooks/usePost';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

type GenerationFormsFields = { // interface GenerationFormsFields  {
    genders?: string[],
    senses?: string[],
    singers?: string[],
    languages?: string[],
    goal?: number,
    user_id?: string,
}
type ComponentProps = {
    values?: GenerationFormsFields,
    callback: (params: reqProps) => void,
}

const emptyFields = { genders: [], senses: [], singers: [], languages: [], goal: 0, user_id: '' };
const keyThatAreArrays = ['gender', 'sense', 'singer', 'language'];


export const GenerationForm = ({ values = emptyFields, callback }: ComponentProps) => {
    const {user} = useContext(AuthContext)
    values.user_id = user?.id || ''
    let { data, onChangeMultipleSelect, onChange, /* formData, setAllFields, */ } = useFormData<GenerationFormsFields>(values, keyThatAreArrays.map(i => i + 's'));
    const { sendReq } = usePost(data, "http://localhost:5000/api/song/generate", callback); // const { sendReq } = usePost(formData, "http://localhost:5000/api/song/generate", callback);
    const onSubmit = () => { sendReq(); }

    /* useEffect(() => {
        console.log("values ->", values);
        setAllFields(values);
    }, [values]) */

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

                    <GoalInput key="1" value={data.goal} name="goal" id="goal" label="Score" onChange={onChange} />

                    <AppButton text="Generate" onClick={onSubmit} />
                </>

            }
        </>

    );
}
