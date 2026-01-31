import AppButton from '../buttons/AppButton';
import { useForm } from '../../hooks/useForm';
import { usePost, type reqProps } from '../../hooks/usePost';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Method } from "../../utils/Methods"
import { type SenseOptionsType, type ScoreType } from '../inputs/SenseInput/SenseInput';
import { GenerationFormBase, type GenerationFormsBaseFields, emptyFields as emptyBaseValues} from './GenerationForm/GenerationFormBase';
import { AppRangeInput } from '../inputs/AppRangeInput/AppRangeInput';
import { PipsMode } from 'nouislider';

type ComponentProps = {
    values?: GenerationFormsFields,
    url : string,
    method? : Method,
    callback: (params: reqProps) => void,
    saveArg?: boolean,
}

const emptyGoal : ScoreType= { min : 0, max : 4.8 };
const emptyFields : GenerationFormsFields = { 
    include : emptyBaseValues,
    exclude : emptyBaseValues,
    user_id : '',
    goal : emptyGoal, // goal : -1,
};
// TODO change this file to GenerationForm folder

export const GenerationForm = ({ values = emptyFields, url, callback, method = Method.POST, /* saveArg = true */ }: ComponentProps) => {
    const { user } = useContext(AuthContext)
    values.user_id = user?.id || ''
    values.goal = {...emptyGoal, ...values.goal}; // values.goal = values.goal || emptyGoal;

    const { data, onChange } = useForm<GenerationFormsFields>(values);
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
    const onChangeGoalRange = (valuess : SenseOptionsType) => { onChange({target : {name : valuess.id, value : valuess.score}}) }
    return (
        <>
            {
                <>
                    <div className='w-full flex items-center justify-center'>

                        <div className='w-1/2 h-full shadow-lg p-4 my-4 mx-2 border-[1px] border-gray-200'>
                            <h1 className="text-center text-2xl font-bold mt-6 mb-4">Include</h1>
                            <GenerationFormBase 
                                defaultValues={data.include}
                                onChange={onChangeInclude} // onChange={onChange}
                            />
                            <div className='w-full h-[100px] pr-2 mt-5'>
                                <p className='mb-[10px]'>General Score:</p>
                                <AppRangeInput defaultValue={data.goal} onChangeRange={onChangeGoalRange} id='goal' isMultiple = {true} addStyles={rangeStyles} /> 
                            </div>
                        </div>
                        
                        <div className='w-1/2 h-full shadow-lg p-4 my-4 mx-2 border-[1px] border-gray-200'>
                            <h1 className="text-center text-2xl font-bold mt-6 mb-4">Exclude</h1>
                            <GenerationFormBase 
                                defaultValues={data.exclude}
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

type GenerationFormsFields = {
    include: GenerationFormsBaseFields,
    exclude: GenerationFormsBaseFields,
    user_id : string,
    goal: ScoreType, // goal: number,// goal: SenseOptionsType, // goal: number,
}

const rangeStyles: any = {
    range: {
        'min': 0,
        'max': 5, // 'max': 100 //TODO - max and min should be props
        '10%' : 1.0,
        '20%' : 2.0,
        '30%' : 3.0,
        '45%': 4.0
    },
    pips : {
        mode: PipsMode.Values,
        values: [0,1,2,3,4,5],
        density: 4
    },
    tooltips : [ true, true],
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