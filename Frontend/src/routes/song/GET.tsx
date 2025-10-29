// import songDefault from "../../assets/songDefault.jpeg"
import { useContext, useEffect, useRef, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { getImageUrlByYTVideo, getUrlBySrc, isValidYouTubeUrl } from "../../utils/urls";

import songDefault from "../../assets/default/song.png";
import singerDefault from "../../assets/default/singer.jpg";
import genderDefault from "../../assets/default/gender.png";
import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { AppAlert } from "../../components/informational/AppAlert";
import { PaginationComponent } from "../../components/navigation/PaginationComponent";

const GET = () => {
    const { user } = useContext(AuthContext)
    const [currentPage, setCurrentPage_] = useState(1);
    const setCurrentPage = (newValue: number) => {
        if (newValue < 1) return;
        if (newValue > data.count) return; // BUG: it's bad
        setCurrentPage_(newValue)
    }
    const { data, isLoading, error } = useFetch(`http://localhost:5000/api/song/by/user/${user!.id}?extended=1&page=${currentPage}&limit=20`);

    return (
        <>
            {/* <div className="w-2/3 mx-auto h-full"> */}
            <div className="w-auto h-full">
                {
                    isLoading ? <p>cargando...</p> :
                        error ? <div className="w-1/3 m-auto mt-15"> <AppAlert message={error.message} color="error" icon="x" soft /> </div> :
                            data ?
                                <>
                                    <h1 className="text-center text-2xl font-bold mt-8 mb-3">List of Songs</h1>

                                    <Options />
                                    <div className="flex flex-wrap gap-0 w-full justify-center mt-5 mb-3">
                                    {
                                        data.data.map((item: any) => {
                                            return <MusicItem
                                                id={item.id}
                                                name={item.name}
                                                description={item.description}
                                                image={item.image}
                                                url={item.url}
                                                genders={item.genders}
                                                singers={item.singers}
                                                languages={item.languages}
                                                goal={item.goal}
                                            />
                                        })
                                    }
                                    </div>
                                    <p>Total results:  {data.count}</p>

                                </>
                                : <p>Here mest be data</p>
                }
            </div>

            <Options />

            {
                data && !error && !isLoading &&
                <div className="w-full my-8">
                    <div className="mx-auto w-fit">
                        <PaginationComponent limit={10} page={currentPage}
                            totalResults={data.count} setPage={setCurrentPage} numbersOfOptions={5} />
                    </div>
                </div>
            }
        </>
    )
}

const MusicItem = ({ id, name, genders, singers, languages, goal, image, url }: { id: string, name: string, description: string, image: string, url: string, goal: number, genders: [], singers: [], languages: [] }) => {
    const navigate = useNavigate()
    const songImg = useRef<HTMLImageElement>(null);

    const onClickGetId = () => { navigate(`/song/get/${id}`); }

    console.log(id, name, genders, singers, goal, image, url)
    useEffect(() => {
        console.log(id, name, genders, singers, goal, image, url)
        if (image) { songImg.current!.src = getUrlBySrc(image); }
        else if (isValidYouTubeUrl(url)) { songImg.current!.src = getImageUrlByYTVideo(url); }
        else { songImg.current!.src = songDefault; }
    });

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

                <div className="flex">

                    <span onClick={onClickGetId} className="badge badge-neutral size-6 rounded-full p-0 mr-1">
                        <span className="icon-[tabler--external-link]"></span>
                    </span>

                    <span className="badge badge-neutral size-6 rounded-full p-0">
                        <span className="icon-[tabler--trash]"></span>
                    </span>

                </div>

            </div>
        </div>
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

const Options = () => {
    return (
        <div className=" m-auto py-2 flex gap-1 justify-center items-end content-end">
            <NavLink to={`/song/get`} className="">
                <button className="btn btn-xs btn-square border-[#2b3137] bg-[#2b3137] text-white shadow-[#2b3137]/30 hover:border-[#2b3137] hover:bg-[#2b3137]/90" aria-label="Github Icon Button" >
                    <span className="icon-[tabler--reload]"></span>
                </button>
            </NavLink>

            <NavLink to={`/song/post`} className="">
                <button className="btn btn-xs btn-square border-[#2b3137] bg-[#2b3137] text-white shadow-[#2b3137]/30 hover:border-[#2b3137] hover:bg-[#2b3137]/90" aria-label="Github Icon Button" >
                    <span className="icon-[tabler--plus]"></span>
                </button>
            </NavLink>
        </div>
    );
}
export default GET
