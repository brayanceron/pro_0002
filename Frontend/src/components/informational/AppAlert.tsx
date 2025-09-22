import { useEffect, useState } from "react";

type PropsComponent = { 
    title?: string,
    message: string,
    color?: string,
    icon?: string,
    soft?: boolean,
    outline?: boolean,
    addStyles? : string,
}

const AppAlert = ({ title = "Title", message, color = 'primary', icon = "check", soft = false, outline = false, addStyles }: PropsComponent) => {
    const [configs, setConfigs] = useState({title, message, color, icon, soft, outline});
    // const [configs, setConfigs] = useState({ title: '', message: '', color: '', icon: '', soft, outline });
    useEffect(() => { setConfigs({ title, message, color, icon, soft, outline }); }, [])


    return (
        // <div className={`alert alert-error ${configs.soft ? 'alert-soft' : ''} flex items-start gap-4 ${configs.outline ? 'alert-outline' : ''} `} role="alert">
        <div className={`alert alert-${configs.color} ${configs.soft? 'alert-soft' : ''} flex items-start gap-4 ${configs.outline? 'alert-outline':''} ${addStyles}`} role="alert">
            <span className={`icon-[tabler--${configs.icon}] size-6`}></span>
            <div className="flex flex-col gap-1">
                <h5 className="text-lg font-semibold">{configs.title}</h5>
                <p>{configs.message}</p>
            </div>
        </div>
    );
}

export { AppAlert }