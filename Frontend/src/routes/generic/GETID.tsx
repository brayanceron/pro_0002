import { useParams, useNavigate } from "react-router";
import useFetch from "../../hooks/useFetch";
import { getImageUrl } from "../../utils/urls";
import { GenericForm } from "../../components/forms/GenericForm";

import senseDefault from "../../assets/default/sense.png"
import playlistDefault from "../../assets/default/playlist.png"
import genderDefault from "../../assets/default/gender.png"
import singerDefault from "../../assets/default/singer.jpg"
import languageDefault from "../../assets/default/language.png"
import type { reqProps } from "../../hooks/usePost";
import { Method } from "../../utils/Methods";
import { useState } from "react";
import { AppAlert } from "../../components/informational/AppAlert";
import { Notyf } from "notyf"
import "../../../node_modules/notyf/notyf.min.css"

const defaultImgs = {
    sense: senseDefault,
    playlist: playlistDefault,
    gender: genderDefault,
    singer: singerDefault,
    language: languageDefault
}

type EntityType = 'sense' | 'playlist' | 'gender' | "singer" | "language";

const GETID = ({ entity }: { entity: EntityType }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    // const url = `http://localhost:5000/api/${entity}/${id}`;
    const [url, setUrl] = useState(`http://localhost:5000/api/${entity}/${id}`)
    const { data, isLoading, error } = useFetch(url);

    const notyf = new Notyf();
    function cb({ res, result, error : errorCb }: reqProps) {
        if (errorCb) { return notyf.error("Error updating the song!  "+ errorCb.message); }
        if (res && res.ok){ 
            setUrl(befUrl => befUrl + ' ');
            return notyf.success(result.message); 
        }
    }

    function onClickGetSongs() { navigate(`/song/get/by/${entity}/${id}`); }

    return (
        <div className="flex mt-20 justify-center gap-32">
            {
                isLoading ? <p>Loading...</p> :
                    error ? <AppAlert message={error.message} color="error" icon="x" soft addStyles="w-1/4" /> :
                        <>
                            <div className="flex flex-col justify-center w-fit">
                                <div className="w-auto">
                                    <img className="mask mask-decagon m-auto size-44" src={data.image ? getImageUrl(data.image) : defaultImgs[entity]} alt="Error" />
                                    <h1 className="text-4xl text-center mt-2">{data.name}</h1>
                                    <p className="text-xs text-center">{id}</p>
                                    <p className="text-xs text-center text-gray-400">({entity})</p>

                                    <div className="w-full flex justify-center mt-4 gap-0">
                                        <span onClick={onClickGetSongs} className="badge badge-neutral size-6 rounded-full p-0 mr-1">
                                            <span className="icon-[tabler--music]"></span>
                                        </span>

                                        <span className="badge badge-neutral size-6 rounded-full p-0">
                                            <span className="icon-[tabler--trash]"></span>
                                        </span>
                                    </div>

                                </div>
                            </div>

                            <div className="w-fit">
                                <GenericForm
                                    values={data}
                                    title={`Update ${entity}`}  // title="Update Entity"
                                    url={`http://localhost:5000/api/${entity}/${id}`} /* FIXME si no se le pasa el id genera problemas */
                                    nameFieldOptions={{ label: "Gender Name", icon: "music-share", }}
                                    descriptionFieldOptions={{ label: "Gender Description" }}
                                    callback={cb}
                                    method={Method.PUT}
                                />
                            </div>
                        </>
            }
        </div>
    )
}

export default GETID
