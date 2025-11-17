import { useContext } from "react";
import { PlayerComponent } from "../components/player/PlayerComponent";
import { PlayListContext } from "../context/PlayListContext";
import SongList from "../components/player/SongList";

const Playing = () => {
    // const { playList, isLoading, error } = useContext(PlayListContext);
    const { playList, isLoading, error, currentIndex } = useContext(PlayListContext);
    console.log("reendering all, route")

    return (
        // <div className="w-full m-auto bg-black">
            <div className="w-2/3 m-auto bg-black">
            {
                isLoading ? <p>Loading...</p> :
                    error ? <p>Error : {error.message}</p> :
                        <>

                            {/* <div className="w-2/3 bg-black"> */}
                                <PlayerComponent /> {/* <PlayerComponent songs={["https://music.youtube.com/watch?v=w9jrC_oJQNM"]} /> */}
                            {/* </div> */}
                            
                            <div className="h-[350px] overflow-y-scroll">
                                <SongList playList={playList} isLoading={isLoading} error={error} currentIndex={currentIndex} />
                            </div>
                            
                        </>
            }
        </div>
    );
}



export default Playing
