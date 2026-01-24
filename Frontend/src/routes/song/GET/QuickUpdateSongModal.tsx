// import { GenerationForm, type GenerationFormsFields } from "../../../components/forms/GenerationForm"
import { GenerationForm, /* type GenerationFormsFields */ } from "../../../components/forms/GenerationForm"
import { Method } from "../../../utils/Methods"

// TODO delete this file later and use UpdateSongModal instead
// export const UpdateSongModal = ({ modalId, defaultValues, isChanging }: { modalId: string, defaultValues: GenerationFormsFields, isChanging: boolean }) => {
export const QuickUpdateSongModal = ({ modalId, defaultValues, isChanging }: { modalId: string, defaultValues: {}, isChanging: boolean }) => {
    
    return (
        <>
            <div id={modalId} className="overlay modal overlay-open:opacity-100 hidden" role="dialog" tabIndex={-1}>
                <div className="modal-dialog overlay-open:opacity-100">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title">Quick update</h3>
                            <button type="button" className="btn btn-text btn-circle btn-sm absolute end-3 top-3" aria-label="Close" data-overlay={`#${modalId}`} >
                                <span className="icon-[tabler--x] size-4"></span>
                            </button>
                        </div>
                        <div className="modal-body">

                            {
                                isChanging ? <p>Loading song data...</p>
                                : 
                                    <GenerationForm
                                    // values={defaultValues}
                                    url={`http://localhost:5000/api/song/${(defaultValues as any).id}`}
                                    method={Method.PUT}
                                    callback={() => { }}
                                    />
                            }
                            <p>{JSON.stringify(defaultValues)}</p>
                            {/* <WrapMultipleSelect
                                entity="sense"
                                values={[]}
                                onChangeMultipleSelect={(a: string[]) => { console.log(a); }}
                            /> */}

                        </div>
                        {/* <div className="modal-footer">
                            <button type="button" className="btn btn-soft btn-secondary" data-overlay="#basic-modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    )
}
