import { useContext, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import MultipleSelect from "../../inputs/MultipleSelect"
import { MoreOptions } from "./MoreOptions";
import { AuthContext } from "../../../context/AuthContext";

const WrapMultipleSelect = ({ entity, values, onChangeMultipleSelect, addAdmin = true }: { entity: string, values: Array<string>, onChangeMultipleSelect: (event: any) => void, addAdmin?: boolean }) => {
    const { user: userAuth } = useContext(AuthContext);
    const [url, setUrl] = useState(`http://localhost:5000/api/${entity}/by/user/${userAuth?.id}`)

    const reloadUrl = () => {
        console.log(url, url.length)
        // console.log(isLoading)
        let newUrl = "";

        if (url.includes(' ')) { newUrl = url.trimEnd() }
        else { newUrl = ` ${url} ` }
        setUrl(newUrl)
    }

    const { data, error, isLoading, res } = useFetch(url);
    const { data: adminData, error: adminError, isLoading: adminIsLoading, res: resAdmin } = useFetch(`http://localhost:5000/api/${entity}/by/admin`);


    return (
        <>
            {
                (isLoading || (addAdmin ? adminIsLoading : false)) ? <p>Loading...</p> :
                    // (error && (addAdmin ? adminError : true)) ? <p>Error loading user and application {entity}s: {adminError?.message}</p> :
                        <>
                            <MultipleSelect
                                values={values}
                                key={entity}
                                id={`${entity}s`}
                                name={`${entity}s`}
                                label={`Attach ${entity}s`}
                                options={[...(!error ? data : []), ...((!adminError && addAdmin) ? adminData : [])]}
                                onChange={onChangeMultipleSelect}
                                disabled = {error && (addAdmin ? adminError : true)}
                            />

                            {error && <p className={`text-xs ${res?.status == 404 ? 'text-yellow-500' : 'text-red-500'} my-0 py-0`}>* Error loading user {entity}s: {error.message}</p>}
                            {
                                (addAdmin && adminError) ?
                                    <p className={`text-xs ${resAdmin?.status == 404 ? 'text-yellow-500' : 'text-red-500'} my-0 py-0`}>* Error loading application {entity}s: {adminError.message}</p>
                                    : <></>
                            }

                            <MoreOptions entity={entity} reload={reloadUrl} />

                        </>
            }
        </>
    );
}

export { WrapMultipleSelect }