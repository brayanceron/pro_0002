import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import useFetch from "../hooks/useFetch";
import { GenerationForm } from "../components/forms/GenerationForm";
import { PlayListContext } from "../context/PlayListContext";
import type { reqProps } from "../hooks/usePost";
import { useNavigate } from "react-router";

const Generate = () => {
    const { user } = useContext(AuthContext);
    const { setPlayList } = useContext(PlayListContext);
    const navigate = useNavigate();

    const { data, isLoading, error } = useFetch(`http://localhost:5000/api/song/get_generated_playlists/${user?.id}`);
    const [indexg, setIndexg] = useState(0);
    const url ="http://localhost:5000/api/song/generate?save=true"

    const cb = ({ isLoading, result, error }: reqProps) => {
        if (error) return alert(error.message);
        setPlayList({
            isLoading: isLoading,
            error: error,
            playList: result,
            currentIndex: 0,
        });
        navigate('/playing');
    }

    return (
        <>
            {
                isLoading ? <p>Loading</p> :
                    error ? <p>Error to load information</p> :
                        <>
                            <div className="flex justify-center w-full gap-3 mt-12">
                                {
                                    data.map((item: any, i: number) => {
                                        return (
                                            <GeneratedPlayList
                                                date={item['created_at']}
                                                numberSongs={item['json_data']['playlist'].length}
                                                index={i}
                                                setIndx={setIndexg}
                                            />
                                        );
                                    })
                                }
                            </div>

                            <div className="w-1/4 mx-auto shadow-md m-8 p-5">
                                <h1 className="text-center text-2xl font-bold mt-6 mb-4">{ indexg === -1 ? 'Generate' : `Re-Generate` }</h1>
                                {
                                    indexg === -1 ? <GenerationForm callback={cb} url={url} /> :
                                        //FIXME fix re-rendering of GenerationForm when changing indexg
                                        // <GenerationForm values={data[indexg]['json_data']['generated_by']} callback={() => { }} /> 

                                        //HACK it works but is not correct
                                        data.map((_: any, j: number) => {
                                            if (j !== indexg) return;
                                            return (
                                                <>

                                                    <GenerationForm
                                                        values={data[j]['json_data']['generated_by']}
                                                        url={url}
                                                        callback={cb}
                                                    // saveArg={j === 0 ? false : true} // this for not save the first and don't show repeated generated playlists
                                                    />
                                                </>
                                            );
                                        })
                                }
                                <button onClick={_ => setIndexg(-1)} className="link link-animated">Reset Form</button>
                            </div>
                            {/* {JSON.stringify(data[indexg]['json_data']['generated_by'])} */}
                        </>
            }
        </>
    );
}

const GeneratedPlayList = ({ date, numberSongs, index, setIndx }: { date: string, numberSongs: number, index: number, setIndx: (newIndex: number) => void }) => {
    const onClick = () => { setIndx(index); }

    return (
        <div onClick={_ => onClick()} className="w-fit shadow-md p-5 rounded-md h-[85px] hover:cursor-pointer transform transition-transform delay-100 hover:shadow-lg hover:scale-105">
            <p className="text-sm">Name : {date}</p>
            <p className="text-xs"> {numberSongs} Song(s)</p>
        </div>
    );
}

export { Generate }
