import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import useFetch from "../hooks/useFetch";
import { GenerationForm } from "../components/forms/GenerationForm";

const Home = () => {
    const { user } = useContext(AuthContext);
    const { data, isLoading, error } = useFetch(`http://localhost:5000/api/song/get_generated_playlists/${user?.id}`);
    const [indexg, setIndexg] = useState(0);

    return (
        <>
            {
                isLoading ? <p>Loading</p> :
                    error ? <p>Error to load information</p> :
                        <>
                            <div className="flex justify-center w-full gap-3 mt-15">
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

                            {
                                //FIXME fix re-rendering of GenerationForm when changing indexg
                                // <GenerationForm values={data[indexg]['json_data']['generated_by']} callback={() => { }} /> 

                                //HACK it works but is not correct
                                data.map((_: any, ii: number) => {
                                    if (ii !== indexg) return;
                                    return (
                                        <div className="w-1/3 mx-auto shadow-md p-5">
                                            <GenerationForm values={data[ii]['json_data']['generated_by']} callback={() => { }} />
                                        </div>
                                    );
                                })
                            }
                            {JSON.stringify(data[indexg]['json_data']['generated_by'])}
                        </>
            }
        </>
    );
}

const GeneratedPlayList = ({ date, numberSongs, index, setIndx }: { date: string, numberSongs: number, index: number, setIndx: (newIndex: number) => void }) => {
    const onClick = () => { setIndx(index); }

    return (
        <div onClick={_ => onClick()} className="w-fit shadow-md p-5 rounded-md h-[200px] hover:cursor-pointer transform transition-transform delay-100 hover:shadow-lg hover:scale-105">
            <p>Name : {date}</p>
            <p className="text-xs"> {numberSongs} Song(s)</p>
        </div>
    );
}

export { Home }
