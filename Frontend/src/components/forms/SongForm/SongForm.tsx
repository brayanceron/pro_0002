import { useContext, useEffect, useState, type BaseSyntheticEvent } from "react"

import AppButton from "../../buttons/AppButton"
import AppInput from "../../inputs/AppInput"
import AppTextArea from "../../inputs/AppTextArea"
import { GoalInput } from "../../inputs/GoalInput"
import { useFormData } from "../../../hooks/useFormData"
import { usePost, type reqProps } from "../../../hooks/usePost"
import { Method } from "../../../utils/Methods"
import { AuthContext } from "../../../context/AuthContext"
import { WrapMultipleSelect } from "./WrapMultipleSelect"
import { AppSelectOptionInput } from "../../inputs/AppSelectOptionInput/AppSelectOptionInput"
import { YouTubePlayer } from "../../player/Yt"
import { SenseInput, type SenseOptionsType} from "../../inputs/SenseInput/SenseInput"

// TODO pass this to SongForm folder

function validarLinkYoutube(url: string) {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/|v\/|.+\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})$/;
    return youtubeRegex.test(url);
}

const emptyFields = { url: '', image: '', name: '', duration: '', genders: [], senses: [], singers: [], languages: [], playlists: [], description: '', goal: 0 }

const SongForm = ({ values = emptyFields, url, method = Method.POST, callback }: { values?: any, url: string, method?: Method, callback: (params: reqProps) => void }) => {
    const { user: userAuth } = useContext(AuthContext); // const userAuth = useContext(AuthContext!);
    const [videoUrl, setVideoUrl] = useState<string | null>(values.url || null); // const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [validateYTUrl, setValidateYTUrl] = useState<boolean>(false);
    values.user_id = userAuth?.id;

    useEffect(() => {
        const loadFlyonui = async () => {
            await import('flyonui/flyonui');
            window.HSStaticMethods.autoInit();
        };
        loadFlyonui();
    }, [location.pathname]);

    const { data, formData, onChange, onChangeFile, onChangeMultipleSelect } = useFormData(values, ['genders', 'senses', 'singers', 'languages', 'playlists']);
    const { sendReq, isLoading } = usePost(formData, url, callback, method) // const { sendReq } = usePost(formData, "http://localhost:5000/api/song", callback, method )
    
    function onSub() { sendReq(); }

    const onChangePlayerStatus = (error : boolean) => { setValidateYTUrl(error); }
    const onChangeSense = (snsData: SenseOptionsType[]) => { onChange({ target: { name: 'senses', value: JSON.stringify(snsData) } }); }
    return (
        <div className="shadow-md  w-full m-auto border-t-[1px] border-gray-100 border-solid">
            <div className="w-full px-4 py-2">

                <h1 className="text-center text-2xl font-bold mt-6 mb-4">{`${method == Method.POST ? 'Register' : 'Update'} Song`}</h1>

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
                            
                            <div className="hidden">
                                <YouTubePlayer url={videoUrl || ''} playing={true} setPlaying={() => {}}
                                    onFinishSong={() => {}} 
                                    onChangeStates={ onChangePlayerStatus }
                                />
                            </div>
                            {
                                videoUrl === null ? <p className="text-sm text-gray-300">...</p> :
                                    !validarLinkYoutube(videoUrl) ?<p className="text-sm text-red-500 ">This link is not a YouTube video!</p>
                                        : validateYTUrl ? <p className="text-sm text-red-500 ">Video not supported!</p>
                                            : <p className="text-sm text-green-500 ">Video compatible!</p>
                            }
                        </div>

                        <div id="tabs-basic-filled-2" className="hidden" role="tabpanel" aria-labelledby="tabs-basic-filled-item-2">
                            <AppInput id="file" name="file" value="" type='file' options={{ label: "By File" }} onChange={onChangeFile} />
                        </div>

                    </div>
                </div>

                <AppInput id="name" name="name" value={data.name} onChange={onChange} options={{ label: "Name", icon: "text-recognition" }} />
                <AppInput id="duration" name="duration" value={data.duration} onChange={onChange} options={{ label: "duration", icon: "clock" }} />

                <AppSelectOptionInput />
                
                {
                    ['gender', /* 'sense', */ 'singer', 'language', 'playlist'].map((item: string) => {
                        return (
                            <WrapMultipleSelect entity={item} values={data[`${item}s`]} onChangeMultipleSelect={onChangeMultipleSelect}
                                addAdmin={item == 'playlist' ? false : true} key={item} />
                        );
                    })
                }

                <div className="w-full shadow-md px-2 py-4 my-3 border-[1px] border-gray-200">
                    <SenseInput defaultValues={data['senses'].map((item : any)=> { return {...item, score : {min : -1, max : item.score}}})} onChange={onChangeSense} />
                    {/* <SenseInput defaultValues={data['senses'].map((item : SenseOptionsType)=> { return {...item, score : {min : item.score.min, max : item.score.max}}})} onChange={onChangeSense} /> */}
                </div>

                <AppTextArea id="description" name="description" value={data.description} onChange={onChange} options={{ label: "Description", icon: "text-recognition" }} />

                <GoalInput id="goal" name="goal" label="Goal : " size="3xl" onChange={onChange} value={data.goal} />

                <div className="w-full my-3">
                    <label className="label label-text" htmlFor="image"> Select Image/Photo </label>
                    <input type="file" className="input input-xs" id="image" name="image" onChange={onChangeFile} />
                </div>

                <AppButton text={method == Method.POST ? "Register" : "Update"} addStyles="my-2" icon="send" onClick={onSub} isLoading={isLoading} />

            </div>

        </div>
    )
}


export default SongForm


