import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { getImageUrlByYTVideo, getUrlBySrc, isValidYouTubeUrl } from "../../../utils/urls";
import songDefault from "../../../assets/default/song.png";
import singerDefault from "../../../assets/default/singer.jpg";
import genderDefault from "../../../assets/default/gender.png";

type SongItemProps = { 
    id: string, 
    name: string, 
    image: string, 
    url: string, 
    goal: number, 

    // senses: [], 
    genders: [], 
    singers: [], 
    languages: [],
    
    index: number,
    setNewCurrentSongIndex: (newIndex: number) => void,
    modalId: string,
    
};

const SongItem = ({ id, name,  genders, singers, languages, goal, image, url,  index, setNewCurrentSongIndex, modalId }: SongItemProps) => {
    const songImg = useRef<HTMLImageElement>(null);
    const navigate = useNavigate()
    const onClickGetId = () => { navigate(`/song/get/${id}`); }

    useEffect(() => {
        if (image) { songImg.current!.src = getUrlBySrc(image); }
        else if (isValidYouTubeUrl(url)) { songImg.current!.src = getImageUrlByYTVideo(url); }
        else { songImg.current!.src = songDefault; }
    });

    const onClickBtnEdit = () => { setNewCurrentSongIndex(index);};

    return (
        // <div className="shadow-md m-auto border-t-[1px] border-gray-100 border-solid w-[360px]">
        <div className="shadow-md m-auto border-t-[1px] border-gray-100 border-solid w-[420px]">
            <div className="w-full px-4 py-2 flex">

                <div className="h-full flex flex-col items-center justify-center justify-items-center content-center">
                    <div className="avatar m-auto">
                        <div className="size-25 rounded-full mask mask-decagon">
                            <img ref={songImg} alt="Music Icon" /> {/* <img ref={songImg} src={imgUrl || songDefault} alt="Music Icon" /> */}
                        </div>
                    </div>
                </div>

                <div className="w-full flex flex-col py-1 pl-2">

                    {/* TODO implement a tooltip to show full name */}
                    <h1 className="text-xl font-bold">{name.length > 40 ? `${name.slice(0, 40)}...` : name}</h1>

                    <ScoreSong goal={goal} key={id} />

                    {/* SINGERS SECTION */}
                    <p className="text-xs link link-animated w-fit">Author Singers/Band : </p>
                    <div className="w-full flex gap-1">
                        {
                            singers.map(({ name, image }: any) => <BadgeInfo image={image} text={name} defaultImg={singerDefault} /* color="badge-warning" */ />)
                        }
                    </div>

                    {/* GENDERS SECTION */}
                    <div className="w-full flex gap-1 mt-1">
                        <p className=" text-base-content text-xs font-medium link link-animated w-fit">Gender(s) : </p>
                        {
                            genders.map(({ name, image }: any) => <BadgeInfo image={image} text={name} defaultImg={genderDefault} color="badge-primary" />)
                        }
                    </div>

                    {/* LANGUAGE SECTION */}
                    <div className="w-full flex gap-1 mt-1">
                        <p className="text-base-content text-xs font-medium link link-animated w-fit">Language(s) : </p>
                        {
                            languages.map(({ name/* , image */ }: any) => <p className="text-xs">{name}</p>)
                        }
                    </div>

                </div>
                
                {/* -----------------------| OPTIONS SONG ITEM |----------------------- */}
                {/* <OptionsSongItem id={id} quickUpdate={quickUpdate} /> */}
                <div className="flex">
                    <span onClick={onClickGetId} className="badge badge-neutral size-6 rounded-full p-0 mr-1">
                        <span className="icon-[tabler--external-link]"></span>
                    </span>
        
                    <span className="badge badge-neutral size-6 rounded-full p-0 mr-1">
                        <span className="icon-[tabler--trash]"></span>
                    </span>
        
                    {/* <span onClick={onClickBtnEdit} className="badge badge-neutral size-6 rounded-full p-0" data-overlay="#basic-modal"> */}
                    <span onClick={onClickBtnEdit} className="badge badge-neutral size-6 rounded-full p-0" data-overlay={`#${modalId}`}>
                        <span className="icon-[tabler--edit]"></span>
                    </span>
                </div>

            </div>
        </div>
    )

}

const ScoreSong = ({ goal }: { goal: number,  }) => {
    const [goalPercent, _] = useState(Math.round(goal / 5 * 100));
    const progressBarRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        if (goal < 0) { return; }
        if (progressBarRef.current)  progressBarRef.current.style.width = `${goalPercent}%`;
        setColorProgressBar(getColorProgressBar());
    }, []);


    const getColorProgressBar = () => {
        if (goal >= 4.9) return `bg-green-600`;
        if (goal >= 4.85 && goal < 4.9) return `bg-green-500`;
        if (goal >= 4.8 && goal < 4.85) return `bg-green-400`;
        if (goal >= 4.7 && goal < 4.8) return `bg-lime-500`;
        if (goal >= 4.5 && goal < 4.7) return `bg-teal-500`;
        if (goal >= 4 && goal < 4.5) return `bg-cyan-500`;
        if (goal >= 3 && goal < 4) return `bg-yellow-500`;
        if (goal >= 2 && goal < 3) return `bg-orange-500`;
        if (goal >= 1 && goal < 2) return `bg-red-500-500`;
        
        return 'progress-neutral';
    }
    const [colorProgressBar, setColorProgressBar] = useState<string>('bg-neutral-500');

    return (
        <>
            {
                goal >= 0 ?
                    <div className="w-52">
                        <div className="mb-1 flex items-end justify-between">
                            <p className="text-base-content text-xs font-medium">Score 
                                <span className="text-base-content text-xs font-light"> ({goalPercent}%)</span>
                            </p>
                            <span className="text-base-content text-xs font-light">{goal}★</span>
                        </div>
                        <div className="progress" role="progressbar" aria-label={`30% Progressbar`}
                            aria-valuenow={goalPercent} aria-valuemin={0} aria-valuemax={100}>
                            <div ref={progressBarRef} className={`progress-bar ${colorProgressBar} w-[${goalPercent}%] progress-striped`}></div>
                        </div>
                    </div>
                    : <p className="text-xs font-light">No rating</p>
            }
        </>
    )
}

function BadgeInfo({ text, image, defaultImg, color = "badge-neutral" }: { text: string, image: string, defaultImg: string, color?: string }) {
    const [colorBg, _] = useState(color);
    const imgBadfe = useRef<HTMLImageElement>(null)
    useEffect(() => {
        if (image) { imgBadfe.current!.src = getUrlBySrc(image); }
        else if (isValidYouTubeUrl(image)) { imgBadfe.current!.src = getImageUrlByYTVideo(image); }
        else { imgBadfe.current!.src = defaultImg; }
    })

    return (
        // <span className="badge badge-neutral badge-sm removing:translate-x-5 removing:opacity-0 transition duration-300 ease-in-out" id="badge-4" >
        <span className={`badge ${colorBg} badge-sm removing:translate-x-5 removing:opacity-0 transition duration-300 ease-in-out`} id="badge-4" >
            <img ref={imgBadfe} alt="John" className="size-4.5 rounded-full" />
            {text}
            {/* <button className="icon-[tabler--circle-check] size-5 min-h-0 px-0" data-remove-element="#badge-4" aria-label="Dismiss Button" ></button> */}
        </span>
    )
}


export {SongItem}