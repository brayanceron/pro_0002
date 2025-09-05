import { useState, } from "react";

function useFormData<T>(fields: T): { data: T, formData: FormData, onChange: (event: any) => void, onChangeFile: (event: any) => void, onChangeMultipleSelect: (event: any) => void } {
    const fd = new FormData()
    for (const key in fields) { // Object.keys()
        const value = fields[key]
        fd.append(key, value as any)
    }

    const [formData, setData] = useState<FormData>(fd)
    const [data, setFmtData] = useState<T>(fields)

    function onChange(event: any) {
        formData.set(event.target.name, event.target.value)
        const newFormData = formData
        setData(newFormData)
        formatData()
    }

    function onChangeFile(event: any) {
        formData.set(event.target.name, event.target.files[0])
        const newFormData = formData
        setData(newFormData)
        formatData()
    }

    function onChangeMultipleSelect(event: any) {
        const values = Array.from(event.target.selectedOptions, (option: any) => option.value);
        const key = event.target.name;
        
        formData.delete(key)
        values.forEach((item: string) => { formData.append(key, item) })
        formData.append(key, '')
        formData.append(key, '')
        
        const newFormData = formData
        setData(newFormData)
        formatData()
    }

    function formatData() {
        const obj: any = {}; // let obj : T | {} = {};
        
        formData.forEach((value, key) => {
            const keyValues = formData.getAll(key);
            if (keyValues.length > 1) { obj[key] = keyValues.filter(cadena => cadena !== ""); }
            else obj[key] = value;
        });

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