import { useState } from "react"
import suondDefault from "../assets/soundDefault.png"
import useFetch from "../hooks/useFetch"
import { PlayerComponent } from "../components/player/PlayerComponent"
// import Yt from "../components/player/Yt"

import audioTest from "../assets/test.mp3"
import audioTest2 from "../assets/test2.mp3"

const url1 = "https://www.youtube.com/watch?v=UCskpE9KGQU"
const url2 = "https://www.youtube.com/watch?v=Ezf_DR0vqRI"
// const url2 = "https://www.youtube.com/watch?v=EfdsfdsfsaI"
const url3 = "https://www.youtube.com/watch?v=9zsfF9I8i3E&list=RD9zsfF9I8i3E&start_radio=1"

//TODO delete this file, this file isn't used
export const GetView = () => {

    const songs: string[] = [audioTest, audioTest2, url1, url2,audioTest2, url3, audioTest2];
    // const songs: string[] = [audioTest, audioTest2,];
    // const songs: string[] = [url1, url2, url3];
    // const playList = []

    const [url, setUrl] = useState<string>("http://localhost:5000/api/gender")
    // const [url, setUrl] = useState<string>("http://localhost:5000/api/language")
    // const [url, setUrl] = useState<string>("http://localhost:5000/api/playlist")
    // const [url, setUrl] = useState<string>("http://localhost:5000/api/sense")
    // const [url, setUrl] = useState<string>("http://localhost:5000/api/singer")
    const { data, isLoading, error } = useFetch(url);
    
    return (
        <>
            <div className="shadow-md  w-full m-auto border-t-[1px] border-gray-100 border-solid">
                <div className="w-full px-4 py-2">

                    <h1 className="text-center text-2xl font-bold">View Entity</h1>

                    {
                        isLoading ? <p>Loading...</p>
                            : error ? <p>went bad</p> :
                                <>
                                    {
                                        data.map((item: any) => {
                                            return (
                                                <ItemEntity
                                                    id={item.id}
                                                    name={item.name}
                                                    description={item.description}
                                                    imgUrl="https://cdn.flyonui.com/fy-assets/avatar/avatar-1.png"
                                                />
                                            )
                                        })
                                    }
                                </>
                    }

                </div>
            </div>

            <div className="bg-black w-1/4 m-auto">
                {/* <PlayerComponent songs={songs}/> */}
                {/* <Yt></Yt> */}
            </div>

        </>
    )
}

const ItemEntity = ({ id, name, description, imgUrl }: { id: string, name: string, description: string, imgUrl: string }) => {

    return (
        <div className="shadow-md  w-1/3 m-auto border-t-[1px] border-gray-100 border-solid">
            <div className="w-full px-4 py-2 flex">

                <div className="h-full flex flex-col items-center justify-center justify-items-center content-center">
                    {/* <div className="h-full"> */}
                    {/* <div className="avatar placeholder">
                        <div className="bg-neutral text-neutral-content w-14 rounded-full mask mask-decagon">
                            <span className="text-xl uppercase">cl</span>
                        </div>
                    </div> */}
                    <div className="avatar m-auto">
                        <div className="size-16 rounded-full mask mask-decagon">
                            {/* <img src={imgUrl} alt="avatar" /> */}
                            <img src={suondDefault} alt="Mu" />
                        </div>
                    </div>
                </div>

                <div className="w-full flex flex-col py-1 pl-2">
                    <h1 className="text-xl font-bold">{name}</h1>
                    <p className="text-[8px] link link-animated w-fit">{id}</p>
                    <p className="text-sm">{description}</p>
                </div>

                <div className="flex">

                    <span className="badge badge-neutral size-6 rounded-full p-0 mr-1">
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

export default GetView
