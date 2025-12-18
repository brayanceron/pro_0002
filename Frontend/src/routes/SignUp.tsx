import { NavLink, } from "react-router"
import { UserForm } from "../components/forms/UserForm"
import type { reqProps } from "../hooks/usePost";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const SignUp = () => {
    const { reload } = useContext(AuthContext)
    
    function cb({ res, error }: reqProps) {
        if (error) { return alert(error.message) }
        if (res && res.status == 200) { return reload(); }

        alert("Operation not completed");
    }

    // const frm = UserForm({ callback: cb, toLogin: true })

    return (
        <div className="w-full">

            <div className=" m-auto mt-5 w-1/4">
                <UserForm 
                    url={`http://localhost:5000/api/auth/signup?to_login=1"`} // url={`http://localhost:5000/api/user?to_login=1"`}
                    callback={cb}
                />
                {/* {frm} */}
            </div>

            <div className="w-full flex justify-center my-5">
                <NavLink to={"/login"}>
                    <span className="link link-animated m-auto text-center ">
                        I already have an account, Login
                    </span>
                </NavLink>
            </div>

        </div>
    )
}

export { SignUp }
