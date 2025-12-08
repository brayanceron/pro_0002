import { useNavigate } from "react-router";
import { getImageUrl } from "../../utils/urls";
import { useContext } from "react";
import { PlayListContext } from "../../context/PlayListContext";
import gifPlaying from '../../assets/playing.gif';

const SongList = ({ playList, isLoading, error, currentIndex }: { playList: any, isLoading: boolean, error: Error | null, currentIndex: number }) => { // const SongList = ({ urlGet }: { urlGet?: string }) => {
    return (
        <div className="bg-white">
            {
                isLoading ? <p>Loading...</p> :
                    error ? <p>Error : {error.message}</p> :
                        <div>
                            <p className="text-[10px] text-gray-400">Total songs: {playList.length}</p>
                            {
                                playList.map((item: any, index: number) => {
                                    return <SongItem id={item.id} name={item.name} url={item.image || item.url} singer={"Test Singer"} index={index} currentIndex={currentIndex} />
                                })
                            }
                        </div>
            }

        </div>
    );
}

const SongItem = ({ id, name, singer, url, index, /* currentIndex */ }: { id: string, name: string, singer: string, url: string, index: number, currentIndex: number }) => {
    const navigate = useNavigate();
    const onClickGetEntity = () => { navigate(`/song/get/${id}`); }
    const { /* playList, isLoading, error, */ currentIndex, setCurrentIndex } = useContext(PlayListContext);


    const bg = index === currentIndex ? "bg-purple-200" : "bg-gray-100";
    const onClick = () => { if (index == currentIndex) return; setCurrentIndex(index); }
    return (
        <div className={`w-[99%] shadow-md ${bg} py-2 px-1 m-1 flex hover:bg-gray-200`}>
            <div className="mx-2">
                <div className="avatar">
                    <div className="size-14 rounded-md hover:cursor-pointer" onClick={_ => onClick()}>
                        <img src={getImageUrl(url)} alt="avatar" /> {/* <img src={getUrl(url)} alt="photo" /> */}
                    </div>
                </div>
            </div>

            <div className="w-full">
                <h1 className="w-fit text-xl hover:cursor-pointer" onClick={_ => onClick()}>{name}</h1>
                <p className="text-sm">{singer}</p>
            </div>

            <div className="flex w-auto justify-end">
                {
                    index === currentIndex &&
                        <div className="w-[25px]">
                            <img src={gifPlaying} alt="" />
                        </div>
                }
                <span onClick={onClickGetEntity} className="badge badge-neutral size-6 rounded-full p-0 mr-1">
                    <span className="icon-[tabler--external-link]"></span>
                </span>
            </div>
        </div>
    );
}

export default SongList
