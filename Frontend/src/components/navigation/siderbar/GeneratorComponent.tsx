import { useContext, useEffect } from "react";
import { type reqProps } from "../../../hooks/usePost";
import { PlayListContext } from "../../../context/PlayListContext";
import { GenerationForm } from "../../forms/GenerationForm";
import { useNavigate } from "react-router";


function GeneratorComponent() {
    const { setPlayList } = useContext(PlayListContext);
    const navigate = useNavigate();

    useEffect(() => {
        const loadFlyonui = async () => {
            await import('flyonui/flyonui');
            window.HSStaticMethods.autoInit();
        };
        loadFlyonui();
    }, [location.pathname]);

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

            <div className="accordion-item" id="cancel-arrow" >
                <button className="accordion-toggle py-1 text-sm inline-flex items-center gap-x-4 text-start" aria-controls="cancel-arrow-collapse" aria-expanded="false">
                    <span className="icon-[tabler--chevron-right] accordion-item-active:rotate-90 size-5 shrink-0 transition-transform duration-300 rtl:rotate-180" ></span>
                    Generator
                </button>
                <div id="cancel-arrow-collapse" className="accordion-content hidden h-[600px] px-2 w-full overflow-hidden transition-[height] duration-300" aria-labelledby="cancel-arrow" role="region">

                    <div className="px-5 pb-4">
                        <GenerationForm callback={cb} />
                    </div>
                </div>
            </div>

        </>
    );
}


export { GeneratorComponent }
