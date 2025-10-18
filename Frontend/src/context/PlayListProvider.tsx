import { useState } from "react";
import { PlayListContext, type PlayListContextType, type BaseOptional } from "./PlayListContext";
import type { SongModel } from "../models/SongModel";


const defaultPlayList: SongModel[] = [
    {
        "description": "",
        "gender_id": "33028177a27d4df9bec25aaa2ca65f27",
        "goal": "5.00",
        "id": "a478e2873741474d94bb6edb7fe4dfea",
        "image": "",
        "name": "Por mil noches - Airbag",
        "url": "https://www.youtube.com/watch?v=ANs8-1iYkww",
        "user_id": "8622e06b-65dd-11f0-94d0-089798b6be9f"
    },
    {
        "description": "",
        "gender_id": "33028177a27d4df9bec25aaa2ca65f27",
        "goal": "5.00",
        "id": "4c716558c52547ad81cc2a2f643c8d9b",
        "image": "",
        "name": "Jósean Log - Beso",
        "url": "https://www.youtube.com/watch?v=ntdwWKaGaPQ",
        "user_id": "8622e06b-65dd-11f0-94d0-089798b6be9f"
    },
    {
        "description": "",
        "gender_id": "33028177a27d4df9bec25aaa2ca65f27",
        "goal": "5.00",
        "id": "803888625bb0478f8f72efaca4e5be5e",
        "image": "",
        "name": "Diamante Electrico - Casino",
        "url": "https://www.youtube.com/watch?v=HZb85wigeQc",
        "user_id": "8622e06b-65dd-11f0-94d0-089798b6be9f"
    },
]

const PlayListProvider = ({ children }: { children: any }) => {

    function setPlayList(newData: BaseOptional) {
        setPlayListState(beforeData => { return { ...beforeData, ...newData } });
    }

    const setCurrentIndex = (newIndex: number) => {
        setPlayListState(beforeData => { return { ...beforeData, currentIndex: newIndex } });  // setPlayListState({ ...playList, currentIndex: newIndex });
    }

    // const [playList, setPlayListState] = useState<PlayListContextType>({ playList: [], isLoading: false, error: null, setPlayList, currentIndex: 0, setCurrentIndex });
    const [playList, setPlayListState] = useState<PlayListContextType>({ playList: defaultPlayList, isLoading: false, error: null, setPlayList, currentIndex: 0, setCurrentIndex });

    return (
        <PlayListContext.Provider value={{ ...playList }}>
            {children}
        </PlayListContext.Provider>
    );
}

export default PlayListProvider
