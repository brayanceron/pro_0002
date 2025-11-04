import { useParams } from 'react-router';
import useFetch from '../../hooks/useFetch';
import SongForm from '../../components/forms/SongForm';
import type { reqProps } from '../../hooks/usePost';
import { Method } from '../../utils/Methods';
import { useEffect, useRef, useState } from 'react';
import { getImageUrl, } from '../../utils/urls';
import defaultImgs from '../../assets/default/song.png';
import { AppAlert } from '../../components/informational/AppAlert';
import { Notyf } from "notyf"
import "../../../node_modules/notyf/notyf.min.css"


const GETID = () => {
    const imgRef = useRef<HTMLImageElement>(null)
    const params = useParams();
    const song_id = params.id;
    // const [reload, setReload] = useState(false);
    const [url, setUrl] = useState(`http://localhost:5000/api/song/${song_id}?extended=1`)

    // const { data, isLoading, error } = useFetch(`http://localhost:5000/api/song/${song_id}?extended=1`);
    const { data, isLoading, error } = useFetch(url);
    const [fData, setFData] = useState<any>({})

    const notyf = new Notyf();
    function cb({ result, res, error : errorCb }: reqProps) { 
        if (errorCb) { return notyf.error("Error updating the song!  "+ errorCb.message); }
        if (res && res.ok){ 
            setUrl(url+' '); 
            return notyf.success(result.message); 
        }
    }

    // const onErrorLoad = () => { imgRef.current!.src = defaultImgs; }

    useEffect(() => {
        if (!data || isLoading || error) return;
        
        setFData({
            ...data, // ...data[0],
            genders: (data) ? data.genders.map((item: any) => item.id) : [], // genders : data[0].genders.map((item: any) => item.id),
            senses: (data) ? data.senses.map((item: any) => item.id) : [],  // senses : data[0].senses.map((item: any) => item.id),
            singers: (data) ? data.singers.map((item: any) => item.id) : [], // singers : data[0].singers.map((item: any) => item.id),
            languages: (data) ? data.languages.map((item: any) => item.id) : [], // languages : data[0].languages.map((item: any) => item.id),
            playlists: (data) ? data.playlists.map((item: any) => item.id) : [], // languages : data[0].languages.map((item: any) => item.id),
        });
        console.log(fData)
    }, [data, isLoading, error])


    return (
        <div className='mt-15'>
            {
                isLoading ? <p>Loading...</p> :
                    error ? <AppAlert message={error.message} color="error" icon="x" soft addStyles='w-1/3 m-auto' /> :
                        (fData && fData.id) ?
                            <>
                                <div className='w-auto'>
                                    {/* <img className="mask mask-decagon m-auto size-44" ref={imgRef} src={getImageUrl(fData.image || fData.url)} alt="Error" onError={onErrorLoad} /> */}
                                    <img className="mask mask-decagon m-auto size-44" ref={imgRef} src={getImageUrl(fData.image || fData.url || defaultImgs)} alt="Error" />
                                    <h1 className="text-4xl text-center mt-2">{fData.name}</h1>
                                    <p className="text-xs text-center">{fData.id}</p>
                                    <p className="text-xs text-center text-gray-400">(Song)</p>
                                </div>

                                <div className='w-1/4 mt-5 mx-auto'>
                                    <SongForm values={fData} url={`http://localhost:5000/api/song/${song_id}`} callback={cb} method={Method.PUT} />
                                </div>

                            </>
                            : <p>Formating...</p>
            }
        </div>
    )
}

export default GETID
