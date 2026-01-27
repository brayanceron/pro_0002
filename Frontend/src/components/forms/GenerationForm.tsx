import AppButton from '../buttons/AppButton';
import { useForm } from '../../hooks/useForm';
import { usePost, type reqProps } from '../../hooks/usePost';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Method } from "../../utils/Methods"
import { type SenseOptionsType } from '../inputs/SenseInput/SenseInput';
import { GenerationFormBase } from './GenerationForm/GenerationFormBase';
import { GoalInput } from '../inputs/GoalInput';

export type GenerationFormsFields = { // interface GenerationFormsFields  {
    genders?: string[],
    senses?: SenseOptionsType[], // senses?: string[],
    singers?: string[],
    languages?: string[],
    goal?: number,
    // user_id?: string,
}
type ComponentProps = {
    values?: GenerationFormsFieldsComplete,
    url : string,
    method? : Method,
    callback: (params: reqProps) => void,
    saveArg?: boolean,
}

const emptyValues : GenerationFormsFields = { genders: [], senses: [], singers: [], languages: [], goal: 0, /* user_id: '' */ };
const emptyFields : GenerationFormsFieldsComplete = { 
    include : emptyValues,
    exclude : emptyValues,
    user_id : '',
    goal : -1,
};
const keyThatAreArrays = ['gender', /* 'sense', */ 'singer', 'language'];
// TODO change this file to GenerationForm folder

export const GenerationForm = ({ values = emptyFields, url, callback, method = Method.POST, /* saveArg = true */ }: ComponentProps) => {
    const { user } = useContext(AuthContext)
    values.user_id = user?.id || ''

    const { data, onChange } = useForm<GenerationFormsFieldsComplete>(values); // let { data, onChangeMultipleSelect, onChange } = useFormData<GenerationFormsFields>(values, keyThatAreArrays.map(i => i + 's') );
    const { sendReq, isLoading } = usePost(data, url, callback, method);

    const onSubmit = () => { 
        sendReq(); 
    }

    const onChangeGeneral = (key : string, value: any, typeAction: 'include' | 'exclude') => {
        const updateValue = { ...data[typeAction], [key]: value };
        onChange({target : { name: typeAction, value: updateValue }});
    }
    const onChangeInclude = (event: any) => { onChangeGeneral(event.target.name, event.target.value, 'include'); }
    const onChangeExclude = (event: any) => { onChangeGeneral(event.target.name, event.target.value, 'exclude'); }
    
    //TODO (this for later) : this save playlist data only if the form data changes, it for avoid save repeated generated playlists
    /* 
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
                    <div className='w-full flex items-center justify-center'>

                        <div className='w-1/2 h-full shadow-lg p-4 my-4 mx-2 border-[1px] border-gray-200'>
                            <h1 className="text-center text-2xl font-bold mt-6 mb-4">Include</h1>
                            <GenerationFormBase 
                                data={data.include}
                                keyThatAreArrays={keyThatAreArrays} 
                                onChange={onChangeInclude} // onChange={onChange}
                            />
                            <GoalInput key="1" value={data.goal} name="goal" id="goal" label="Score" onChange={onChange} />
                        </div>
                        
                        <div className='w-1/2 h-full shadow-lg p-4 my-4 mx-2 border-[1px] border-gray-200'>
                            <h1 className="text-center text-2xl font-bold mt-6 mb-4">Exclude</h1>
                            <GenerationFormBase 
                                data={data.exclude}
                                keyThatAreArrays={keyThatAreArrays}
                                onChange={onChangeExclude} // onChange={onChangeEx}
                            />
                        </div>

                    </div>
                    <AppButton text="Generate" onClick={onSubmit} isLoading={isLoading} />
                </>

            }
        </>

    );
}

type GenerationFormsFieldsComplete = {
    include: GenerationFormsFields,
    exclude: GenerationFormsFields,
    user_id : string,
    goal: number,
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