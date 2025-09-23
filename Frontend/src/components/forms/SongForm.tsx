import { useContext, useEffect, useState, type BaseSyntheticEvent } from "react"

import AppButton from "../buttons/AppButton"
import AppInput from "../inputs/AppInput"
import AppTextArea from "../inputs/AppTextArea"
import MultipleSelect from "../inputs/MultipleSelect"
// import sonDefault from "../../assets/songDefault.jpeg"
import { GoalInput } from "../inputs/GoalInput"
import useFetch from "../../hooks/useFetch"
import { useFormData } from "../../hooks/useFormData"
import { usePost, type reqProps } from "../../hooks/usePost"
import { PlayerComponent } from "../player/PlayerComponent"
import { Method } from "../../utils/Methods"
import { AuthContext } from "../../context/AuthContext"
// import { GenericForm } from "./GenericForm"
// import Yt from "../player/Yt"


function validarLinkYoutube(url: string) {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/|v\/|.+\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})$/;
    return youtubeRegex.test(url);
}

const emptyFields = { url: '', image: '', name: '', languages: '', duration: '', genders: [], senses: [], singers: [], playlists: [], description: '', goal: 0 }
// const emptyFields = { id : '', url: '', image: '', name: '', languages: '', duration: '', genders: [], senses: [], singers: [], playlists: [], description: '', goal : 0 }


const SongForm = ({ values = emptyFields, url, method = Method.POST, callback }: { values?: any, url: string, method?: Method, callback: (params: reqProps) => void }) => {
    const { user: userAuth } = useContext(AuthContext); // const userAuth = useContext(AuthContext!);
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    values.user_id = userAuth?.id;

    useEffect(() => {
        const loadFlyonui = async () => {
            await import('flyonui/flyonui');
            window.HSStaticMethods.autoInit();
        };
        loadFlyonui();
    }, [location.pathname]);

    const { data: genderData, error: genderError, isLoading: genderIsLoading } = useFetch(`http://localhost:5000/api/gender/by/user/${userAuth?.id}`);
    const { data: genderAdminData, error: genderAdminError, isLoading: genderAdminIsLoading } = useFetch(`http://localhost:5000/api/gender/by/admin`);

    const { data: senseData, error: senseError, isLoading: senseIsLoading } = useFetch(`http://localhost:5000/api/sense/by/user/${userAuth?.id}`);
    const { data: senseAdminData, error: senseAdminError, isLoading: senseAdminIsLoading } = useFetch(`http://localhost:5000/api/sense/by/admin`);

    const { data: singerData, error: singerError, isLoading: singerIsLoading } = useFetch(`http://localhost:5000/api/singer/by/user/${userAuth?.id}`);
    const { data: singerAdminData, error: singerAdminError, isLoading: singerAdminIsLoading } = useFetch(`http://localhost:5000/api/singer/by/admin`);

    const { data: playlistData, error: playlistError, isLoading: playlistIsLoading } = useFetch(`http://localhost:5000/api/playlist/by/user/${userAuth?.id}`);
    // const { data: playlistAdminData, error: playlistAdminError, isLoading: playlistAdminIsLoading } = useFetch(`http://localhost:5000/api/playlist/by/admin`);

    const { data: languageData, error: languageError, isLoading: languageIsLoading } = useFetch(`http://localhost:5000/api/language/by/user/${userAuth?.id}`);
    const { data: languageAdminData, error: languageAdminError, isLoading: languageAdminIsLoading } = useFetch(`http://localhost:5000/api/language/by/admin`);

    const { data, formData, onChange, onChangeFile, onChangeMultipleSelect } = useFormData(values);
    const { sendReq } = usePost(formData, url, callback, method)
    // const { sendReq } = usePost(formData, "http://localhost:5000/api/song", callback, method )
    function onSub() {
        console.log(data)
        sendReq()
    }


    return (
        // <div className="shadow-md  w-1/3 m-auto border-t-[1px] border-gray-100 border-solid">
        <div className="shadow-md  w-full m-auto border-t-[1px] border-gray-100 border-solid">
            <div className="w-full px-4 py-2">

                <h1 className="text-center text-2xl font-bold mt-6 mb-4">{`${method == Method.POST ? 'Register' : 'Update'} Song`}</h1>

                {/* <AppInput id="link" name="link" value="" options={{ label: "By Link", icon: "link" }} /> */}
                <div className="border-[1px] border-gray-200  px-2 pb-2 shadow-md">
                    <nav className="tabs tabs-bordered" aria-label="Tabs" role="tablist" aria-orientation="horizontal">
                        <button type="button" className="tab active-tab:tab-active active w-full" id="tabs-basic-filled-item-1" data-tab="#tabs-basic-filled-1" aria-controls="tabs-basic-filled-1" role="tab" aria-selected="true">
                            Link
                        </button>
                        <button type="button" className="tab active-tab:tab-active w-full" id="tabs-basic-filled-item-2" data-tab="#tabs-basic-filled-2" aria-controls="tabs-basic-filled-2" role="tab" aria-selected="false">
                            File
                        </button>
                    </nav>

                    <div className="mt-3 ">

                        <div id="tabs-basic-filled-1" role="tabpanel" aria-labelledby="tabs-basic-filled-item-1">
                            <AppInput id="url" name="url" value={videoUrl || ''} options={{ label: "By Link", icon: "link" }}
                                onChange={(event: BaseSyntheticEvent) => { setVideoUrl(event.target.value); onChange(event) }}
                            />
                            <AppButton text="Extract info" addStyles="btn-xs w-[130px] my-1" icon="stack-push" />
                            {
                                videoUrl === null ? <p className="text-sm text-gray-300">...</p> :
                                    validarLinkYoutube(videoUrl) ?
                                        <div className="bg-black"><PlayerComponent /></div>
                                        : <p className="text-sm text-gray-300 ">Onvalid Youtube Link!</p>
                            }
                        </div>

                        <div id="tabs-basic-filled-2" className="hidden" role="tabpanel" aria-labelledby="tabs-basic-filled-item-2">
                            <AppInput id="file" name="file" value="" type='file' options={{ label: "By File" }} onChange={onChangeFile} />
                        </div>

                    </div>
                </div>


                <AppInput id="name" name="name" value={data.name} onChange={onChange} options={{ label: "Name", icon: "text-recognition" }} />
                <AppInput id="duration" name="duration" value={data.duration} onChange={onChange} options={{ label: "duration", icon: "clock" }} />

                {
                    (genderIsLoading || genderAdminIsLoading) ? <p>Loading...</p> :
                        (genderError && genderAdminError) ? <p>Error!! :{genderAdminError?.message}</p> :
                            <>   
                            <MultipleSelect values={values.genders}
                                    id="genders" name="genders" label="Attach Genders"
                                    options={[...(!genderError ? genderData : []), ...(!genderAdminError ? genderAdminData : [])]}
                                    onChange={onChangeMultipleSelect} />
                                {/* <AddNewItem /> */}
                                {genderError && <p className="text-xs text-red-500">* Error : {genderError.message}</p>}
                                {genderAdminError && <p className="text-xs text-red-500">* Error(admin) : {genderAdminError.message}</p>}
                            </>
                }
                {
                    (senseIsLoading || senseAdminIsLoading) ? <p>Loading...</p> :
                        (senseError && senseAdminError) ? <p>Error!! </p> :
                            <>
                                <MultipleSelect values={values.senses}
                                    id="senses" name="senses" label="Attach Sense"
                                    options={[...(!senseError ? senseData : []), ...(!senseAdminError ? senseAdminData : [])]} onChange={onChangeMultipleSelect} />
                                {senseError && <p className="text-xs text-red-500">* Error : {senseError.message}</p>}
                                {senseAdminError && <p className="text-xs text-red-500">* Error(admin) : {senseAdminError.message}</p>}
                            </>
                }
                {
                    (singerIsLoading || singerAdminIsLoading) ? <p>Loading...</p> :
                        (singerError && singerAdminError) ? <p>Error!! </p> :
                            // <MultipleSelect values={values.singers} id="singers" name="singers" label="Attach Singer" options={[...singerData, ...singerAdminData]} onChange={onChangeMultipleSelect} />
                            <>
                                <MultipleSelect values={values.singers}
                                    id="singers" name="singers" label="Attach Singer"
                                    options={[...(!singerError ? singerData : []), ...(!singerAdminError ? singerAdminData : [])]} onChange={onChangeMultipleSelect} />
                                {singerError && <p className="text-xs text-red-500">* Error : {singerError.message}</p>}
                                {singerAdminError && <p className="text-xs text-red-500">* Error(admin) : {singerAdminError.message}</p>}
                            </>
                }


                {
                    (languageIsLoading || languageAdminIsLoading) ? <p>Loading...</p> :
                        (languageError && languageAdminError) ? <p>Error!! </p> :
                            <>
                                <MultipleSelect values={values.languages}
                                    id="languages" name="languages" label="Attach Language"
                                    options={[...(!languageError ? languageData : []), ...(!languageAdminError ? languageAdminData : [])]} onChange={onChangeMultipleSelect} />
                                {languageError && <p className="text-xs text-red-500">* Error : {languageError.message}</p>}
                                {languageAdminError && <p className="text-xs text-red-500">* Error(admin) : {languageAdminError.message}</p>}
                            </>

                }
                {
                    (playlistIsLoading /* || playlistAdminIsLoading */) ? <p>Loading...</p> :
                        (playlistError/*  || playlistAdminError */) ? <p>* Error : {playlistError.message}</p> :
                            <>
                                <MultipleSelect value={values.playlists}
                                    id="playlists" name="playlists" label="Attach Playlist"
                                    options={[...(!playlistError ? playlistData : [])]} onChange={onChangeMultipleSelect} />
                                {/* {playlistError && <p className="text-xs text-red-500">* Error : {playlistError.message}</p>} */}
                            </>
                }

                <AppTextArea id="description" name="description" value={data.description} onChange={onChange} options={{ label: "Description", icon: "text-recognition" }} />

                <GoalInput id="goal" name="goal" label="Goal : " size="3xl" onChange={onChange} value={data.goal} />

                <div className="w-full my-3">
                    <label className="label label-text" htmlFor="image"> Select Image/Photo </label>
                    <input type="file" className="input input-xs" id="image" name="image" onChange={onChangeFile} />
                </div>

                <AppButton text={method == Method.POST ? "Register" : "Update"} addStyles="my-2" icon="send" onClick={onSub} />

            </div>
            {/* {JSON.stringify(data)} */}

        </div>
    )
}


// const


// const AddNewItem = () => {
//     // <div className="w-full">

//     {/* <div className="w-full flex justify-end pt-1 gap-[2px]"> */ }
//     return (
//         <>
//             <div className="w-full pt-1 pb-0 mb-0 flex justify-end gap-[2px] h-[20px]">
//                 <div className="w-[25px]">
//                     <AppButton text="" icon="plus" addStyles=" btn-circle btn-xs pt-0 px-1 h-[20px]" data-overlay="#basic-modal" />
//                 </div>
//                 <div className="w-[25px]">
//                     <AppButton text="" icon="reload" addStyles="btn-circle btn-xs pt-0 px-1" />
//                 </div>
//             </div>


//             <div id="basic-modal" className="overlay modal overlay-open:opacity-100 hidden" role="dialog" tabIndex={- 1}>
//                 <div className="modal-dialog overlay-open:opacity-100">
//                     <div className="modal-content">

//                         <div className="modal-header">
//                             {/* <h3 className="modal-title">Dialog Title</h3> */}
//                             <button type="button" className="btn btn-text btn-circle btn-sm absolute end-3 top-3" aria-label="Close" data-overlay="#basic-modal" >
//                                 <span className="icon-[tabler--x] size-4"></span>
//                             </button>
//                         </div>

//                         <div className="modal-body">
//                             <div className='w-full h-auto mt-2 mx-0'>
//                                 <GenericForm
//                                     title="Register entity"
//                                     url={"http:///"}
//                                     callback={() => { }}
//                                     nameFieldOptions={{ label: "Gender Name", icon: "music-share", }}
//                                     descriptionFieldOptions={{ label: "Gender Description" }}
//                                 />
//                             </div>
//                         </div>

                        
//                         {/* <div className="modal-footer">
//                             <button type="button" className="btn btn-soft btn-secondary" data-overlay="#basic-modal">Close</button>
//                             <button type="button" className="btn btn-primary">Save changes</button>
//                         </div> 
//                          */}

//                     </div>
//                 </div>
//             </div>
//         </>


//     );

// }


export default SongForm


