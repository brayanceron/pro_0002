const getYouYubeVideoId = (url: string): string | null => {
    // if(!url.includes("youtube") ) return null
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
};

// TODO simplify functions: 'get...()' and 'is...()' sould reduce to one function

function isValidYouTubeUrl(url: string): boolean {
    if (!url || typeof url !== 'string') { return false; }

    // TODO add support to youtubemusic urls
    //  valid URLs YouTube
    const youtubePatterns = [
        // https://www.youtube.com/watch?v=VIDEO_ID
        /^https?:\/\/(www\.)?youtube\.com\/watch\?v=[\w-]{11}(&.*)?$/,

        // https://youtu.be/VIDEO_ID
        /^https?:\/\/youtu\.be\/[\w-]{11}(\?.*)?$/,

        // https://www.youtube.com/embed/VIDEO_ID
        // /^https?:\/\/(www\.)?youtube\.com\/embed\/[\w-]{11}(\?.*)?$/,

        // https://m.youtube.com/watch?v=VIDEO_ID (móvil)
        // /^https?:\/\/m\.youtube\.com\/watch\?v=[\w-]{11}(&.*)?$/,

        // https://youtube.com/watch?v=VIDEO_ID (sin www)
        /^https?:\/\/youtube\.com\/watch\?v=[\w-]{11}(&.*)?$/
    ];

    return youtubePatterns.some(pattern => pattern.test(url));
}
function isValidSrcUrl(url : string, ) : boolean {
    if (!url || typeof url !== 'string') { return false; }

    const domain = "localhost:5000";
    const escapedDomain = domain.replace(/\./g, '\\.');

    const urlRegex = new RegExp(
        `^(http|https):\\/\\/(www\\.)?${escapedDomain}(\\/|\\?|$)(.*)$`,
        'i' // i para que la búsqueda no sea sensible a mayúsculas/minúsculas
    );
    return urlRegex.test(url);
}
function isExternalImg(url: string): boolean {
    // const re = /^(https?:\/\/)?([^\s\/?#]+)(\/[^\s?#]*)?\.(jpg|jpeg|png|gif|bmp|webp|svg)(\?[^\s#]*)?(#.*)?$/i; //gpt5 mini
    const re = /^https?:\/\/([a-zA-Z0-9.-]+|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(:\d+)?(\/[^\s]*?)?\.(jpg|jpeg|png|gif|bmp|svg|webp|ico|tiff?)(\?.*)?$/i;
    // const re = /^https?:\/\/.+\.(jpg|jpeg|png|gif|bmp|svg|webp|ico|tiff?)(\?.*)?$/i; //cloude

    return re.test(url);
}
function getUrlBySong(file_string: string, folderPath: string = '') {
    if (isValidYouTubeUrl(file_string)) return file_string;
    else return getUrlBySrc(file_string, folderPath)
}
function getUrlBySrc(file_id: string, folderPath: string = '') { //folder path must contain "/folder/subfolder..."
    return `http://localhost:5000/static${folderPath && ''}/${file_id}`
}
function getImageUrlByYTVideo(url: string) { //folder path must contain "/folder/subfolder..."
    return `https://i.ytimg.com/vi/${getYouYubeVideoId(url)}/hq720.jpg`;
}
function getImageUrl(url: string): string {
    if(!url) return ' ';
    // TODO to do tests to this function
    if(isValidYouTubeUrl(url)) return getImageUrlByYTVideo(url);
    else if(isExternalImg(url)) return url;
    // else return getUrlBySrc(url);
    else {
        const backUrl = getUrlBySrc(url);
        if(isExternalImg(backUrl)) return backUrl;
        // return null;
        return ' '; // 1 space, empty is error
    }
}
export {
    getYouYubeVideoId,
    isValidYouTubeUrl,
    isValidSrcUrl,
    getUrlBySrc,
    getImageUrlByYTVideo,
    getImageUrl,
    getUrlBySong
}