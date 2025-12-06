import { NavLink } from "react-router"
import { LoginForm } from "../components/forms/LoginForm"

const Login = () => {
    return (
        <div className="h-screen flex flex-col justify-center">

            <div className="h-fit">
                <LoginForm />
            </div>

            <div className="mt-4">
                <NavLink to="/signup">
                    <p className="text-center">
                        <span className="link link-animated">I don't have account? Sign Up</span>
                    </p>
                </NavLink>
            </div>

        </div>
    )
}

export { Login }
