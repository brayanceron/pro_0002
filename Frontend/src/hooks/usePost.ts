import { useEffect, useState } from "react";
import { Method } from "../utils/Methods";
// import { AuthContext } from "../context/AuthContext";

export type reqProps = {
    result: any,
    isLoading: boolean,
    error: Error | null,
    res: Response | null,
}
const headers: {} = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
};
const initVal = {
    result: null,
    isLoading: false,
    error: null,
    res: null
}

function usePost(body: any, url: string, callback: (params: reqProps) => void, method: Method = Method.POST) {
    // const userAuth = useContext(AuthContext)
    const [req, setReq] = useState<reqProps>(initVal)
    // console.log(body, "****") // warns here

    const sendReq = async () => {
        if (!url) { setReq({ ...initVal, error: Error('Invalid url') }) }
        setReq({ ...initVal, isLoading: true })

        try {
            const res = await fetch(url, {
                headers: body instanceof FormData ? {} : headers,
                // headers: body instanceof FormData ? {'Authorization' : `Bearer ${userAuth?.token}`} : {...headers, 'Authorization' : `Bearer ${userAuth?.token}`},
                body: body instanceof FormData ? body : JSON.stringify(body),
                method: method == Method.POST ? 'POST' : 'PUT',
                credentials: "include",
            })

            const contentType = res.headers.get('Content-Type');
            if (!contentType || !contentType.includes('application/json')) {
                return setReq({ ...initVal, error: Error("Invalid response, try later"), res })
            }

            const data = await res.json();
            setReq({ result: data, isLoading: false, error: res.ok ? null : Error(data.message), res })
        } catch (error) {
            setReq({ ...initVal, error: Error(error instanceof Error ? error.message : `It's a error: ${error}`) })
        }

    }

    useEffect(() => {
        if (req.isLoading || (req.error === null && req.res === null)) return
        callback(req)
    }, [req])

    return {
        ...req,
        sendReq
    };
}

export { usePost }