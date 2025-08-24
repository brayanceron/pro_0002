// type size = 'xs' | 'sm' | 'lg' | 'xl' ;

const GoalInput = ({ value = 0, name, id, label, size = 'xs', ...attributes } : { value?: number, name: string, id: string, label?: string, size?: string, [key: string]: any, }) => {
    
    return (
        <div>
            <label className="label label-text my-0 py-0" htmlFor={name}>{label}</label>
            <input
                type="range"
                className={`my-0 range range-${size}`}
                aria-label="range"
                value={value}
                step={0.01}
                name={name}
                id={id}
                max={5}
                min={-0.01}
                {...attributes}
            />
            <p className="text-left">{value}</p>

        </div>
    )
}

export { GoalInput }
