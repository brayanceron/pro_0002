import { useContext, useState } from "react";
import { useForm } from "../../hooks/useForm"
// import { usePost } from "../../hooks/usePost";
import AppButton from "../buttons/AppButton"
import AppInput from "../inputs/AppInput"
import { AuthContext } from "../../context/AuthContext";

type LoginFormType ={
    email : string,
    password : string,
}

const LoginForm = ({values}:{values? : LoginFormType | null}) => {

    const { data, onChange } = useForm<LoginFormType>(values || { email: '', password: '' });
    const {login} = useContext(AuthContext)!;
    
    // const cb = ()=>{ console.log(result)}
    // const {sendReq, result} = usePost(data, "http://localhost:5000/api/auth/login", cb);

    const [isLoading, setIsLoading] = useState(false);
    const onSubmit = async () => {
        setIsLoading(true)
        await login(data.email, data.password);
        setIsLoading(false)
    }
    return (
        <div className="shadow-md  min-w-[370px] w-[370px] m-auto border-t-[1px] border-gray-100 border-solid">
            <div className="w-full px-6 py-2">

                <h1 className="text-center text-2xl font-bold mt-4 mb-2"> Login </h1>

                <div className="mt-4">
                    <AppInput value={data.email} id="email" name="email" type="email" onChange={onChange} options={{ label: 'Email', icon: 'mail' }} />
                </div>
                <div className="mt-4">
                    <AppInput value={data.password} id="password" name="password" type="password" onChange={onChange} options={{ label: 'Password', icon: 'lock-password' }} />
                </div>

                <AppButton text="Login" onClick={onSubmit} icon="send" addStyles="my-8" isLoading = {isLoading} />

            </div>
        </div>
    )
}

export { LoginForm } 
