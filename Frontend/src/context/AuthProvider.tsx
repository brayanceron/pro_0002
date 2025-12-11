import { useEffect, useState, type ReactNode } from "react";
// import useFetch from "../hooks/useFetch";
import { AuthContext, type AuthContextUserType } from "./AuthContext";
import { useNavigate, useLocation } from "react-router";
// import { AuthContext } from "./AuthContext"


type fetchType = { user: AuthContextUserType | null, isLoading: boolean, error: Error | null }

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const navigate = useNavigate()
    const location = useLocation();

    /*  
    let { data: data, isLoading, error } = useFetch("http://localhost:5000/api/auth/whoami");
    data as AuthContextUserType;
    const [userAuth, setUserAuth] = useState(data);

    useEffect(() => {
        setUserAuth(data);
    }, [data, isLoading, error]) 
     */


    /* 
    let laData = useFetch("http://localhost:5000/api/auth/whoami");
    const [{data : userAuth, isLoading, error}, setUserAuth2] = useState(laData);
    useEffect(()=>{setUserAuth2(laData)},[laData.data, laData.error, laData.isLoading])
    // useEffect(()=>{setUserAuth2(laData)},[laData])
    // useEffect(()=>{setUserAuth2(laData)},[userAuth, isLoading, error]) 
    */

    // const [values, setValues] = useState<any>({ user: null, isLoading: true, error: null }); //###################

    const [values, setValues] = useState<fetchType>({ user: null, isLoading: true, error: null }); //###################
    let { user: userAuth, isLoading, error } = values;

    async function pull() {
        console.log(location.pathname);
        const res = await fetch('http://localhost:5000/api/auth/whoami', { credentials: 'include' });
        const user_res = await res.json();
        if (res.status == 401) {
            return setValues({ user: null, isLoading: false, error: null });
        }
        setValues({ user: res.ok ? user_res : null, isLoading: false, error: res.ok ? null : new Error(`user unknown_ error : ${user_res.message}`) })//###################
    }

    useEffect(() => { pull(); }, [])


    const reload = async () => {
        await pull();
        navigate('/user/get');
    }
    const login = async (email: string, password: string) => {
        const res = await fetch('http://localhost:5000/api/auth/login',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
                credentials: 'include'
            }
        );
        const data = await res.json()
        if (res.ok) {
            await pull();
            navigate('/user/get');
        }
        else { 
            alert(data.message);
        }
    }
    const logout = async () => {
        const res = await fetch("http://localhost:5000/api/auth/logout", { credentials: "include" }); // TODO verify req in the backend, it must have token 
        // const datares = await res.json()

        if (res.ok) {
            setValues({ user: null, isLoading: false, error: null });
            navigate('/login');
            // console.log(datares)
        }

    }

    return (
        // <AuthContext.Provider value={{ user: userAuth, login, logout }} >
        <AuthContext.Provider value={{ user: userAuth, login, logout, reload }} >
            {
                isLoading ? <p>Loading Session</p> :
                    error ? <p>Error ocurred: "{error.message}". Try later</p> :
                        children
            }
        </AuthContext.Provider >
    );
}

export default AuthProvider
