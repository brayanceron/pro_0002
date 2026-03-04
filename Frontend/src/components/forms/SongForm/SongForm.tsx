import { useContext, useEffect, useState, type BaseSyntheticEvent } from "react"

import AppButton from "../../buttons/AppButton"
import AppInput from "../../inputs/AppInput"
import AppTextArea from "../../inputs/AppTextArea"
import { AppRangeInput } from "../../inputs/AppRangeInput/AppRangeInput" // import { GoalInput } from "../../inputs/GoalInput"
import { useFormData } from "../../../hooks/useFormData"
import { usePost, type reqProps } from "../../../hooks/usePost"
import { Method } from "../../../utils/Methods"
import { AuthContext } from "../../../context/AuthContext"
import { WrapMultipleSelect } from "./WrapMultipleSelect"
import { PlayerComponent, type states } from "../../player/PlayerComponent"
import { SenseInput, type SenseOptionsType} from "../../inputs/SenseInput/SenseInput"
import { PipsMode } from "nouislider"
import { type SongModelExtended } from "../../../models/SongModel"
import { isYouTubeUrl, isValidYouTubeUrl, isAllowedYouTubeUrl } from "../../../utils/urls"

// TODO - create type for this component

const emptyFields = { url: '', image: '', name: '', duration: '', genders: [], senses: [], singers: [], languages: [], playlists: [], description: '', goal: 0 }

const SongForm = ({ values = emptyFields, url, method = Method.POST, callback }: { values?: any, url: string, method?: Method, callback: (params: reqProps) => void }) => {
    const { user: userAuth } = useContext(AuthContext); // const userAuth = useContext(AuthContext!);
    const [videoUrl, setVideoUrl] = useState<string | null>(values.url || null); // const [videoUrl, setVideoUrl] = useState<string | null>(null);
    values.url = method === Method.PUT?  (isValidYouTubeUrl(values.url) ? values.url : null) : values.url; //values.url = isValidYouTubeUrl(values.url) ? values.url : '';
    const [validateYTUrl, setValidateYTUrl] = useState<boolean>(false);
    values.user_id = userAuth?.id;
    const [tempPlayList, setTempPlayList] = useState<SongModelExtended[]>([{...temporalPlayList[0], url: videoUrl || ''}]);
    const [uploadUrl, setUploadUrl] = useState(url);

    useEffect(() => {
        const loadFlyonui = async () => {
            await import('flyonui/flyonui');
            window.HSStaticMethods.autoInit();
        };
        loadFlyonui();
    }, [location.pathname]);

    const { data, formData, onChange, onChangeFile, onChangeMultipleSelect } = useFormData(values, ['genders', 'senses', 'singers', 'languages', 'playlists']);
    const { sendReq, isLoading } = usePost(formData, uploadUrl, callback, method) // const { sendReq } = usePost(formData, "http://localhost:5000/api/song", callback, method )
    
    function onSub() { 
        if(isYouTubeUrl(videoUrl || '') && validateYTUrl) return alert("The YouTube video is not compatible, please change the URL or upload a file.");
        sendReq(); 
    }
    const onChangeSelectedFile = (event: BaseSyntheticEvent) => {
        const file = event.target.files[0];
        if (!file) return; //TODO - add error message
        let tempUrl = URL.createObjectURL(file);

        setTempPlayList([{...tempPlayList[0], url: tempUrl}]);
        setVideoUrl(tempUrl);
        onChangeFile(event);
    }
    const onChangeUrlInput = (event: BaseSyntheticEvent) => {
        const url = event.target.value;
        setTempPlayList([{...tempPlayList[0], url : url}]);
        setVideoUrl(url);
        onChange(event);
    }
    // useEffect(()=>{setTempPlayList([{...tempPlayList[0], url: videoUrl || ''}])}, [videoUrl])
    const onChangePlayerState = (state: states) => { setValidateYTUrl(state.error != null ? state.error : false); }
    const onChangeSense = (snsData: SenseOptionsType[]) => { onChange({ target: { name: 'senses', value: JSON.stringify(snsData) } }); }
    const onChangeGoalRange = (valuess : SenseOptionsType) => { onChange({target : {name : valuess.id/* 'goal' */, value : valuess.score.max}}) }

    return (
        <div className="shadow-md  w-full m-auto border-t-[1px] border-gray-100 border-solid">
            <div className="w-full px-4 py-2">

                <h1 className="text-center text-2xl font-bold mt-6 mb-4">{`${method == Method.POST ? 'Register' : 'Update'} Song`}</h1>

                <div className="border-[1px] border-gray-200  px-2 pb-2 shadow-md">
                    <nav className="tabs tabs-bordered" aria-label="Tabs" role="tablist" aria-orientation="horizontal">
                        <button type="button" onClick={ _ => setUploadUrl(url) } className={`tab active-tab:tab-active w-full active`} id="tabs-basic-filled-item-1" data-tab="#tabs-basic-filled-1" aria-controls="tabs-basic-filled-1" role="tab" aria-selected="true">
                            Link
                        </button>
                        <button type="button" onClick={ _ => setUploadUrl(`${url}?byfile=1`) } className={`tab active-tab:tab-active w-full`} id="tabs-basic-filled-item-2" data-tab="#tabs-basic-filled-2" aria-controls="tabs-basic-filled-2" role="tab" aria-selected="false">
                            File
                        </button>
                    </nav>

                    <div className="mt-3 ">

                        <div id="tabs-basic-filled-1" role="tabpanel" aria-labelledby="tabs-basic-filled-item-1">
                            <AppInput id="url" name="url" value={data.url || ''} options={{ label: "By Link", icon: "link" }}
                                onChange={onChangeUrlInput}
                            />
                            {/* <AppButton text="Extract info" addStyles="btn-xs w-[130px] my-1" icon="stack-push" /> */}
                            {
                                videoUrl === null ? <p className="text-sm text-gray-300">...</p> :
                                    !isYouTubeUrl(videoUrl) ?<p className="text-sm text-red-500 ">This link is not a YouTube video!</p>
                                    :!isAllowedYouTubeUrl(videoUrl) ?<p className="text-sm text-red-500 ">This YouTube link is not allowed!</p>
                                        : validateYTUrl ? <p className="text-sm text-red-500 ">Video not supported!</p>
                                            : <p className="text-sm text-green-500 ">Video compatible!</p>
                            }
                        </div>

                        <div id="tabs-basic-filled-2" className="hidden" role="tabpanel" aria-labelledby="tabs-basic-filled-item-2">
                            <AppInput id="file" name="file" value="" type='file' options={{ label: "By File" }} onChange={onChangeSelectedFile} accept="audio/*" />
                            <p className="text-xs text-gray-400">File : {data.file?.name || 'No file selected'}</p>
                        </div>
                        <QuickPlaying url={videoUrl} tempPlayList={tempPlayList} onChangePlayerState={onChangePlayerState} />

                    </div>
                </div>
                <p className="text-xs text-center text-gray-300 mt-2">Upload : {uploadUrl.includes('byfile=1') ? 'File' : 'Link'}</p>

                <AppInput id="name" name="name" value={data.name} onChange={onChange} options={{ label: "Name", icon: "text-recognition" }} />
                <AppInput id="duration" name="duration" value={data.duration} onChange={onChange} options={{ label: "duration", icon: "clock" }} />
                
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

                {/* <GoalInput id="goal" name="goal" label="Goal : " size="3xl" onChange={onChange} value={data.goal} /> */}
                <div className='w-full h-[100px] pr-2 mt-5'>
                    <p className='mb-[10px]'>General Score:</p>
                    <AppRangeInput defaultValue={{min : 0, max : data.goal}} onChangeRange={onChangeGoalRange} id='goal' isMultiple = {false} addStyles={rangeStyles} /> 
                </div>

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

const QuickPlaying = ({url, tempPlayList, onChangePlayerState} : {url : string | null, tempPlayList : SongModelExtended[], onChangePlayerState: (state: any) => void }) => {
    const idCollapse = "basic-collapse-heading";

    return (
        <>
            {/* 
            <div className="divider">
                <span className="flex items-center justify-center">
                    <span className="icon-[tabler--music-check] size-5"></span>
                </span>
            </div>
            */}

            <div className="mt-1">
                <button  type="button" className="collapse-toggle btn btn-secondary btn-xs text-xs" id="basic-collapse" aria-expanded={false} aria-controls={idCollapse} data-collapse={`#${idCollapse}`}>
                    Try Play
                    <span className="icon-[tabler--chevron-down] collapse-open:rotate-180 size-4"></span>
                </button>
                <div id={idCollapse} className={`collapse w-full overflow-hidden transition-[height] duration-300`} aria-labelledby="basic-collapse">
                    <div className="border-base-content/25 mt-3 rounded-md border p-3">
                            
                        <div className="mt-2 rounded-lg bg-gradient-to-r from-pink-700 to-red-800">
                            <PlayerComponent
                                showPlayer={false}
                                key={`plSongform_${url}`} //INFO - this is a trick to force re-mount the component when url changes, because PlayerComponent has some internal state that needs to be reset when url changes
                                currentIndex={0}
                                setCurrentIndex={() => {}}
                                onChangeState={onChangePlayerState}
                                playList={ url ? tempPlayList : [] }
                            />
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}
const temporalPlayList: SongModelExtended[] = [{
    id: 'temp_id',
    name: 'temp_name',
    description: '',
    url : '',
    image: '',
    gender_id: '',
    goal: '0',
    user_id: 'admin',

    genders: [],
    senses: [],
    singers: [],
    languages: [],
}]

const rangeStyles: any = {
    range: {
        'min': 0,
        'max': 5, // 'max': 100 //TODO - max and min should be props
    },
    pips : {
        mode: PipsMode.Values,
        values: [0,1,2,3,4,5],
        density: 4
    },
    tooltips : [ true ],
}