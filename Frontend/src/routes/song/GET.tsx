// import songDefault from "../../assets/songDefault.jpeg"
import { useContext, useEffect, useRef, useState } from "react";

// import { GoalInput } from "../../components/inputs/GoalInput";
// import { PlayerComponent } from "../../components/player/PlayerComponent";
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
    const { data, isLoading, error } = useFetch(`http://localhost:5000/api/song/by/user/${user!.id}?extended=1&page=${currentPage}`);

    return (
        <>
            <div className="w-1/3 h-full m-auto mt-15">
                {/* <div className=" h-full m-auto mt-15"> */}
                {
                    isLoading ? <p>cargando...</p> :
                        error ? <AppAlert message={error.message} color="error" icon="x" soft /> :
                            data ?
                                <>
                                    <h1 className="text-center text-2xl font-bold mb-3">List of Songs</h1>

                                    <Options />

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
                                                languages={[]}
                                                goal={item.goal}
                                            />
                                        })
                                    }

                                    {/* <div className="w-1/3 m-auto bg-black my-4"> */}
                                    {/* <PlayerComponent songs={data.map((item: any) => item.url)} /> */}
                                    {/* <PlayerComponent songs={data.map((item: any) => { return isValidYouTubeUrl(item.url) ? item.url : getUrlBySrc(item.url) })} /> */}
                                    {/* <PlayerComponent /> */}
                                    {/* </div> */}
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

const MusicItem = ({ id, name, genders, singers, goal, image, url }: { id: string, name: string, description: string, image: string, url: string, goal: number, genders: [], singers: [], languages: [] }) => {
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
        // <div className="shadow-md w-1/3 m-auto border-t-[1px] border-gray-100 border-solid">
        <div className="shadow-md m-auto border-t-[1px] border-gray-100 border-solid">
            <div className="w-full px-4 py-2 flex">

                <div className="h-full flex flex-col items-center justify-center justify-items-center content-center">
                    <div className="avatar m-auto">
                        <div className="size-25 rounded-full mask mask-decagon">
                            <img ref={songImg} alt="Music Icon" /> {/* <img ref={songImg} src={imgUrl || songDefault} alt="Music Icon" /> */}
                        </div>
                    </div>
                </div>

                <div className="w-full flex flex-col py-1 pl-2">

                    <h1 className="text-xl font-bold">{name}</h1>

                    {/* <GoalInput id="" name="" defaultGoal={goal} label={`(${goal})`} size="xl" /> */}
                    <p className="text-xs">Goal : <span className="text-lg">★★★★★</span>  <span className="text-sm">{goal}</span></p>

                    {/* SINGERS SECTION */}
                    <p className="text-xs link link-animated w-fit">Author Singers/Band : </p>
                    <div className="w-full flex gap-1">
                        {
                            singers.map(({ name, image }: any) => <BadgeInfo image={image} text={name} defaultImg={singerDefault} />)
                        }
                    </div>

                    {/* GENDERS SECTION */}
                    <div className="w-full flex gap-1 mt-1">
                        <p className="text-xs link link-animated w-fit">Gender(s) : </p>
                        {
                            genders.map(({ name, image }: any) => <BadgeInfo image={image} text={name} defaultImg={genderDefault} />)
                        }
                    </div>

                    {/* LANGUAGE SECTION */}
                    <div className="w-full flex gap-1 mt-1">
                        <p className="text-xs link link-animated w-fit">Language(s) : </p>

                        <div className="avatar">
                            <div className="size-4  mask mask-hexagon">
                                <img src="https://cdn-icons-png.flaticon.com/256/6070/6070316.png" alt="avatar" />
                            </div>
                        </div>

                    </div>


                    {/* <p className="text-[8px] link link-animated w-fit">{id}</p> */}
                    {/* <p className="text-sm">{description}</p> */}


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

function BadgeInfo({ text, image, defaultImg }: { text: string, image: string, defaultImg: string }) {
    const imgBadfe = useRef<HTMLImageElement>(null)
    useEffect(() => {
        if (image) { imgBadfe.current!.src = getUrlBySrc(image); }
        else if (isValidYouTubeUrl(image)) { imgBadfe.current!.src = getImageUrlByYTVideo(image); }
        else { imgBadfe.current!.src = defaultImg; }
    })

    return (
        <span className="badge badge-neutral badge-sm removing:translate-x-5 removing:opacity-0 transition duration-300 ease-in-out" id="badge-4" >
            <img ref={imgBadfe} alt="John" className="size-4.5 rounded-full" />
            {text}
            {/* <button className="icon-[tabler--circle-check] size-5 min-h-0 px-0" data-remove-element="#badge-4" aria-label="Dismiss Button" ></button> */}
        </span>
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
