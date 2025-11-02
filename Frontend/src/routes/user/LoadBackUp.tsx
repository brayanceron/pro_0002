import { useContext } from "react";
import { useFormData } from "../../hooks/useFormData"
import { usePost, type reqProps } from "../../hooks/usePost";
import { AuthContext } from "../../context/AuthContext";
import { AppAlert } from "../../components/informational/AppAlert";
import AppButton from "../../components/buttons/AppButton";

const LoadBackUp = () => {
    const { formData, onChangeFile } = useFormData({ backup_file: '' });
    const { user } = useContext(AuthContext);

    const cb = (r: reqProps) => { console.log(r); }
    const { result, isLoading, sendReq, res } = usePost(formData, `http://localhost:5000/api/user/load_backup/${user?.id}`, cb);
    const btnLogout = () => { sendReq(); }

    return (
        <div className="w-full">
            <div className="flex justify-center pt-3">
                <input type="file" className="input max-w-sm" aria-label="file-input" name="backup_file" onChange={onChangeFile} />
            </div>
            <div className="my-1">
                <div className="w-fit mx-auto">
                    <AppButton text="Load File" addStyles="btn-xs" icon="file-upload" onClick={btnLogout} isLoading={isLoading} />
                </div>
            </div>

            {isLoading && <p>Loading...</p>}
            {
                res !== null &&
                <AppAlert
                    title={res!.ok ? "Successfull operation!" : "Error! :("}
                    icon={res.ok ? "check" : 'error'} // icon={!res.ok ? "error" : 'check'}
                    message={`${result.message} ${res.ok ? ". Enjoy your music!" : ''}`}
                    color={res!.ok ? 'success' : 'error'} soft
                />
            }
        </div>
    );

}

export { LoadBackUp }
