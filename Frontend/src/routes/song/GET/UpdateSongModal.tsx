import { useEffect, useState } from "react"
import SongForm from "../../../components/forms/SongForm"
import { Method } from "../../../utils/Methods"

export const UpdateSongModal = ({ modalId, defaultValues, isChanging }: { modalId: string, defaultValues: {}, isChanging: boolean }) => {
    const [fData, setFData] = useState(defaultValues);

    useEffect(() => { setFData(defaultValues); }, [defaultValues])
    
    /* useEffect(() => {
        const loadFlyonui = async () => {
        await import('flyonui/flyonui');
        window.HSStaticMethods.autoInit();
        };
        loadFlyonui();
    }, [defaultValues]); */

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
                                isChanging || !fData ? <p>Loading song data...</p>
                                    : <SongForm values={fData} url={`http://localhost:5000/api/song/${(fData as any).id}`} callback={() => { }} method={Method.PUT} />
                            }
                            {/* <p>{JSON.stringify(defaultValues)}</p> */}
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
