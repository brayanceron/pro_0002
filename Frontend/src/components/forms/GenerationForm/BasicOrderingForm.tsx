
import { useState, useContext, type BaseSyntheticEvent, } from "react";
import { PlayListContext } from "../../../context/PlayListContext";
import { type SongModalExtended, type ExtendedGeneric } from "../../../models/SongModel";
import { PlayListModal, type PlayListModalProps } from "../../../routes/song/generate/PlayListModal";
import { HSOverlay } from "flyonui/flyonui";

type selectedCriterianValues = 'genders' | 'singers' | 'languages' | 'senses' | 'name' | 'goal'
const criterian: selectedCriterianValues[] = ['genders', 'singers', 'languages', 'senses', 'name', 'goal']

export const BasicOrderingForm = () => {
    const { playList, generatedBy } = useContext(PlayListContext);
    const [selectedCriterian, setSelectedCriterian] = useState<selectedCriterianValues | null>(null);
    const [modalData, setModalData] = useState<PlayListModalProps>({ result: playList, isLoading: false, error: null, res: null, generatedBy: null });
    const [desc, setDesc] = useState<boolean>(true);

    const onChangeRadio = (value: selectedCriterianValues) => { setSelectedCriterian(value); }

    const OnClickBtnApply = () => {
        if (!selectedCriterian) return alert("Not criterian selected");
        setModalData({ result: OrderPlayList(), isLoading: false, error: null, res: null, generatedBy });
        HSOverlay.open('#large-modal'); // modal.open()
    }

    const OrderPlayList = () => {
        const newLista: SongModalExtended[] = [...playList];

        newLista.sort((first: SongModalExtended, second: SongModalExtended) => {
            const v1 = !desc ? first[selectedCriterian as keyof SongModalExtended] : second[selectedCriterian as keyof SongModalExtended]
            const v2 = !desc ? second[selectedCriterian as keyof SongModalExtended] : first[selectedCriterian as keyof SongModalExtended]

            if (typeof v1 === "string" && typeof v2 === "string") return v1.toString().localeCompare(v2.toString());
            else if (typeof v1 === "number" && typeof v2 === "number") return parseFloat(v1) - parseFloat(v2);
            else if (Array.isArray(v1) && Array.isArray(v2)) {
                const _v1 = [...v1];
                const _v2 = [...v2];
                _v1.sort((f: ExtendedGeneric, s: ExtendedGeneric) => { return (f.name).localeCompare((s.name)) }); // else if( 'name' in x && 'name' in xx) {
                _v2.sort((f: ExtendedGeneric, s: ExtendedGeneric) => { return (f.name).localeCompare((s.name)) });

                if (!_v1[0] || !_v2[0]) return 0;
                return _v1[0].name.localeCompare(_v2[0].name);
            }
            else return 0;
        });

        return newLista;
    }

    return (
        <>
            <OrderIndicatorButton initState={desc} setState={setDesc} onClick={OnClickBtnApply} />

            <div className="join drop-shadow checked:bg-red-700">
                {
                    criterian.map((i: selectedCriterianValues) => {
                        return (
                            <input key={i}
                                className="join-item btn btn-xs text-xs bg-gray-200  hover:bg-gray-300"
                                type="radio"
                                name="radio-15"
                                aria-label={i}
                                onChange={() => onChangeRadio(i)} // checked={selectedCriterian === i} 
                            />
                        );
                    })
                }
            </div>
            <PlayListModal {...modalData} />
        </>
    )
}

const OrderIndicatorButton = ({ initState, setState, onClick }: { initState: boolean, setState: (newState: boolean) => void, onClick: () => void }) => {
    const onChange = (event: BaseSyntheticEvent) => { setState(event.target.checked); } // const onToggle = () => setState(!initState);

    return (
        <div className="indicator inline-block mr-2">
            <div className="indicator-item indicator-middle indicator-end">
                <label className="swap swap-rotate ml-2 mb-3">
                    <input type="checkbox" onChange={onChange} checked={initState} />
                    <span className="swap-on  icon-[tabler--square-rounded-arrow-up-filled] size-5 bg-green-500"></span>
                    <span className="swap-off icon-[tabler--square-rounded-arrow-down-filled] size-5 bg-yellow-500"></span>
                </label>
            </div>

            <button className="btn btn-xs btn-secondary py-0 h-fit text-[0.55rem] " onClick={onClick}>
                Sort ({initState ? 'DSC' : 'ASC'})
            </button>

        </div>
    );
}
