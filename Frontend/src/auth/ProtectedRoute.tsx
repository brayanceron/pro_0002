import { useContext, type ReactNode } from "react"
import { AuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router";
import { Navigate } from "react-router";


const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const { user } = useContext(AuthContext);
    if (!user || user === null) { return <Navigate to="/login" /> }
    return children;
}

export { ProtectedRoute }
