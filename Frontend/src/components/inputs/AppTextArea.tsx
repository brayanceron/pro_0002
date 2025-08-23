type AppInputProps = {
    value: string,
    id: string,
    name: string,

    options?: OptionsInput,

    [key: string]: any,
}

export type OptionsInput = {
    label?: string,
    placeholder?: string,
    icon?: string,
    helper?: string,
}
const AppTextArea = ({ value, name, id, options: { label = '', placeholder = '', helper = '', icon = '' } = {}, ...attributes }: AppInputProps) => {

    // console.log(label, placeholder,icon, helper)// warn
    return (
        <>
            <div className="w-full">
                {
                    label ?
                        <label className="label label-text" htmlFor={id}> {label} </label>
                        : <></>
                }

                <div className="input-group">
                    {
                        icon ?
                            <span className="input-group-text">
                                <span className={`icon-[tabler--${icon}] text-base-content/80 size-5`}></span>
                            </span>
                            : <></>
                    }

                    <textarea
                        value={value}
                        id={id}
                        name={name}
                        {...attributes} // rows={rows}
                        placeholder={placeholder}
                        className="textarea" aria-label="Textarea"
                    >
                        {value}
                    </textarea>
                </div>

                {
                    helper ?
                        <span className="label">
                            <span className="label-text-alt">{helper}</span>
                        </span>
                        : <></>
                }

            </div>

        </>
    )

}

export default AppTextArea;
