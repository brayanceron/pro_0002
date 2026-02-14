import type { SyntheticEvent } from "react";
import { getImageUrl } from "../utils/urls";

import imgErrorFile from "../assets/default/imgError.png";
import defaultImgFile from "../assets/default/defaultImg.png";
// import defaultImage2 from "../assets/default/defaultImage.png";

const AppImage = ({ imageUrl, defaultImage = defaultImgFile, alt = "Error load image", addStyles = '' }: { imageUrl: string, defaultImage?: string, alt?: string, addStyles?: string }) => {

    // TODO function getImageUrl should fail if image format is wrong
        // BUG images of assets folder are differents to images url of backend and external images url

    const imgErr = (event: SyntheticEvent) => {
        console.log("SE PRESENTO UN ERROR***")
        const imgTag = event.target as HTMLImageElement;
        imgTag.src = imgErrorFile;
    }
    
    console.log("imgErrorFile => ", imgErrorFile);
    console.log("defaultImgFile => ", defaultImgFile);
    console.log("getImageUrl()", getImageUrl(imageUrl))
    console.log("imageUrl >> ", imageUrl)
    
    return (
        <>
            <img src={imageUrl ? getImageUrl(imageUrl) : defaultImage}
                className={`mask mask-decagon m-auto size-44 ${addStyles}`}  // className={`mask mask-decagon m-auto size-44 ${addStyles? addStyles : ''}`}
                alt={alt}
                onError={imgErr}
            />
        </>
    )
}

export { AppImage }
