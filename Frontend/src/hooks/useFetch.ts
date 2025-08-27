import { useState, useEffect } from "react"

type Params = {
    // data: {} | null,
    data: any | null,
    isLoading: boolean,
    error: Error | null,
    res: Response | null
}

const initValues = { data: null, isLoading: false, error: null, res: null }


const useFetch = (url: string) => {
    const [req, setReq] = useState<Params>({ ...initValues, isLoading: true })

    async function getData(url: string) {
        try {
            const res = await fetch(url, { method: 'GET', credentials: "include" });
            const data = await res.json()

            const contentType = res.headers.get('Content-Type');
            if (!contentType || !contentType.includes('application/json')) {
                return setReq({ ...initValues, error: Error("Invalid response, try later"), res })
            }

            setReq({ data: data, isLoading: false, error: res.ok ? null : Error(data.message), res })
        } catch (error) {
            setReq({ ...initValues, error: Error(error instanceof Error ? error.message : `unspcted error :${error}`) })
        }
    }


    useEffect(() => {
        if (!url) { return setReq({ data: null, isLoading: false, error: Error("invalid url"), res: null }); }
        getData(url)
    }, [url])

    return { ...req }
}

export default useFetch
