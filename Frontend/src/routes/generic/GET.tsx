import { useEffect, useState, useContext } from "react";
import useFetch from "../../hooks/useFetch";
import { NavLink, useNavigate, } from "react-router";
import { AuthContext } from "../../context/AuthContext";
// import AppButton from "../../components/buttons/AppButton";

import { defaultImages } from "../../utils/defaultImages";
import { AppAlert } from "../../components/informational/AppAlert";

type entity = 'gender' | 'language' | 'playlist' | 'sense' | 'singer';

const GET = ({ entity, urlGet }: { entity: entity, urlGet?: string }) => {
    const { user: authUser } = useContext(AuthContext)!;
    useEffect(() => { setUrl(urlGet || `http://localhost:5000/api/${entity}/by/user/${authUser?.id}`) }, [entity]);

    const [url, setUrl] = useState<string>(urlGet || `http://localhost:5000/api/${entity}/by/user/${authUser?.id}`);
    const { data, isLoading, error } = useFetch(url);

    return (

        <div className="w-full h-screen">
            <h1 className="text-center text-2xl font-bold mt-10 mb-6">List of {entity}</h1>
            <div className="w-1/4 m-auto">
                {
                    isLoading ? <p>Loading...</p>
                        : error ? <AppAlert message={error.message} color="error" icon="x" soft /> :
                            <>
                                <SearchComponent />

                                <div className="mt-5 mb-3">
                                    {
                                        data.map((item: any) => {
                                            return (
                                                <ItemEntity
                                                    id={item.id}
                                                    name={item.name}
                                                    description={item.description}
                                                    imgUrl={item.image ? `http://localhost:5000/static/${item.image}` : defaultImages[entity]}
                                                    entity={entity}
                                                />
                                            )
                                        })
                                    }
                                </div>
                            </>
                }
            </div>

            <Options entity={entity} />

        </div>
    )
}

const ItemEntity = ({ id, name, description, imgUrl, entity }: { id: string, name: string, description: string, imgUrl: string, entity: string }) => {
    const navigate = useNavigate();

    // imgUrl = imgUrl ? imgUrl : defaultImages[entity]
    function onClickGetEntity() { navigate(`/${entity}/get/${id}`); }
    function onClickGetSongs() { navigate(`/song/get/by/${entity}/${id}`); }

    return (
        // <div onClick={onClickGetEntity}   className="shadow-md m-auto border-t-[1px] border-gray-100 border-solid hover:cursor-pointer">
        <div className="shadow-md mt-2 m-auto border-t-[1px] border-gray-100 border-solid hover:cursor-pointer transform transition-transform delay-100 hover:shadow-lg hover:scale-105">
            <div className="w-full px-4 py-2 flex">

                <div className="h-full flex flex-col items-center justify-center justify-items-center content-center">
                    {/* <div className="h-full"> */}
                    {/* <div className="avatar placeholder">
                        <div className="bg-neutral text-neutral-content w-14 rounded-full mask mask-decagon">
                            <span className="text-xl uppercase">cl</span>
                        </div>
                    </div> */}
                    <div className="avatar m-auto">
                        <div className="size-16 rounded-full mask mask-decagon">
                            <img src={imgUrl} alt="avatar" />
                            {/* <img src={suondDefault} alt="Mu" /> */}
                        </div>
                    </div>
                </div>

                <div className="w-full flex flex-col py-1 pl-2">
                    <h1 className="text-xl font-bold">{name}</h1>
                    <p className="text-[8px] link link-animated w-fit">{id}</p>
                    <p className="text-sm">{description}</p>
                </div>

                <div className="flex">

                    <span onClick={onClickGetSongs} className="badge badge-neutral size-6 rounded-full p-0 mr-1">
                        <span className="icon-[tabler--music]"></span>
                    </span>

                    <span onClick={onClickGetEntity} className="badge badge-neutral size-6 rounded-full p-0 mr-1">
                        <span className="icon-[tabler--external-link]"></span>
                    </span>

                    <span className="badge badge-neutral size-6 rounded-full p-0">
                        <span className="icon-[tabler--trash]"></span>
                    </span>

                </div>

            </div>
        </div>
    );

}



const SearchComponent = () => {
    return (
        <div className="input-group flex  m-auto my-3">
            <span className="input-group-text">
                <span className="icon-[tabler--search] text-base-content/80 size-5"></span>
            </span>
            <label className="sr-only" htmlFor="leadingIconDefault">Search Entity Name</label>
            <input type="text" className="input grow" placeholder="John Doe" id="leadingIconDefault" />
        </div>
    );
}

const Options = ({ entity }: { entity: string }) => {
    return (
        <div className="m-auto py-2 flex gap-1 justify-center items-end content-end">
            <NavLink to={`/${entity}/get`} className="">
                <button className="btn btn-xs btn-square border-[#2b3137] bg-[#2b3137] text-white shadow-[#2b3137]/30 hover:border-[#2b3137] hover:bg-[#2b3137]/90" aria-label="Github Icon Button" >
                    <span className="icon-[tabler--reload]"></span>
                </button>
            </NavLink>

            <NavLink to={`/${entity}/post`} className="">
                <button className="btn btn-xs btn-square border-[#2b3137] bg-[#2b3137] text-white shadow-[#2b3137]/30 hover:border-[#2b3137] hover:bg-[#2b3137]/90" aria-label="Github Icon Button" >
                    <span className="icon-[tabler--plus]"></span>
                </button>
            </NavLink>
        </div>
    );
}

export default GET 
