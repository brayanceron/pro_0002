let songLinks = [];
let fileObj = {
    song: [],
    song_gender : [],
    song_language : [],
    song_singer : [],
};


let tagsA = document.querySelectorAll("#wc-endpoint");

function getSongName(item){
    try {
        let c = item.children;
        // let c2 = item[0].children;
        let c2 = c[0].children;
        let c3 = c2[2].children;
        let c4 = c3[1];
        // let songName = c4.innerText
        return c4.innerText
    } catch (error) {
        return null
    }
}

tagsA.forEach(item => {
    let url = item.href
    // songLinks.push(link);
    songLinks.push({url, name : getSongName(item)});

    
});



songLinks.forEach(element => {
    const id = crypto.randomUUID()
    fileObj.song.push({
        id: id, 
        // name: "",
        name: element.name ? element.name : "unknown song",
        description: "",
        // url: element,
        url: element.url,
        goal: "-1.0",
        image: "",
        user_id: "yooo",
        available: 1
    });
    fileObj.song_gender.push({song_id : id, gender_id : 'unknown'});
    fileObj.song_language.push({song_id : id, language_id : 'unknown'});
    fileObj.song_singer.push({song_id : id, singer_id : 'unknown'});
});


const saveFile = (contenido, nombre) => {
    const a = document.createElement("a");
    const archivo = new Blob([contenido], { type: 'text/json' }); // const archivo = new Blob([contenido], { type: 'text/html' });
    const url = URL.createObjectURL(archivo);
    a.href = url;
    a.download = nombre;
    a.click();
    URL.revokeObjectURL(url);
}

const stringFile = JSON.stringify(fileObj);
saveFile(stringFile, "PlayListBk.json");