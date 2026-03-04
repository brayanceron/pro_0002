import { useState } from "react";

export function useForm__(fields : any) {
    const [formData, setFormData] = useState(fields)

    function onChangeField(event: any){
        const field = event.target.id
        const value = event.target.value
        console.log(field, value);

        setFormData({...formData, [field] : value})
    }

    function setField(field: any , value : any){
        setFormData({...formData, [field] : value})
    }

    function setFields(fields : {field: any , value : any}[]) {
        let forDataTemp = formData
        fields.forEach(item => {
            forDataTemp = {...forDataTemp, [item.field] : item.value }
        })

        setFormData({...forDataTemp})
    }

    return{
        formData,
        onChangeField,
        setField,
        setFields
    }
}