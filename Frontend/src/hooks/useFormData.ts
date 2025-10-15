import { useState, } from "react";

function useFormData<T>(fields: T, keysAreArray : string[] = []): { data: T, formData: FormData, onChange: (event: any) => void, onChangeFile: (event: any) => void, onChangeMultipleSelect: (event: any) => void } {
    const fd = new FormData()
    for (const key in fields) { // Object.keys()
        const value = fields[key]
        if(Array.isArray(value)) value.forEach(item => fd.append(key, item as any)) //INFO it's solution to song form problem (method PUT)
        else fd.append(key, value as any)
    }

    const [formData, setData] = useState<FormData>(fd)
    const [data, setFmtData] = useState<T>(fields)

    function onChange(event: any) {
        const newFormData = formData
        newFormData.set(event.target.name, event.target.value)
        setData(newFormData)
        formatData()
    }

    function onChangeFile(event: any) {
        const newFormData = formData
        newFormData.set(event.target.name, event.target.files[0])
        setData(newFormData)
        formatData()
    }

    function onChangeMultipleSelect(event: any) {
        const values = Array.from(event.target.selectedOptions, (option: any) => option.value);
        const key = event.target.name;

        const newFormData = formData
        newFormData.delete(key)
        values.forEach((item: string) => { newFormData.append(key, item) })
        
        setData(newFormData)
        formatData()
    }
    
    function formatData() {
        const obj: any = {}; // let obj : T | {} = {};
        formData.forEach((value : any, key) => {
            const keyValues = formData.getAll(key);

            if(keysAreArray.includes(key)) obj[key] = keyValues; // obj[key] = keyValues.filter(cadena => cadena !== "");
            else obj[key] = value; // else obj[key] = keyValues[0]
        });
        console.log(obj)
        setFmtData(obj)
    }

    return {
        data,
        formData,
        onChange,
        onChangeFile,
        onChangeMultipleSelect
    }

}

export { useFormData }