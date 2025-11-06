import { HSOverlay } from "flyonui/flyonui";
import { Notyf } from "notyf"
import AppButton from "../../../components/buttons/AppButton";
import { useState } from "react";

export const OpenModal = (modalId : string) =>{
    const modal = new HSOverlay(document.querySelector(`#${modalId}`)!)
    modal.open()
}
export const CloseModal = (modalId : string) =>{
    const modal = new HSOverlay(document.querySelector(`#${modalId}`)!)
    modal.close()
}

type ComponentProps ={
    modalId: string,
    songName: string,
    songId : string,
    // isChanging? : boolean,
    reload : () => void
}

export const DeleteSongModal = ({ modalId, songId, songName, /* isChanging, */reload }: ComponentProps) => {

    const closeModalHandler = () => { CloseModal(modalId,/* songId */); }
    const [isLoading, setIsLoading] = useState(false)

    const deleteSong = async () => {
        // TODO implement in usePost method 'DELETE' for avoid to do fetch
        setIsLoading(true)
        const notyf = new Notyf();
        const res = await fetch(`http://localhost:5000/api/song/${songId}`, {
            method : 'DELETE',
            credentials : "include"
        });

        const data = await res.json();
        if (res.ok){ 
            notyf.success(data.message); 
            reload()
        }
        else { notyf.error(data.message);}
        CloseModal(modalId, /* songId */)
        setIsLoading(false)
    }

    return (
        <div id={modalId} className="overlay modal overlay-open:opacity-100 hidden" role="dialog" tabIndex={-1}>
            <div className="modal-dialog overlay-open:opacity-100">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title">Delete Song</h3>
                        <button onClick={closeModalHandler} type="button" className="btn btn-text btn-circle btn-sm absolute end-3 top-3" aria-label="Close" /* data-overlay={`#${modalId}`} */ >
                            <span className="icon-[tabler--x] size-4"></span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>Are you sure you want to delete <span className="italic underline">{songName}</span>? </p>
                        
                        <p className="text-xs text-gray-300"> Id : {songId}</p>
                        {/* {
                            !isChanging ? <p>SONG ID : {songId}</p>
                            :<></>
                        } */}
                        
                    </div>
                    <div className="modal-footer">
                        <button onClick={closeModalHandler} type="button" className="btn btn-soft btn-secondary" /* data-overlay={`#${modalId}`} */>Close</button>
                        <AppButton onClick={deleteSong} text="Delete" styles="btn btn-error" isLoading={isLoading}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

