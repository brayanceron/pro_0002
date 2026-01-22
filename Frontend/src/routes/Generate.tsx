import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import useFetch from "../hooks/useFetch";
import { GenerationForm } from "../components/forms/GenerationForm";
import type { reqProps } from "../hooks/usePost";
import { AppAlert } from "../components/informational/AppAlert";
import { PlayListModal } from "./song/generate/PlayListModal";
import { HSOverlay } from 'flyonui/flyonui';

const Generate = () => {
    const { user } = useContext(AuthContext);

    const { data, isLoading, error, /* res */ } = useFetch(`http://localhost:5000/api/song/get_generated_playlists/${user?.id}`);
    const [modalData, setModalData] = useState<reqProps>({ result: null, isLoading: true, error: null, res: null });
    const [indexg, setIndexg] = useState(0);
    const url = "http://localhost:5000/api/song/generate?save=true"

    const cb = ({ isLoading, result, error }: reqProps) => {
        setModalData({ result: result, isLoading: isLoading, error: error, res: null });
        HSOverlay.open('#large-modal'); // modal.open()
    }
    useEffect(() => { if (error) { setIndexg(-1); } }, [isLoading])

    return (
        <>
            {isLoading ? <p>Loading</p> :
                (error) ? <div className="w-1/4 mx-auto mt-12"><AppAlert message={error.message} color="error" icon="x" soft /></div> :
                    <>
                        <div className="flex justify-center w-full gap-3 mt-12">
                            {
                                data.map((item: any, i: number) => {
                                    return (
                                        <GeneratedPlayList
                                            date={item['created_at']}
                                            numberSongs={item['json_data']['playlist_size'] || -1}
                                            index={i}
                                            setIndx={setIndexg}
                                        />
                                    );
                                })
                            }
                        </div>

                        {
                            indexg === -1 ? <></> :
                                <div className="w-1/4 mx-auto shadow-md m-8 p-5">
                                    <h1 className="text-center text-2xl font-bold mt-6 mb-4">{indexg === -1 ? 'Generate' : `Re-Generate`}</h1>
                                    {
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
                        }
                        {/* {JSON.stringify(data[indexg]['json_data']['generated_by'])} */}
                    </>
            }
            {
                indexg === -1 ?
                    <div className="w-1/4 mx-auto shadow-md m-8 p-5">
                        <h1 className="text-center text-2xl font-bold mt-6 mb-4">{indexg === -1 ? 'Generate' : `Re-Generate`}</h1>
                        <GenerationForm callback={cb} url={url} />
                    </div>
                    : <></>
            }
            <PlayListModal error={modalData.error} isLoading={modalData.isLoading} result={modalData.result} res={modalData.res} />
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
