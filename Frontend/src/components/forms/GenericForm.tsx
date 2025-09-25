import AppInput, { type OptionsInput } from "../inputs/AppInput"
import AppTextArea from "../inputs/AppTextArea"
import AppButton from "../buttons/AppButton"
import { useFormData } from "../../hooks/useFormData"
import { usePost, type reqProps } from "../../hooks/usePost"
import { Method } from "../../utils/Methods"
import { GoalInput } from "../inputs/GoalInput"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"

export type GenericFormComponentProps = {
    values?: GenericFormFields,
    title: string,
    url: string
    nameFieldOptions?: OptionsInput,
    descriptionFieldOptions?: OptionsInput,
    ButtonOptions?: OptionsInput,
    method?: Method, // = Method.POST
    callback: (params: reqProps) => void,
    // method?: Method = Method.POST
}
export type GenericFormFields = {
    name: string,
    description?: string,
    score : number,
    image?: File | undefined,
    user_id: string,
}
const emptyFields = { name: '', description: '', score : 0, image: undefined, user_id: '' }

const GenericForm = ({ values = emptyFields, title, url, nameFieldOptions, descriptionFieldOptions, method = Method.POST, callback }: GenericFormComponentProps) => {
    const {user:userAuth} = useContext(AuthContext);
    values.user_id = userAuth!.id; // values.user_id = userAuth.user!.id;

    const onSubmit = () => { sendReq(); }
    // descriptionFieldOptions!.icon = 'text-recognition'; // review possible null

    const { data, formData, onChange, onChangeFile } = useFormData<GenericFormFields>(values);
    const { sendReq, isLoading } = usePost(formData, url, callback, method);

    return (
        <>
            <div className="shadow-md w-full min-w-[380px] m-auto border-t-[1px] border-gray-100 border-solid">
                <div className="w-full px-4 py-2">

                    <h1 className="text-center text-2xl font-bold mt-4 mb-2">{title}</h1>

                    <AppInput value={data.name} name="name" id="name" onChange={onChange} options={nameFieldOptions} /> {/* <AppInput {...name} value={data.name} name="name" id="name" label={name.label} helper={name.helper} icon={name.icon} onChange={onChange} /> */}
                    <AppTextArea value={data.description || ''} name="description" id="description" onChange={onChange} rows={5} options={descriptionFieldOptions} /> {/* <AppTextArea value={data.description} name="description" id="description" label={description.label} helper={description.helper} icon={description.icon} rows={5} onChange={onChange} /> */}

                    <div className="w-full my-3">
                        <label className="label label-text" htmlFor="image"> Select Image/Photo </label>
                        <input type="file" className="input input-xs" id="image" name="image" onChange={onChangeFile} />
                    </div>

                    <GoalInput value={data.score} name="score" id="score" label="Goal : " onChange={onChange}/>

                    {/* <AppButton text="Send" onClick={onSubmit} icon="send" isLoading={isLoading} /> */}
                    <AppButton text={ method == Method.POST ? "Register" : "Update" } onClick={onSubmit} icon="send" isLoading={isLoading} />

                </div>
            </div>

        </>
    )
}

export { GenericForm }
