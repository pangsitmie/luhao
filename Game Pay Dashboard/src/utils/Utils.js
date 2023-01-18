import {
    default_ads_image_900x360_filename,
    default_billboard_image_600x600_filename,
    default_cover_900x300_filename,
    default_logo_360x360_filename
} from "../data/strings";

// export function replaceNullWithEmptyString(obj) {
//     const newObj = {};
//     for (let prop in obj) {
//         if (obj[prop] === null) {
//             newObj[prop] = '';
//         } else {
//             newObj[prop] = obj[prop];
//         }
//     }
//     return newObj;
// }
export function replaceNullWithEmptyString(obj) {
    const newObj = Object.assign({}, obj);
    Object.keys(newObj).forEach(key => {
        if (newObj[key] && typeof newObj[key] === 'object')
            newObj[key] = replaceNullWithEmptyString(newObj[key]);
        else if (newObj[key] === null)
            newObj[key] = "";
    });
    return newObj;
}



export function unixTimestampToDatetimeLocal(timestamp) {
    const date = new Date(timestamp * 1000);
    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);
    const hours = `0${date.getHours()}`.slice(-2);
    const minutes = `0${date.getMinutes()}`.slice(-2);
    return `${year}-${month}-${day}T${hours}:${minutes}`;
}

function parseImgURL(filename) {
    return `https://file-test.cloudprogrammingonline.com/files/${filename}?serverId=1&fileType=IMAGE`;
    // return `https://file.cloudprogrammingonline.com/files/${filename}?serverId=1&fileType=IMAGE`;
}

export function getImgURL(filename, type) {
    if (filename === null || filename === undefined || filename === '' || filename === 'null')
        switch (type) {
            case 'logo':
                return parseImgURL(default_logo_360x360_filename);
            case 'cover':
                return parseImgURL(default_cover_900x300_filename);
            case 'billboard':
                return parseImgURL(default_billboard_image_600x600_filename);
            case 'ads':
                return parseImgURL(default_ads_image_900x360_filename);
        }
    else
        return parseImgURL(filename);
}
