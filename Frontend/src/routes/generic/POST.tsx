// import { GenderForm } from "../../components/forms/GenderForm"
import { useNavigate } from "react-router"
import { GenericForm } from "../../components/forms/GenericForm"
import type { OptionsInput } from "../../components/inputs/AppInput"
import type { reqProps } from "../../hooks/usePost"

const POST = ({ entity, title, url, nameOpt, descriptionOpt} : { entity : string, title? : string, url? : string,nameOpt: OptionsInput, descriptionOpt : OptionsInput}) => {
    url = url || `http://localhost:5000/api/${entity}`
    // title = title || `Register ${entity}`
    const navigate = useNavigate()

    function cb({ res, result, error }: reqProps) {
        if (error) { return alert(error.message) }
        if (res && res.status == 200){ return navigate(`/${entity}/get/${result.id}`); }
        alert("Operation not completed");
    }
    
    return (
            <div className='w-1/4 h-screen mt-15 mx-auto'>
                <GenericForm
                    title={title || `Register ${entity}`}
                    nameFieldOptions={nameOpt}
                    descriptionFieldOptions={descriptionOpt}
                    url={url}
                    callback={cb}
                />
            </div>
    )
}

export default POST
