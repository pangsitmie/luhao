import LOGO_IMG_PLACEHOLDER from "../assets/logo_img_placeholder.png";
import COVER_IMG_PLACEHOLDER from "../assets/cover_img_placeholder900x300.png";
import ADS_IMG_PLACEHOLDER from "src/assets/ads_img_placeholder900x360.png";
import BILLBOARD_IMG_PLACEHOLDER from "src/assets/billboard_img_placeholder600x600.png";

export function replaceNullWithEmptyString(obj) {
  const newObj = Object.assign({}, obj);
  Object.keys(newObj).forEach((key) => {
    if (newObj[key] && typeof newObj[key] === "object")
      newObj[key] = replaceNullWithEmptyString(newObj[key]);
    else if (newObj[key] === null) newObj[key] = "";
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
  // return `https://file-qa.cloudprogrammingonline.com/files/${filename}?serverId=1&fileType=IMAGE`;
  // return `https://file.cloudprogrammingonline.com/files/${filename}?serverId=1&fileType=IMAGE`;
}

export function getImgURL(filename, type) {
  if (
    filename === null ||
    filename === undefined ||
    filename === "" ||
    filename === "null"
  )
    switch (type) {
      case "logo":
        return LOGO_IMG_PLACEHOLDER;
      case "cover":
        return COVER_IMG_PLACEHOLDER;
      case "billboard":
        return BILLBOARD_IMG_PLACEHOLDER;
      case "ads":
        return ADS_IMG_PLACEHOLDER;
    }
  else return parseImgURL(filename);
}
