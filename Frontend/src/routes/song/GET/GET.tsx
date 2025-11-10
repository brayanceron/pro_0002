import { useContext, useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import { NavLink } from "react-router";
import { AuthContext } from "../../../context/AuthContext";
import { AppAlert } from "../../../components/informational/AppAlert";
import { PaginationComponent } from "../../../components/navigation/PaginationComponent";
import { UpdateSongModal } from "./UpdateSongModal";
import { SongItem } from "./SongItem";
import { DeleteSongModal } from "./DeleteSongModal";
import type { GenerationFormsFields } from "../../../components/forms/GenerationForm";
import { useSearchParams } from "react-router";
import { SearchSong } from "./SearchSong";

const emptyFields: GenerationFormsFields = { genders: [], senses: [], singers: [], languages: [], goal: 0, user_id: '' };
const baseRoute = "http://localhost:5000/api/song";
const editModalId = "editModal";
const deleteModalId = "deleteModal";

const GET = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { user } = useContext(AuthContext)
    
    const limit = 20;
    const extended = 1;
    const [currentPage, setCurrentPage_] = useState(parseInt(searchParams.get('page') || '1')); //  TODO validate page arg are a number const [currentPage, setCurrentPage_] = useState(1);
    const [pattern, setPattern] = useState(searchParams.get('pattern') || '');
    const setCurrentPage = (newValue: number) => {
        if (newValue < 1) return;
        if (newValue > data.count) return; // BUG: it's wrong
        setCurrentPage_(newValue)
    }

    const buildParams = () => {
        const x = extended == 1 ? `extended=${extended}` : null;
        const p = currentPage ? `page=${currentPage}` : null;
        const li = limit ? `limit=${limit}` : null;
        return '?' + [x, p, li].filter( p => p != null).join('&');
    }
    
    const [baseUrl, setBaseUrl] = useState<string>(`${baseRoute}${pattern ? `/search/${pattern}` : `/by/user/${user!.id}`}`);
    const [url, setUrl] = useState(baseUrl + buildParams());
    const { data, isLoading, error } = useFetch(url);

    const [currentSong, setCurrentSong] = useState<any>(emptyFields);
    const [isChanging, setIsChanging] = useState(false);
    
    const setNewCurrentSongIndex = (newIndex: number) => {
        setIsChanging(true);

        //TODO verify data.data & isLoading & error
        //TODO verify if newIndex is >0 and < data.data.lenght 
        let newSong = data.data[newIndex];
        newSong = { 
            ...newSong,  
            genders:  newSong.genders.map((g : any) => g.id),
            senses:  newSong.senses.map((s : any) => s.id),
            singers:  newSong.singers.map((s : any) => s.id),
            languages:  newSong.languages.map((l : any) => l.id),
            playlists:  newSong.playlists.map((p : any) => p.id),
        };
        setCurrentSong(newSong);
        
    }
    useEffect(() => { if (!currentSong) return; setIsChanging(false); },[currentSong]);
    useEffect(() => { setUrl(baseUrl + buildParams()); },[baseUrl]);

    useEffect( () => {
        setUrl(baseUrl + buildParams()) 
        setSearchParams({...(currentPage && {page : currentPage.toString()}), ...(pattern && {'pattern' : pattern})});
    },[currentPage, pattern]);
    
    const reloadPage = () => { setUrl(befUrl => befUrl + ' '); }
    const searchCb = (newPattern : string) => { 
        setBaseUrl(`${baseRoute}/search/${newPattern}`); 
        setCurrentPage_(1);
        setPattern(newPattern);
    }
    const onClearSearch = () => {
        setCurrentPage_(1);
        setPattern('');
        setBaseUrl(`${baseRoute}/by/user/${user!.id}`);
    }

    return (
        <>
            {/* <div className="w-2/3 mx-auto h-full"> */}
            <div className="w-auto h-full">
                <h1 className="text-center text-2xl font-bold mt-8 mb-3">List of Songs</h1>
                <div className="w-full flex justify-center my-2">
                    <SearchSong defaultValue={pattern} callback={searchCb} onClear={onClearSearch} />
                </div>
                {
                    isLoading ? <p>cargando...</p> :
                        error ? <div className="w-1/3 m-auto mt-15"> <AppAlert message={error.message} color="error" icon="x" soft /> </div> :
                            data ?
                                <>
                                    <UpdateSongModal modalId={editModalId} defaultValues={currentSong} isChanging={isChanging} reload={reloadPage}/>
                                    <DeleteSongModal modalId={deleteModalId} songId={currentSong.id} songName={currentSong.name} callback={reloadPage}/>

                                    <Options />
                                    <div className="flex flex-wrap gap-0 w-full justify-center mt-3 mb-3">
                                    {
                                        data.data.map((item: any, index: number) => {
                                            return <SongItem
                                                id={item.id}
                                                name={item.name}
                                                image={item.image}
                                                url={item.url}
                                                genders={item.genders}
                                                // senses={item.senses}
                                                singers={item.singers}
                                                languages={item.languages}
                                                goal={item.goal}
                                                key={index} // key={item.id}
                                                index={index}
                                                setNewCurrentSongIndex={setNewCurrentSongIndex}
                                                editModalId={editModalId}
                                                deleteModalId={deleteModalId}
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
                        <PaginationComponent limit={limit} page={currentPage}
                            totalResults={data.count} setPage={setCurrentPage} numbersOfOptions={5} />
                    </div>
                </div>
            }
        </>
    )
}

const Options = () => {
    return (
        <div className="m-auto mt-6 flex gap-1 justify-center items-end content-end">
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
