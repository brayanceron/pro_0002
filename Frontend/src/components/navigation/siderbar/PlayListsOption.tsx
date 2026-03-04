// import { useContext, useEffect, useState } from "react";
import defaultPlayList from "../../../assets/default/playlist.png"
import useFetch from "../../../hooks/useFetch"
import { useNavigate } from "react-router";



const PlayListsOption = () => {
    const { data, isLoading, error } = useFetch("http://localhost:5000/api/playlist");

    return (
        <div className="accordion-item active" id="payment-arrow">
            <button className="accordion-toggle py-1 text-sm inline-flex items-center gap-x-4 text-start" aria-controls="payment-arrow-collapse" aria-expanded="true">
                <span className="icon-[tabler--chevron-right] accordion-item-active:rotate-90 size-5 shrink-0 transition-transform duration-300 rtl:rotate-180" ></span>
                PlayLists
            </button>
            <div id="payment-arrow-collapse" className="accordion-content w-full overflow-hidden transition-[height] duration-300" aria-labelledby="payment-arrow" role="region">
                <div className="px-5 pb-4">

                    {
                        isLoading ? <p>Loadinf...</p> :
                            error ? <p>Error to load data</p> :
                                data.map((item: any) => {
                                    return <PlayListItem id={item.id} name={item.name} songs={100} />
                                })
                    }
                    
                </div>
            </div>
        </div>
    )
}


function PlayListItem({ id, name, songs }: { id: string, name: string, songs: number }) {
    const navigate = useNavigate();
    const onClick = () => { navigate(`/song/get/by/playlist/${id}`); }

    return (
        <>
            <div onClick={onClick} className="rounded mx-1 my-2 flex shadow-lg px-2 py-2 border-t-2 border-gray-200 border-solid">

                <div className="avatar">
                    <div className="size-10 rounded-full">
                        <img src={defaultPlayList} alt="avatar" />
                    </div>
                </div>

                <div className="ml-2">
                    <p className="text-sm">{name}</p>
                    <p className="text-xs">{songs}</p>
                </div>

            </div>
        </>
    );
}

export default PlayListsOption
