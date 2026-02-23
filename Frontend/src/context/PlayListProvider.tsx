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

    const initState : PlayListContextType = {
        playList: [],
        generatedBy : [],
        orderBy : null,
        isLoading: false,
        // isLoading: true,
        error: null,
        currentIndex: 0,
        setPlayList,
        setCurrentIndex
    }

    const [playList, setPlayListState] = useState<PlayListContextType>({ ...initState });

    // INFO isLoading should start in True
    // TODO validate playlist json has correct format
    const {setData, data, isLoading, error} = useLocalData({key : user ? user.id : 'guest', options});
    // const [playList, setPlayListState] = useState<PlayListContextType>({ ...initState, isLoading : isLoading, error: error });
    useEffect(() => {
        if(data && !isLoading && !error) setPlayListState(beforeData => { return { ...beforeData, isLoading, error, ...data } });
        /* 
        if(!isLoading) {
            setPlayListState(beforeData => { return data? { ...data, isLoading, error } : { ...beforeData, isLoading, error } });
            if (firtsTime) setFirstTime(false);
        }
        */
        //TODO destructure only data needed for playlist context
        /* const { 
            playList : playListData = [],
            currentIndex : currentIndexData = 0,
            generatedBy : generatedByData = [],
            orderBy : orderByData = {},
            // isLoading : isLoadingData = false,
            // error : errorData = null,
        } = data || {};

        setPlayListState(beforeData => { 
            return { 
                ...beforeData,
                playList: playListData,
                currentIndex: currentIndexData,
                generatedBy: generatedByData,
                orderBy: orderByData,

                // isLoading: isLoadingData || false,
                // error: errorData || null,
                isLoading: isLoading,
                error: error,
            } 
        }); */
    // }, [data]);
    }, [data, isLoading, error]); // }, [data, isLoading, error]);

    
    /* const {setData, getData } = useLocalData({key : user ? user.id : 'guest'});
    useEffect(()=>{ getLocalData() },[]);
    const getLocalData = async () => {
        const gottenData = await getData(user ? user.id : 'guest');
        const { data : pl ,isLoading, error } = gottenData; // data/pl is a object : {playlist, isLoading, error, currentIndex}
        setPlayListState(beforeData => { return { ...beforeData,  ...pl, isLoading, error } });
    }  */

    useEffect(()=>{ 
        const { isLoading : isL, error : err, playList : pl, currentIndex, generatedBy, orderBy } = playList; // const {setPlayList, setCurrentIndex, ...newValalues} = playList;
        if(isL || err || !pl || pl.length === 0) return; // avoid saving empty playlists
        setData({newValue: { playList: pl, isLoading: isL, error: err, currentIndex, generatedBy, orderBy}}); // setData({ newValue: newValalues });

    },[playList]);

    return (
        <PlayListContext.Provider value={{ ...playList }}>
            {children}
        </PlayListContext.Provider>
    );
}

export default PlayListProvider
