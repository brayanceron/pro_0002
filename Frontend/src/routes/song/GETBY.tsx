import { useNavigate, useParams } from "react-router"
import useFetch from "../../hooks/useFetch";
import SongList from "../../components/player/SongList";
import imagePl from "../../assets/default/playlist.png"
import { useContext } from "react";
import { PlayListContext } from "../../context/PlayListContext";

type Criterion = 'gender' | 'playlist' | 'singer' | 'language' | 'sense';

const GETBY = () => {
    const navigate = useNavigate()
    const {setPlayList} = useContext(PlayListContext)
    const params = useParams();
    const criterion: Criterion = params.criterion as Criterion; //  const criterion = params.criterion;
    const value = params.value;


    const { data: songs, isLoading, error } = useFetch(`http://localhost:5000/api/song/by/${criterion}/${value}`);
    const {data : criterionData, isLoading:criterionIsLoading, error:criterionError} = useFetch(`http://localhost:5000/api/${criterion}/${value}`)
    const playPlayList = () =>{
        setPlayList({playList : songs, isLoading, error, currentIndex : 0});
        navigate("/playing");
    }
    return (
        <div className="w-full flex">

            <div className="w-fit px-4 mx-4 items-center">
                <img src={imagePl} alt="" className="w-[400px]" />

                <h1 className="text-3xl">{criterionIsLoading ? "Loading" : criterionError ? "Error" : criterionData.name} </h1>
                <span className="text-xs text-gray-400">({criterion})</span>
                <p>{ songs instanceof Array ? songs.length : '0' } Songs</p>

                <div className="w-full flex justify-center">
                    <button onClick={playPlayList} className="btn btn-secondary mask mask-circle size-20">
                        <span className="icon-[tabler--play] size-10"></span>
                    </button>
                </div>
            </div>

            <div className="w-full">
                <SongList playList={songs} isLoading={isLoading} error={error} currentIndex={0} />
            </div>

        </div>
    )
}

export default GETBY
