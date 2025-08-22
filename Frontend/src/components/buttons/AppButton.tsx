type AppButtonProps = {
    text: string,
    icon?: string,
    isLoading? : boolean,
    styles?: string,
    addStyles?: string,
    [key: string]: any,
}

const defaultStyles = "btn w-full border-[#2b3137] bg-[#2b3137] text-white shadow-[#2b3137]/30 hover:border-[#2b3137] hover:bg-[#2b3137]/90"

const AppButton = ({ text, icon, styles, addStyles, isLoading = false,  ...attributtes }: AppButtonProps) => {
    styles = styles ? styles : defaultStyles;
    styles = addStyles? `${styles} ${addStyles}` :styles // styles = addStyles? `${addStyles} ${styles}` :styles

    return (
        <>
            <button className={styles} {...attributtes}>
                {icon ? <span className={`icon-[tabler--${icon}]`}></span> : <></>}
                {text}
                {
                    isLoading &&
                    <span className="loading loading-spinner"></span>
                }
            </button>
        </>
    );
}

export default AppButton
