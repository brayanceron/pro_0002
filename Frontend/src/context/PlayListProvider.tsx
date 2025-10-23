import { useState, useEffect, useContext } from "react";
import { PlayListContext, type PlayListContextType, type BaseOptional } from "./PlayListContext";
import useFetch from "../hooks/useFetch";
import { AuthContext } from "./AuthContext";
// import type { SongModel } from "../models/SongModel";

const PlayListProvider = ({ children }: { children: any }) => {
    const {user} = useContext(AuthContext)

    function setPlayList(newData: BaseOptional) {
        setPlayListState(beforeData => { return { ...beforeData, ...newData } });
    }

    const setCurrentIndex = (newIndex: number) => {
        setPlayListState(beforeData => { return { ...beforeData, currentIndex: newIndex } });  // setPlayListState({ ...playList, currentIndex: newIndex });
    }

    const [playList, setPlayListState] = useState<PlayListContextType>({ playList: [], isLoading: false, error: null, setPlayList, currentIndex: 0, setCurrentIndex });
    const {data, isLoading, error, res} = useFetch(`http://localhost:5000/api/song/get_generated_playlists/${user?.id}`)

    useEffect(()=>{
        // INFO isLoading should start in True
        // TODO validate playlist json has correct format
        if(isLoading || error || !res || !res.ok) return;
        if(data && data['playlist']) setPlayListState(beforeData => { return { ...beforeData, playList: data['playlist'] } });
    }, [data]);

    return (
        <PlayListContext.Provider value={{ ...playList }}>
            {children}
        </PlayListContext.Provider>
    );
}

export default PlayListProvider
