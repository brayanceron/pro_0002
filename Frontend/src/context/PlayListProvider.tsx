import { useState, useEffect, useContext } from "react";
import { PlayListContext, type PlayListContextType, type BaseOptional } from "./PlayListContext";
import { AuthContext } from "./AuthContext";
import { useLocalData } from "../hooks/useLocalData";

const options = {  execInitAction: 'GET' as const };

const PlayListProvider = ({ children }: { children: any }) => {
    const {user} = useContext(AuthContext)

    function setPlayList(newData: BaseOptional) {
        setPlayListState(beforeData => { return { ...beforeData, ...newData } });
    }

    const setCurrentIndex = (newIndex: number) => {
        setPlayListState(beforeData => { return { ...beforeData, currentIndex: newIndex } });  // setPlayListState({ ...playList, currentIndex: newIndex });
    }

    const initState = {
        playList: [],
        isLoading: false,
        error: null,
        currentIndex: 0,
        setPlayList,
        setCurrentIndex
    }

    const [playList, setPlayListState] = useState<PlayListContextType>({ ...initState });

    // INFO isLoading should start in True
    // TODO validate playlist json has correct format
    const {setData, data, isLoading, error} = useLocalData({key : user ? user.id : 'guest', options});
    useEffect(() => {
        setPlayListState(beforeData => { return { ...beforeData, isLoading, error, ...data } });
    }, [data]);

    
    /* const {setData, getData } = useLocalData({key : user ? user.id : 'guest'});
    useEffect(()=>{ getLocalData() },[]);
    const getLocalData = async () => {
        const gottenData = await getData(user ? user.id : 'guest');
        const { data : pl ,isLoading, error } = gottenData; // data/pl is a object : {playlist, isLoading, error, currentIndex}
        setPlayListState(beforeData => { return { ...beforeData,  ...pl, isLoading, error } });
    }  */

    useEffect(()=>{ 
        const { isLoading, error, playList : pl, currentIndex } = playList; // const {setPlayList, setCurrentIndex, ...newValalues} = playList;
        if(isLoading || error || !pl || pl.length === 0) return; // avoid saving empty playlists
        setData({newValue: { playList: pl, isLoading, error, currentIndex}}); // setData({ newValue: newValalues });
    },[playList]);

    return (
        <PlayListContext.Provider value={{ ...playList }}>
            {children}
        </PlayListContext.Provider>
    );
}

export default PlayListProvider
