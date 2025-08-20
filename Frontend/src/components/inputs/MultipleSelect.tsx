import { useRef, useEffect } from "react";
import { defaultImages } from "../../utils/defaultImages";

type MultipleSelectProps = {
    value?: any,
    id: string,
    name: string,
    label: string,
    options: option[],
    [key: string]: any,
}

type option = {
    id: string,
    // selected : boolean,
    selected: boolean,
    name: string,
    description: string,
    // url : string,
    image: string,
    alt: string,
}

// const MultipleSelect = ({label, options, ...attributtes }: { label: string, options: option[] }) => {
const MultipleSelect = ({ value, id, name, label, options = [], ...attributtes }: MultipleSelectProps) => {
    const se = useRef<HTMLSelectElement>(null)

    useEffect(() => {
        const loadFlyonui = async () => {
            await import('flyonui/flyonui');
            window.HSStaticMethods.autoInit();
        };
        loadFlyonui();
    }, []);

    return (
        <div className="w-full">
            <h1>{label}</h1>
            <select
                ref={se}
                id={id}
                name={name}
                multiple
                data-select='{
                "placeholder": "Select option...",
                "toggleTag": "<button type=\"button\" aria-expanded=\"false\"></button>",
                "toggleClasses": "advance-select-toggle",
                "dropdownClasses": "advance-select-menu max-h-48 -ms-1 vertical-scrollbar rounded-scrollbar",
                "optionClasses": "advance-select-option selected:active",
                "mode": "tags",
                "wrapperClasses": "advance-select-tag flex-wrap bg-gray-200 border-0",
                "tagsItemTemplate": " <div class=\"shadow-lg bg-gray-400 flex flex-nowrap items-center relative z-10 bg-base-100 border border-base-content/25 rounded-full p-1 m-1\"> <div class=\"size-6 me-1\" data-icon></div> <div class=\" whitespace-nowrap text-base-content\" data-title></div> <div class=\"btn btn-sm min-h-0 size-5 btn-circle btn-soft btn-secondary ms-2 \" data-remove><span class=\"text-white icon-[tabler--x] flex-shrink-0 size-3\"></span></div> </div>",
                "tagsInputClasses": "py-3 px-2 rounded-lg order-1 text-sm outline-none",
                "optionTemplate": "<div class=\"flex items-center\"> <div class=\"size-8 me-2\" data-icon></div><div><div class=\"text-sm font-semibold text-base-content\" data-title></div> <div class=\"text-xs text-base-content/80\" data-description></div></div><div class=\"flex justify-between items-center flex-1\"><span data-title></span><span class=\"icon-[tabler--check] flex-shrink-0 size-4 text-primary hidden selected:block \"></span></div> </div>",
                "extraMarkup": "<span class=\"icon-[tabler--caret-up-down] flex-shrink-0 size-4 text-base-content absolute top-1/2 end-3 -translate-y-1/2 \"></span>"
                }'
                className="hidden"
                aria-label="Advance select"
                {...attributtes}
            >
                <option value="">Choose</option>
                {
                    options.map((item: option,) => {
                        const image = item.image ? `http://localhost:5000/static/${item.image}` :  defaultImages[name]
                        return (
                            <option
                                key={item.id}
                                selected={item.selected && false}
                                value={item.id}
                                defaultValue={item.id}
                                data-select-option={`{
                                    "description": "${item.description}",
                                    "icon": "<img class=\\"rounded-full\\" src=\\"${image}\\" alt=\\"${item.alt && ''}\\" />"}
                                `}
                            >
                                {item.name}
                            </option>
                        )
                    })
                }
            </select>
        </div>
    )
}

export default MultipleSelect
