import { useState } from "react";

const useForm = <T>(fields: T): { data: T, onChange: (event: any) => void } => {
    const [data, setData] = useState(fields);

    // const onchange = (event : BaseSyntheticEvent) =>{
    const onChange = (event: any) => {
        setData({ ...data, [event.target.name]: event.target.value })
    }

    return {
        data,
        onChange,
        // ...data
    }
}

export { useForm }