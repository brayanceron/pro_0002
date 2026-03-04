import useFetch from "../../../hooks/useFetch"
import { getUrlBySrc } from "../../../utils/urls"
import defaultGender from "../../../assets/default/gender.png"
import { useNavigate } from "react-router"


const GenderOption = () => {

    const { data, isLoading, error } = useFetch("http://localhost:5000/api/gender")

    return (
        <div className="accordion-item" id="delivery-arrow">
            <button className="accordion-toggle py-1 text-sm inline-flex items-center gap-x-4 text-start" aria-controls="delivery-arrow-collapse" aria-expanded="false">
                <span className="icon-[tabler--chevron-right] accordion-item-active:rotate-90 size-5 shrink-0 transition-transform duration-300 rtl:rotate-180" ></span>
                Genders
            </button>
            <div id="delivery-arrow-collapse" className="accordion-content hidden w-full overflow-hidden transition-[height] duration-300" aria-labelledby="delivery-arrow" role="region">
                <div className="px-5 pb-4 flex flex-wrap">

                    {
                        isLoading ? <p>Loading... :</p> :
                            error ? <p>Error</p> :
                                data.map((item: any) => {
                                    return <GenderItem title={item.name} urlImg={item.image} id={item.id} />
                                })
                    }

                </div>
            </div>
        </div>
    )
}

const GenderItem = ({ title, urlImg, id }: { title: string, urlImg: string, id: string }) => {
    const navigate = useNavigate();
    urlImg = urlImg ? getUrlBySrc(urlImg) : defaultGender;
    const onClick = () => { navigate(`/song/get/by/gender/${id}`); }

    return (
        <>
            <div onClick={onClick} className={`p-0 shadow-xl m-1 transform transition delay-150 hover:scale-110 mask mask-hexagon hover:shadow-2xl`}>

                <div className={`w-[60px] h-[60px] relative `}>
                    <img src={urlImg} alt="" className="absolute bg-cover bg-center h-full w-full" />
                    <p className="bg-black text-white w-[90%] mx-1 text-center absolute top-[40%] mb-1 text-xs">{title}</p>
                </div>

            </div>
        </>
    );
}

export default GenderOption
