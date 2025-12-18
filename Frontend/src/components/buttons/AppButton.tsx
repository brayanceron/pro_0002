import { useEffect, useState } from "react";

type AppButtonProps = {
    text: string,
    icon?: string,
    isLoading? : boolean,
    styles?: string,
    addStyles?: string,
    [key: string]: any,
}

// const defaultStyles = "btn w-full border-[#2b3137] bg-[#2b3137] text-white shadow-[#2b3137]/30 hover:border-[#2b3137] hover:bg-[#2b3137]/90"
const defaultStyles = "btn w-full border-[#2b3137] bg-[#2b3137] text-white shadow-[#2b3137]/30 hover:border-[#2b3137] hover:bg-[#2b3137]/90"

const AppButton = ({ text, icon, styles, addStyles, isLoading = false,  ...attributtes }: AppButtonProps) => {
    useEffect(() => {
        const loadFlyonui = async () => {
            await import('flyonui/flyonui');
            window.HSStaticMethods.autoInit();
        };
        loadFlyonui();
    }, []);


    // styles = `${styles ? styles : defaultStyles} ${addStyles? addStyles : ''}`;
    const [stylesState, setStyles] = useState(styles)
    useEffect(()=>{
        setStyles(`${styles ? styles : defaultStyles} ${addStyles? addStyles : ''}`)
        // setStyles(`${addStyles? addStyles : ''} ${styles ? styles : defaultStyles}`)
    },[])


    return (
        <>
            {/* <button className={styles} {...attributtes}> */}
            <button className={stylesState} {...attributtes}>
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
