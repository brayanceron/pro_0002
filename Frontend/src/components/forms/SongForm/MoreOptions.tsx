import AppButton from "../../buttons/AppButton"
import ModalAddEntity from "./ModalAddEntity";


const MoreOptions = ({ entity, reload }: { entity: string, reload: () => void }) => {
    const reloadData = () => {
        // alert("reloading...")
        // console.log(reload)
        reload()
    }

    return (
        <>
            <div className="w-full pt-1 pb-0 mb-0 flex justify-end gap-[2px] h-[20px]">
                <div className="w-[25px]">
                    <AppButton text="" icon="plus" addStyles=" btn-circle btn-xs pt-0 px-1 h-[20px]" data-overlay={`#modal-${entity}`} />
                </div>
                <div className="w-[25px]">
                    <AppButton text="" onClick={reloadData} icon="reload" addStyles="btn-circle btn-xs pt-0 px-1" />
                </div>
            </div>


            <ModalAddEntity entity={entity}/>
        </>


    );

}

export { MoreOptions }