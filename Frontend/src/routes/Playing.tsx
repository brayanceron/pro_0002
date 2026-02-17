import { useContext } from "react";
import { PlayerComponent } from "../components/player/PlayerComponent";
import { PlayListContext } from "../context/PlayListContext";
import SongList from "../components/player/SongList";
import { BasicOrderingForm } from "../components/forms/GenerationForm/BasicOrderingForm";

const Playing = () => {
    const { playList, isLoading, error, currentIndex } = useContext(PlayListContext);
    console.log("reendering all, route")

    return (
        <>
            {
                isLoading ? <p>Loading...</p> :
                    error ? <p>Error : {error.message}</p> :
                        <div className="w-2/3 m-auto">
                            <div className="bg-black">
                                <PlayerComponent /> {/* <PlayerComponent songs={["https://music.youtube.com/watch?v=w9jrC_oJQNM"]} /> */}
                            </div>
                            <OptionsPanel />
                            <div className="h-[350px] overflow-y-scroll">
                                <SongList playList={playList} isLoading={isLoading} error={error} currentIndex={currentIndex} />
                            </div>
                        </div>
            }
        </>
    );
}

const OptionsPanel = () => {
    const { playList, currentIndex } = useContext(PlayListContext)
    
    return (
        <div className="flex gap-1 justify-end align-middle items-center">
            <div className="mr-2 mt-1">
                <p className="text-[10px] text-gray-400 mx-2">Songs: {currentIndex}{"/"}{playList.length}</p>
            </div>
            <BasicOrderingForm />{/* <OrderingForm/> */}
        </div>
    )
}


export default Playing
