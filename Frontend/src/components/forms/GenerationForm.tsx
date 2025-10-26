import { WrapMultipleSelect } from './SongForm/WrapMultipleSelect';
import { GoalInput } from '../inputs/GoalInput';
import AppButton from '../buttons/AppButton';
import { useFormData } from '../../hooks/useFormData';
import { usePost, type reqProps } from '../../hooks/usePost';
import { useContext, /* useEffect, useState */ } from 'react';
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
    saveArg?: boolean,
}

const emptyFields = { genders: [], senses: [], singers: [], languages: [], goal: 0, user_id: '' };
const keyThatAreArrays = ['gender', 'sense', 'singer', 'language'];


export const GenerationForm = ({ values = emptyFields, callback, saveArg = true }: ComponentProps) => {
    const { user } = useContext(AuthContext)
    values.user_id = user?.id || ''

    let { data, onChangeMultipleSelect, onChange } = useFormData<GenerationFormsFields>(values, keyThatAreArrays.map(i => i + 's'));
    const { sendReq, isLoading } = usePost(data, `http://localhost:5000/api/song/generate?save=true'}`, callback);

    const onSubmit = () => { sendReq(); }

    /* //TODO (this for later) : this save playlist data only if the form data changes, it for avoid save repeated generated playlists
    const [save, setSave] = useState(false); // it starts in false because in beginning both values and data are equal
    const { sendReq, isLoading } = usePost(data, `http://localhost:5000/api/song/generate?${save ? 'save=true' : ''}`, callback); // const { sendReq } = usePost(formData, "http://localhost:5000/api/song/generate", callback);

    useEffect(() => {
        if (!saveArg) return;
        if (compareData(values, data)) { setSave(false); }
        else { setSave(true); }
    }, [data]); */

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

                    <AppButton text="Generate" onClick={onSubmit} isLoading={isLoading} />
                </>

            }
        </>

    );
}

//INFO - This function compares two GenerationFormsFields objects to see if they are equal

/* function compareData(obj1: GenerationFormsFields, obj2: GenerationFormsFields): boolean {
    // if any is null or undefined
    if (obj1 == null || obj2 == null) return false;
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    // if it have different keys
    if (keys1.length !== keys2.length) return false;

    for (const key of keys1) {
        if (!keys2.includes(key)) return false;
        if (JSON.stringify(obj1[key as keyof GenerationFormsFields]) !== JSON.stringify(obj2[key as keyof GenerationFormsFields])) {
            return false;
        }
    }
    return true;
} */