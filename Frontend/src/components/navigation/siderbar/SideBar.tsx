import { useEffect } from "react";
// import useFetch from "../../../hooks/useFetch";
import PlayListsOption from "./PlayListsOption";
import GenderOption from "./GenderOption";
import { GeneratorComponent } from "./GeneratorComponent";


const SideBar = () => {
    useEffect(() => {
        const loadFlyonui = async () => {
            await import('flyonui/flyonui');
            window.HSStaticMethods.autoInit();
        };
        loadFlyonui();
    }, [location.pathname]);


    return (
        // <div className="w-1/5 flex shadow-md bg-black text-white">
        <div className="w-1/4 h-screen flex shadow-md ml-4 bg-gray-100 overflow-y-scroll">

            <div className="w-full h-screen  inline-block m-0 p-0">

                <div className="accordion divide-neutral/20 divide-y" data-accordion-always-open="">

                    <PlayListsOption />
                    <GenderOption />
                    <GeneratorComponent />

                    {/* <div className="accordion-item" id="cancel-arrow">
                        <button className="accordion-toggle py-1 text-sm inline-flex items-center gap-x-4 text-start" aria-controls="cancel-arrow-collapse" aria-expanded="false">
                            <span className="icon-[tabler--chevron-right] accordion-item-active:rotate-90 size-5 shrink-0 transition-transform duration-300 rtl:rotate-180" ></span>
                            Singers
                        </button>
                        <div id="cancel-arrow-collapse" className="accordion-content hidden w-full overflow-hidden transition-[height] duration-300" aria-labelledby="cancel-arrow" role="region">
                            <div className="px-5 pb-4">
                                <p className="text-base-content/80 font-normal">
                                    Scheduled delivery orders can be cancelled 72 hours prior to your selected delivery date for full refund.
                                </p>
                            </div>
                        </div>
                    </div> */}

                </div>

            </div>

        </div>
    )
}


export { SideBar }
