const getYouYubeVideoId = (url: string): string | null => {
    // if(!url.includes("youtube") ) return null
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
};

/* function isYtuRl(url: string) {
    return url.includes("youtube.com");
} */

function isValidYouTubeUrl(url: string): boolean {
    if (!url || typeof url !== 'string') {
        return false;
    }

    // Patrones de URLs de YouTube válidas
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

function getUrlBySong(file_string : string,  folderPath: string = ''){
    if(isValidYouTubeUrl(file_string)) return file_string;
    else return getUrlBySrc(file_string, folderPath)
}
function getUrlBySrc(file_id: string, folderPath: string = '') { //folder path must contain "/folder/subfolder..."
    return `http://localhost:5000/static${folderPath && ''}/${file_id}`
}
function getImageUrlByYTVideo(url: string) { //folder path must contain "/folder/subfolder..."
    return `https://i.ytimg.com/vi/${getYouYubeVideoId(url)}/hq720.jpg`;
}
function getImageUrl(url: string) {
    if(isValidYouTubeUrl(url)) return getImageUrlByYTVideo(url);
    else return getUrlBySrc(url)
}
export {
    getYouYubeVideoId,
    isValidYouTubeUrl,
    getUrlBySrc,
    getImageUrlByYTVideo,
    getImageUrl,
    getUrlBySong
}