import { useState, useEffect, useContext } from "react";
import { PlayListContext, type PlayListContextType, type BaseOptional } from "./PlayListContext";
import { AuthContext } from "./AuthContext";
import { useLocalData } from "../hooks/useLocalData";

const options = {  execInitAction: 'GET' as const };

const PlayListProvider = ({ children }: { children: any }) => {
    const {user} = useContext(AuthContext)

    const saveDataInInLocal = (newData: BaseOptional) => {
        const newValues = { ...playList,...newData };
        if(newValues.isLoading || newValues.error || !newValues.playList || newValues.playList.length === 0) return;
        setData({ newValue: { playList: newValues.playList, isLoading: newValues.isLoading, error: newValues.error, currentIndex: newValues.currentIndex, generatedBy: newValues.generatedBy, orderBy: newValues.orderBy } }); // setData({ newValue: newValalues });
    }
    function setPlayList(newData: BaseOptional) {
        const newValues = { ...playList,...newData };
        setPlayListState(newValues); // setPlayListState(beforeData => { return { ...beforeData, ...newData } });
        saveDataInInLocal(newValues);
    }

    const setCurrentIndex = (newIndex: number) => {
        let newValues : PlayListContextType | null = null; // const newValues = { ...playList, currentIndex: newIndex };
        setPlayListState(beforeData => { return newValues = { ...beforeData, currentIndex: newIndex }; }); // setPlayListState(newValues); // setPlayListState({ ...playList, currentIndex: newIndex });
        saveDataInInLocal(newValues!);
    }
    

    const initState : PlayListContextType = {
        playList: [],
        generatedBy : [],
        orderBy : null,
        isLoading: true, // isLoading: false,
        error: null,
        currentIndex: 0,
        setPlayList,
        setCurrentIndex
    }

    const [playList, setPlayListState] = useState<PlayListContextType>({ ...initState }); // const [playList, setPlayListState] = useState<PlayListContextType>({ ...initState, isLoading : isLoading, error: error });
    const {setData, data, isLoading, error} = useLocalData({key : user ? user.id : 'guest', options});
    
    useEffect(() => {
        if(!isLoading) setPlayListState(beforeData => { return data? { ...beforeData, ...data, isLoading, error } : { ...beforeData, isLoading, error } }); // if(data && !isLoading && !error) setPlayListState(beforeData => { return { ...beforeData, isLoading, error, ...data } });
        
        //TODO destructure only data needed for playlist context. validate playlist json has correct format
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
    }, [data, isLoading, error]);

    return (
        <PlayListContext.Provider value={{ ...playList }}>
            {children}
        </PlayListContext.Provider>
    );
}

export default PlayListProvider
