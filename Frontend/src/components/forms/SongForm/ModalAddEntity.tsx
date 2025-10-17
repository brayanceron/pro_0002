import { type reqProps } from "../../../hooks/usePost"
import { GenericForm } from '../GenericForm'

const ModalAddEntity = ({ entity }: { entity: string }) => {

    function cb({ res, result, error }: reqProps) {
        console.log(result)
        if (error) { return alert(error.message) }
        // if (res && res.status == 200){ return navigate(`/${entity}/get/${result.id}`); }
        if (res && res.status == 200) { return alert("Todo salio bien") }
        alert("Operation not completed");
    }

    return (
        <div id={`modal-${entity}`} className="overlay modal overlay-open:opacity-100 hidden" role="dialog" tabIndex={- 1}>
            <div className="modal-dialog overlay-open:opacity-100">
                <div className="modal-content">

                    <div className="modal-header">
                        {/* <h3 className="modal-title">Dialog Title</h3> */}
                        {/* <button type="button" className="btn btn-text btn-circle btn-sm absolute end-3 top-3" aria-label="Close" data-overlay="#basic-modal" > */}
                        <button type="button" className="btn btn-text btn-circle btn-sm absolute end-3 top-3" aria-label="Close" data-overlay={`#modal-${entity}`} >
                            <span className="icon-[tabler--x] size-4"></span>
                        </button>
                    </div>

                    <div className="modal-body">
                        <div className='w-full h-auto mt-2 mx-0'>
                            <GenericForm
                                title={`Register ${entity}`}
                                url={`http://localhost:5000/api/${entity}`}
                                callback={cb}
                                nameFieldOptions={{ label: "Gender Name", icon: "music-share", }}
                                descriptionFieldOptions={{ label: "Gender Description" }}
                            />
                        </div>
                    </div>


                    {/* <div className="modal-footer">
                            <button type="button" className="btn btn-soft btn-secondary" data-overlay="#basic-modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div> 
                         */}

                </div>
            </div>
        </div>
    )
}

export default ModalAddEntity
