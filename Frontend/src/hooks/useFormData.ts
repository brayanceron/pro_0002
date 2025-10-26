import { useState, } from "react";

function useFormData<T>(fields: T, keysAreArray: string[] = []): { data: T, formData: FormData, setAllFields: (newData: T) => void, onChange: (event: any) => void, onChangeFile: (event: any) => void, onChangeMultipleSelect: (event: any) => void } {

    const buildFormData = (src: any) => {
        const fd = new FormData()
        for (const key in src) {
            const value = src[key]
            if(Array.isArray(value)) value.forEach(item => fd.append(key, item as any)) //INFO it's solution to song form problem (method PUT)
            else if(value !== undefined && value !== null) fd.append(key, value as any)
        }
        return fd
    }

    const [formData, setData] = useState<FormData>(() => buildFormData(fields)) // const [formData, setData] = useState<FormData>(fd)
    const [data, setFmtData] = useState<T>(fields)

    function onChange(event: any) {
        const newFormData = formData
        // const newFormData = cloneFormData(formData)
        newFormData.set(event.target.name, event.target.value)
        setData(newFormData)
        formatData()
    }

    function onChangeFile(event: any) {
        const newFormData = formData
        // const newFormData = cloneFormData(formData)
        newFormData.set(event.target.name, event.target.files[0])
        setData(newFormData)
        formatData()
    }

    function onChangeMultipleSelect(event: any) {
        const values = Array.from(event.target.selectedOptions, (option: any) => option.value);
        const key = event.target.name;

        const newFormData = formData
        // const newFormData = cloneFormData(formData)
        newFormData.delete(key)
        values.forEach((item: string) => { newFormData.append(key, item) })

        setData(newFormData)
        formatData()
    }

    function formatData() {
        const obj: any = {}; // let obj : T | {} = {};
        formData.forEach((value: any, key) => {
            const keyValues = formData.getAll(key);

            if (keysAreArray.includes(key)) obj[key] = keyValues; // obj[key] = keyValues.filter(cadena => cadena !== "");
            else obj[key] = value; // else obj[key] = keyValues[0]
        });
        console.log(obj)
        setFmtData(obj)
    }

    function cloneFormData(formData: FormData): FormData {
        const cloned = new FormData();

        for (const [key, value] of formData.entries()) {
            // if it's a File, create a new file with the same content
            if (value instanceof File) { cloned.append(key, value, value.name); }
            else { cloned.append(key, value); }
        }

        return cloned;
    }

    function setAllFields(newData: T) {
        const fd2 = buildFormData(newData as any)
        setData(fd2)
        formatData() // formatData(fd)
    }


    return {
        data,
        formData,
        setAllFields,
        onChange,
        onChangeFile,
        onChangeMultipleSelect
    }

}

export { useFormData }