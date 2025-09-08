import { useFormData } from "../../hooks/useFormData"
import { usePost } from "../../hooks/usePost"
import { Method } from "../../utils/Methods"
import AppButton from "../buttons/AppButton"
import AppInput from "../inputs/AppInput"
import AppTextArea from "../inputs/AppTextArea"

type UserFormFields = {
    name: string,
    gender: string,
    email: string,
    birthdate: string,
    password: string,
    password2: string,
    image: string,
    description: string,
}
const emptyFields = { name: '', gender: 'M', email: '', birthdate: '', password: '', password2: '', image: '', description: '' };

const UserForm = ({ values = emptyFields, method = Method.POST }: { values?: UserFormFields, method?: Method }) => {
    const { data, formData, onChange, onChangeFile } = useFormData<UserFormFields>(values);
    const cb = () => { }

    const { sendReq } = usePost(formData, 'http://localhost:5000/api/user', cb)
    const onSubmit = () => {
        // console.log(data);
        sendReq()
    }

    return (
        <div className="shadow-md  min-w-[350px]  m-auto border-t-[1px] border-gray-100 border-solid">
            <div className="w-full px-4 py-2">

                <h1 className="text-center text-2xl font-bold mt-4 mb-2">{`${method == Method.POST ? 'Register' : 'Update'} User`}</h1>

                <AppInput value={data.name} id="name" name="name" onChange={onChange} options={{ label: 'Name', icon: 'text-size' }} />

                <h6 className="text-base text-base-content mb-1 mt-2">Gender : </h6>
                <div className="w-full">
                    <ul
                        className="border-base-content/25 divide-base-content/25 flex
    flex-col divide-y rounded-box border first:*:rounded-t-box last:*:rounded-b-box sm:flex-row
    sm:divide-x sm:divide-y-0 first:*:sm:rounded-s-box first:*:sm:rounded-tr-none last:*:sm:rounded-e-box
    last:*:sm:rounded-bl-none rtl:divide-x-reverse">
                        <li className="w-full">
                            <label className="flex cursor-pointer items-center gap-2 p-3">
                                <input value='M' checked={data.gender == 'M'} onChange={onChange} type="radio" name="gender" id="gender" className="radio radio-primary ms-3" />
                                {/* <input value={data.gender} onChange={onChange} type="radio" name="gender" id="gender" className="radio radio-primary ms-3" /> */}
                                <span className="label label-text text-base"> Male </span>
                            </label>
                        </li>
                        <li className="w-full">
                            <label className="flex cursor-pointer items-center gap-2 p-3">
                                <input value='F' checked={data.gender == 'F'} onChange={onChange} type="radio" name="gender" id="gender" className="radio radio-primary ms-3" />
                                <span className="label label-text text-base"> Female </span>
                            </label>
                        </li>
                    </ul>
                </div>

                <AppInput value={data.email} id="email" name="email" onChange={onChange} options={{ label: 'Email', icon: 'mail' }} type="email" />

                <AppInput value={data.birthdate} id="birthdate" name="birthdate" onChange={onChange} options={{ label: 'Birthdate', icon: 'calendar' }} type="date" />

                <AppInput value={data.password} id="password" name="password" onChange={onChange} options={{ label: 'Password', icon: 'lock-password' }} type="password" />
                <AppInput value={data.password2} id="password2" name="password2" onChange={onChange} options={{ label: 'Confirm Password', icon: 'lock-password' }} type="password" />

                <div className="w-full my-3">
                    <label className="label label-text" htmlFor="image"> Select Image/Photo </label>
                    <input type="file" id="image" name="image" onChange={onChangeFile} className="input input-xs" />
                </div>

                <AppTextArea value={data.description} id="description" name="description" onChange={onChange} options={{ label: 'Description', icon: 'text-scan-2' }} />

                <AppButton text={method == Method.POST ? "Register" : "Update"} onClick={onSubmit} icon="send" addStyles="my-2" />

            </div>
        </div>
    )
}

export { UserForm }
