import { useContext, type ReactNode } from "react"
import { Navigate } from "react-router";
import { AuthContext } from "../context/AuthContext";

const ProtectedLogin = ({ children }: { children: ReactNode }) => {
    const { user } = useContext(AuthContext);
    if (user) { return <Navigate to="/user/get" /> }
    return children;
}

export { ProtectedLogin }
