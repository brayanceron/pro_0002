import { useContext, useEffect, useRef, useState, /* useState */ } from "react"
import Sortable from 'sortablejs'
import { PlayListContext } from "../../../context/PlayListContext";
import type { SongModel } from "../../../models/SongModel";


type keyss = 'genders' | 'languages' | 'senses' | 'singers' | 'name' | 'score'; // type keyss = 'genders' | 'languages' | 'senses' | 'singers';
// type ord = 'asc' | 'desc';

/* type StructArr = {
    genders?: string[],
    languages?: string[],
    senses?: string[],
    singers?: string[],
} */
type StructOrder = {
    globalOrder?: keyss[],

    genders?: string[],
    languages?: string[],
    senses?: string[],
    singers?: string[],
    // name?: string,
    // score?: string,

    // name?: ord,
    // score?: ord,
}

const emptyFields: StructOrder = {
    globalOrder: ['genders', 'languages', 'senses', 'singers'],
    // genders: ['Pop', 'Rock', 'Blues'],
    // languages: ['Spanish', 'English', 'Esperanto'],
    // senses: ['Sadly', 'Happy', 'Joy'],
    // singers: ['Maluma', 'Michael Jackson', 'Shakira'],
    genders: ['cumbia', 'merengue'],
    languages: ['spanish', 'unknown'],
    senses: ['joy', 'Happy', 'enthusiasm'],
    singers: ['unknown'],
    // name : [],
    // score : [],
}

// export const OrderingForm = ({ /* defaultValues = []  */ }: { defaultValues?: string[] }) => {
export const OrderingForm = ({ defaultValues = emptyFields }: { defaultValues?: StructOrder }) => {
    const {playList} = useContext(PlayListContext)
    const [allOrd, setAllOrd] = useState<StructOrder>(defaultValues)
    const lu = useRef(null)

    const onSortList = (evt: any) => {
        console.log(evt)

        // console.log(arraySort)
        const id = evt.item.dataset.id;
        let father = evt.item.dataset.father;
        console.log(father, id)
        console.log(arraySort[0].toArray().indexOf(father))


        let jSve = -1;
        for (let j = 0; j < arraySort.length; j++) {
            const element = arraySort[j];
            if (element.toArray().includes(id)) { jSve = j; break; }
        }

        if (jSve === -1) return;

        const newValues: StructOrder = {
            ...allOrd,
            [father]: arraySort[jSve].toArray()
        }
        setAllOrd(newValues)
    }

    const stylesSortable: Sortable.Options = {
        animation: 150,
        ghostClass: 'bg-blue-400',
        dragClass: 'bg-red-800', // dragClass: '!border-0',

        fallbackOnBody: true,
        group: 'mygroup',
        swapThreshold: 0.65,
        onSort: onSortList,
    }

    let arraySort: Sortable[] = [];

    useEffect(() => {
        if (lu) {
            // Sortable.create(lu.current!, stylesSortable);
            // srt = Sortable.create(lu.current!, stylesSortable);
            // const nestedSortables: any = document.querySelectorAll('#nested-sortable .nested-sortable-item')
            // const nestedSortables: HTMLElement[] = document.querySelectorAll('#nested-sortable .nested-sortable-item')
            const nestedSortables: NodeListOf<HTMLElement> = document.querySelectorAll('#nested-sortable .nested-sortable-item')
            for (var i = 0; i < nestedSortables.length; i++) {
                // const nw = Sortable.create(nestedSortables[i], stylesSortable)

                // console.log(`${i}.) `,nestedSortables[i].dataset.id)
                // console.log(`${i}.) `,nestedSortables[i].dataset.key)
                // console.log(`${i}.) `,nestedSortables[i].id)
                // Object.keys(allOrd)[]
                // const nw = Sortable.create(nestedSortables[i], {...stylesSortable, group : `item_${i}`})
                const nw = Sortable.create(nestedSortables[i], { ...stylesSortable })
                arraySort.push(nw)
            }
        }
    }, []);

    const onChangeChk = (event: any) => {
        const chkId: string = event.target.id
        const val: boolean = event.target.checked

        console.log('val:', val)
        // let  edit : any = allOrd;
        let edit: StructOrder = {...allOrd};
        if (val === false) {
            delete edit[chkId as keyof StructOrder] // delete edit[chkId]
            setAllOrd(edit)
        }
        else {
            // edit = { ...edit, [chkId]: [] }
            edit = { ...edit, [chkId]: ['unknown_1', 'unknown_0'] }
            setAllOrd(edit)
        }
        console.log(edit)
    }
    // const OnClickBtnApply = (event :any) => {
    const OnClickBtnApply = (_ :any) => {
        console.log(playList)
        const newLista = [...playList];

        newLista.sort((a : SongModel,b :SongModel)=>{

            const nameCompare = a.name.localeCompare(b.name);
            if (nameCompare !== 0) return nameCompare;

            const goalCompare = parseFloat(a.goal) - parseFloat(b.goal);  // ASC (smallest to largest)
            // const goalCompare = parseFloat(b.goal) - parseFloat(a.goal);  // DESC (largest to smallest)
            return goalCompare;
        })
        console.log(newLista)
    }

    return (
        <>

            <div className="flex gap-4 horizontal-scrollbar">
                {
                    ['genders', 'singers', 'languages', 'senses'].map((i: string) => {
                        return (
                            <div className="flex items-center gap-2">
                                <input type="checkbox" className="checkbox checkbox-primary" id={i} onChange={onChangeChk} /* checked={i in allOrd} */ />
                                <label className="label label-text text-base" htmlFor={i}> {i} </label>
                            </div>
                        )
                    })
                }
            </div>
            <button className="btn btn-primary" onClick={OnClickBtnApply}>Apply filters</button>

            <div ref={lu} id="nested-sortable" className="w-full">
                <div className="nested-sortable-item space-y-1">

                    {
                        Object.keys(allOrd).map((k: string) => {
                            // ['genders', 'singers', 'languages', 'senses'].map( (k : string)=>{
                            if (!['genders', 'languages', 'singers', 'senses'].includes(k)) return <></>

                            return (
                                <div className="nested-1 space-y-1" data-id={k} data-father='globalOrder' id={k}> {/* <div className="nested-1 space-y-1" data-id="genders"> */}
                                    <div className="p-3 flex items-center gap-x-3 cursor-move bg-base-100 border border-base-content/25 rounded-lg font-medium text-sm text-base-content/80">
                                        {k}
                                        <span className="icon-[tabler--grip-vertical] text-base-content ms-auto size-4 shrink-0"></span>
                                    </div>
                                    <div className="ps-5 space-y-1 nested-sortable-item">
                                        {
                                            (allOrd[k as keyof StructOrder] || []).map((g: string) => {
                                                return (
                                                    <div className="nested-2" data-id={g} data-father={k} id={g}>
                                                        <div className="p-3 flex items-center gap-x-3 cursor-move bg-base-200/60 border border-base-content/25 rounded-lg font-medium text-sm text-base-content/80">
                                                            {g}
                                                            <span className="icon-[tabler--grip-vertical] text-base-content ms-auto size-4 shrink-0"></span>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }

                    {

                        // (allOrd.genders) && // ('genders' in allOrd && allOrd.genders) ?
                        //     <div className="nested-1 space-y-1" data-id="genders">
                        //         <div className="p-3 flex items-center gap-x-3 cursor-move bg-base-100 border border-base-content/25 rounded-lg font-medium text-sm text-base-content/80">
                        //             Genders
                        //             <span className="icon-[tabler--grip-vertical] text-base-content ms-auto size-4 shrink-0"></span>
                        //         </div>
                        //         <div className="ps-5 space-y-1 nested-sortable-item">
                        //             {
                        //                 allOrd.genders.map((g: string, index: number) => {
                        //                     return (
                        //                         <div className="nested-2" data-id={`genders_${index}`}>
                        //                             <div className="p-3 flex items-center gap-x-3 cursor-move bg-base-200/60 border border-base-content/25 rounded-lg font-medium text-sm text-base-content/80">
                        //                                 {g}
                        //                                 <span className="icon-[tabler--grip-vertical] text-base-content ms-auto size-4 shrink-0"></span>
                        //                             </div>
                        //                         </div>
                        //                     )
                        //                 })
                        //             }
                        //         </div>
                        //     </div>
                    }

                    {/* ========================== */}

                    {/* {
                        (allOrd.genders) && // ('genders' in allOrd && allOrd.genders) ?
                            <div className="nested-1 space-y-1" data-id="genders">
                                <div className="p-3 flex items-center gap-x-3 cursor-move bg-base-100 border border-base-content/25 rounded-lg font-medium text-sm text-base-content/80">
                                    Genders
                                    <span className="icon-[tabler--grip-vertical] text-base-content ms-auto size-4 shrink-0"></span>
                                </div>
                                <div className="ps-5 space-y-1 nested-sortable-item">
                                    {
                                        allOrd.genders.map((g: string, index: number) => {
                                            return (
                                                <div className="nested-2" data-id={`genders_${index}`}>
                                                    <div className="p-3 flex items-center gap-x-3 cursor-move bg-base-200/60 border border-base-content/25 rounded-lg font-medium text-sm text-base-content/80">
                                                        {g}
                                                        <span className="icon-[tabler--grip-vertical] text-base-content ms-auto size-4 shrink-0"></span>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                    }

                    <div className="nested-1 space-y-1" data-id="singers">
                        <div className="p-3 flex items-center gap-x-3 cursor-move bg-base-100 border border-base-content/25 rounded-lg font-medium text-sm text-base-content/80">
                            Singers
                            <span className="icon-[tabler--grip-vertical] text-base-content ms-auto size-4 shrink-0"></span>
                        </div>
                        <div className="ps-5 space-y-1 nested-sortable-item">
                            {
                                // ['Maluma', 'Michael Jackson', 'Shakira'].map((s: string, index: number) => {
                                allOrd.singers!.map((s: string, index: number) => {
                                    return (
                                        <div className="nested-2" data-id={`singer_${index}`}>
                                            <div className="p-3 flex items-center gap-x-3 cursor-move bg-base-200/60 border border-base-content/25 rounded-lg font-medium text-sm text-base-content/80">
                                                {s}
                                                <span className="icon-[tabler--grip-vertical] text-base-content ms-auto size-4 shrink-0"></span>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>

                    <div className="nested-1 space-y-1" data-id="languages">
                        <div className="p-3 flex items-center gap-x-3 cursor-move bg-base-100 border border-base-content/25 rounded-lg font-medium text-sm text-base-content/80">
                            Languages
                            <span className="icon-[tabler--grip-vertical] text-base-content ms-auto size-4 shrink-0"></span>
                        </div>
                        <div className="ps-5 space-y-1 nested-sortable-item">
                            {
                                allOrd.languages!.map((l: string, index: number) => {
                                    return (
                                        <div className="nested-2" data-id={`lang_${index}`}>
                                            <div className="p-3 flex items-center gap-x-3 cursor-move bg-base-200/60 border border-base-content/25 rounded-lg font-medium text-sm text-base-content/80">
                                                {l}
                                                <span className="icon-[tabler--grip-vertical] text-base-content ms-auto size-4 shrink-0"></span>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>

                    <div className="nested-1 space-y-1" data-id='senses'>
                        <div className="p-3 flex items-center gap-x-3 cursor-move bg-base-100 border border-base-content/25 rounded-lg font-medium text-sm text-base-content/80">
                            Senses
                            <span className="icon-[tabler--grip-vertical] text-base-content ms-auto size-4 shrink-0"></span>
                        </div>
                        <div className="ps-5 space-y-1 nested-sortable-item">
                            {
                                allOrd.senses!.map((l: string, index: number) => {
                                    return (
                                        <div className="nested-2" data-id={`sense_${index}`}>
                                            <div className="p-3 flex items-center gap-x-3 cursor-move bg-base-200/60 border border-base-content/25 rounded-lg font-medium text-sm text-base-content/80">
                                                {l}
                                                <span className="icon-[tabler--grip-vertical] text-base-content ms-auto size-4 shrink-0"></span>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                     */}
                    {/* ========================== */}

                    <div className="nested-1" data-id='name'>
                        <div className="p-3 flex items-center gap-x-3 cursor-move bg-base-100 border border-base-content/25 rounded-lg font-medium text-sm text-base-content/80">
                            Name
                            <span className="icon-[tabler--grip-vertical] text-base-content ms-auto size-4 shrink-0"></span>
                        </div>
                    </div>
                    <div className="nested-1" data-id='score'>
                        <div className="p-3 flex items-center gap-x-3 cursor-move bg-base-100 border border-base-content/25 rounded-lg font-medium text-sm text-base-content/80">
                            GobalScore
                            <span className="icon-[tabler--grip-vertical] text-base-content ms-auto size-4 shrink-0"></span>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );

    // ==========================================

    // return (
    //     <>
    //         <div className="w-[450px]">
    //             <ul ref={lu} id="list-example" className="border-base-content/25 divide-base-content/25 flex flex-col divide-y rounded-md border *:cursor-move *:p-3 first:*:rounded-t-md last:*:rounded-b-md" >

    //                 {
    //                     itemListss.map((item: string) => {
    //                     // defaultValues.map((item: string) => {

    //                         return (
    //                             <>
    //                                 <li className="flex items-center gap-3">
    //                                     <span className="icon-[tabler--arrows-move] size-4 shrink-0"></span> {/* <span className="icon-[tabler--components] size-4 shrink-0"></span> */}
    //                                     {item}
    //                                     <div ref={lusub}>
    //                                         <ul id="items">
    //                                             <li>item 1</li>
    //                                             <li>item 2</li>
    //                                             <li>item 3</li>
    //                                         </ul>
    //                                     </div>
    //                                     <span className="icon-[tabler--grip-vertical] text-base-content ms-auto size-4 shrink-0"></span>
    //                                 </li>
    //                             </>
    //                         );
    //                     })
    //                 }

    //             </ul>
    //         </div>
    //     </>
    // )
}

// const itemListss = [
//     "genders",
//     "singers",
//     // "languages",

// ]

// const opt = [
//     {
//         id: 'gender',
//         selected: false,
//         name: 'gender',
//         description: 'Genders',
//         image: '',
//         alt: 'Genders',
//     },
//     {
//         id: 'siger',
//         selected: false,
//         name: 'siger',
//         description: 'Sigers',
//         image: '',
//         alt: 'Sigers',
//     },
//     {
//         id: 'language',
//         selected: false,
//         name: 'language',
//         description: 'Languages',
//         image: '',
//         alt: 'Languages',
//     },
//     {
//         id: 'sense',
//         selected: false,
//         name: 'sense',
//         description: 'Senses',
//         image: '',
//         alt: 'Senses',
//     },
//     /* {
//         id: 'idtest',
//         selected: false,
//         name: 'idtest',
//         description: 'description test',
//         image: '',
//         alt: 'alt idtest',
//     },
//     {
//         id: 'test II',
//         selected: false,
//         name: 'test II',
//         description: 'description test II',
//         image: '',
//         alt: 'alt test II',
//     },
//     {
//         id: 'option III',
//         selected: false,
//         name: 'opt III',
//         description: 'description option III',
//         image: '',
//         alt: 'alt test III',
//     },
//     {
//         id: 'my IV',
//         selected: false,
//         name: 'opt IV',
//         description: 'description option Iv',
//         image: '',
//         alt: 'alt test IV',
//     },
//     {
//         id: 'late V',
//         selected: false,
//         name: 'late V',
//         description: 'description late V',
//         image: '',
//         alt: 'alt late V',
//     }, */
// ]
