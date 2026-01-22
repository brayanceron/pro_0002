import { useContext } from "react";
import SongList from "../../../components/player/SongList"
import type { reqProps } from "../../../hooks/usePost";
import { PlayListContext } from "../../../context/PlayListContext";
import { useNavigate } from "react-router";
import { HSOverlay } from "flyonui/flyonui";
import AppButton from "../../../components/buttons/AppButton";


export const PlayListModal = ({isLoading, result : playList, error, /* res */} : reqProps) => {
    const { setPlayList } = useContext(PlayListContext);
    const navigate = useNavigate();
    
    const onClickBtnSave = () => {
        if (error) return alert(error.message);
        HSOverlay.close('#large-modal');

        setPlayList({
            isLoading: isLoading,
            error: error,
            playList: playList, // playList: result,
            currentIndex: 0,
        });
        setTimeout(() => { navigate('/playing'); }, 500); // TODO fix navigate before modal close | simulate a loading while closing
    }

    return (
        <>
            <div id="large-modal" className="overlay modal overlay-open:opacity-100 hidden" role="dialog" tabIndex={-1}>
                <div className="modal-dialog overlay-open:opacity-100 modal-dialog-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title">Results</h3>
                            <button type="button" className="btn btn-text btn-circle btn-sm absolute end-3 top-3" aria-label="Close" data-overlay="#large-modal" >
                                <span className="icon-[tabler--x] size-4"></span>
                            </button>
                        </div>

                        <div className="modal-body">
                            <h1 className="text-2xl">Generation Results</h1>
                            <SongList playList={playList} isLoading={isLoading} error={error} currentIndex={0} />
                        </div>

                        <div className="modal-footer mt-4">
                            {/* <button type="button" className="btn btn-soft btn-secondary w-[" data-overlay="#large-modal">Close</button> */}
                            <AppButton text="Generate" onClick={onClickBtnSave} isLoading={isLoading} addStyles="w-[40%] mx-auto" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

// {/* <button type="button" className="btn btn-primary" aria-haspopup="dialog" aria-expanded="false" aria-controls="large-modal" data-overlay="#large-modal">Large</button> */}
