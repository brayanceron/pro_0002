import { useEffect, useRef } from "react";
import { useForm } from "../../../hooks/useForm"

export const SearchSong = ({ defaultValue, callback, onClear }: { defaultValue : string, callback: (foundData: string) => void, onClear : () => void }) => {
    const { data: form, onChange } = useForm({ pattern: defaultValue });
    const onClickBtnSearch = () => { callback(form.pattern); }
    const ref = useRef<HTMLInputElement>(null)
    
    useEffect(()=>{
        ref.current?.addEventListener('search', (e : any) =>{
            const v = e.target.value
            if ( v === '') return onClear();
            callback(v)
        })
    },[])

    return (
        <div className="input-group max-w-sm">
            <input ref={ref} type="search" className="input input-lg grow" placeholder="Search" id="pattern" name="pattern" value={form.pattern} onChange={onChange} />
            <label className="sr-only" htmlFor="kbdInput">Search</label>
            <span onClick={onClickBtnSearch} className="input-group-text">
                <span className="icon-[tabler--search] text-base-content/80 size-6"></span>
            </span>
            {/* <span className="input-group-text gap-2">
                <kbd className="kbd kbd-sm">⌘</kbd>
                <kbd className="kbd kbd-sm">K</kbd>
            </span> */}
        </div>
    )
}
