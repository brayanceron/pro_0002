import { useParams } from "react-router";
import { UserForm } from "../../components/forms/UserForm";
import useFetch from "../../hooks/useFetch";
import { Method } from "../../utils/Methods";

import { useContext, useState, } from "react";
import { AuthContext } from "../../context/AuthContext";
import { AppAlert } from "../../components/informational/AppAlert";
import { LoadBackUp } from "./LoadBackUp";
import type { reqProps } from "../../hooks/usePost";
import AppButton from "../../components/buttons/AppButton";
import {AppImage} from "../../components/AppImage";
// import AppButton from "../../components/buttons/AppButton";

const GETID = () => {
    const params = useParams();
    const { user, logout } = useContext(AuthContext)!;
    
    let id = params.id || user?.id; // let id = params.id || userAuth?.id;
    const [url, setUrl] = useState(`http://localhost:5000/api/user/${id}`);
    const { data, isLoading, error } = useFetch(url);
    // const { data, isLoading, error } = useFetch(`http://localhost:5000/api/user/${id}`);

    const [isLoadingLogout, setIsLoadingLogout] = useState(false);
    const btnLogout = async () => { 
        setIsLoadingLogout(true);
        await logout();
        setIsLoadingLogout(false);
        // NOTE it is't bad, but should be in PlaylistContext/PlayListProvider
        // HACK
        localStorage.removeItem('playlist'); 
    }
    /* const generateBackUp = async (e : MouseEventHandler<HTMLElement>) => { 
        // e.preventDefault()
        console.log("downloading...")
        const res = await fetch(`http://localhost:5000/api/user/generate_backup/${id}`,{credentials : "include"})
        const fileData = await res.blob()
        console.log(fileData)
    } */

    function cb({ res, error }: reqProps) {
        if (error) { return alert(error.message) }
        if (res && res.status == 200) { 
            setUrl(befUrl => befUrl + ' ');
            return alert("User updated successfull"); 
        }
        alert("Operation not completed");
    }


    return (
        <div className="w-1/4 mt-15 mx-auto">
            {
                isLoading ? <p>Loading...</p> :
                    error ? <AppAlert message={error.message} color="error" icon="x" soft /> :
                        <>
                            <div className="">
                                <AppImage imageUrl={data.image} /> {/* <AppImage imageUrl="https://sapiens.udenar.edu.co:3026/cdn/images/logo_sapiens.svg" /> */}
                                <p className="text-4xl text-center mt-2"> {data.name} </p>
                                <p className="text-xs text-center"> {data.id} </p>
                                <p className="text-xs text-center text-gray-400">(User)</p>

                                <div className="w-full flex justify-center pt-3 gap-1">
                                    <AppButton text="LogOut" icon="logout" addStyles="btn-xs w-[98px]" onClick={btnLogout} isLoading = {isLoadingLogout} />
                                    <a href={`http://localhost:5000/api/user/generate_backup/${id}`}   /* onClick={generateBackUp} */ className="btn btn-xs btn-squares border-[#2b3137] bg-[#2b3137] text-white shadow-[#2b3137]/30 hover:border-[#2b3137] hover:bg-[#2b3137]/90" aria-label="Github Icon Button" >
                                        <span className="icon-[tabler--cloud-download]"></span>
                                        Backup
                                    </a>
                                    {/* <input type="file" name="" id="" /> */}
                                </div>

                                <LoadBackUp />

                            </div>

                            <div className="mt-5">
                                <UserForm
                                    url={`http://localhost:5000/api/user/${data.id}`}
                                    values={data}
                                    method={Method.PUT}
                                    callback={cb}
                                />
                            </div>
                        </>
            }
        </div>
    );
}

// export { GET }
export default GETID;
