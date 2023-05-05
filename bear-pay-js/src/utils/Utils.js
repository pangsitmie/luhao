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


const reactEnv = process.env.REACT_APP_ENDPOINT;

function parseImgURL(filename) {
  switch (reactEnv) {
    case "main":
      return `https://file.cloudprogrammingonline.com/files/${filename}?serverId=1&fileType=IMAGE`;
    case "qa":
      return `https://file-qa.cloudprogrammingonline.com/files/${filename}?serverId=1&fileType=IMAGE`;
    default:
      return `https://file-test.cloudprogrammingonline.com/files/${filename}?serverId=1&fileType=IMAGE`;
  }
}

export const getRESTEndpoint = () => {
  switch (reactEnv) {
    case "main":
      return "https://market.cloudprogrammingonline.com/restful";
    case "qa":
      return "https://market-qa.cloudprogrammingonline.com/restful";
    default:
      return "https://market-test.cloudprogrammingonline.com/restful";
  }
};

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




const defaultOptions = {
  significantDigits: '0',
  thousandsSeparator: ',',
  decimalSeparator: '.',
  symbol: 'NT'
}

export const currencyFormatter = (value, options) => {
  if (typeof value !== 'number') value = 0.0
  options = { ...defaultOptions, ...options }
  value = value.toFixed(options.significantDigits)

  const [currency, decimal] = value.split('.')
  return `${options.symbol} ${currency.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    options.thousandsSeparator
  )}`
}

export const numberFormatter = (value, options) => {
  if (typeof value !== 'number') value = 0.0
  options = { ...defaultOptions, ...options }
  value = value.toFixed(options.significantDigits)

  const [number] = value.split('.')
  return `${number.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    options.thousandsSeparator
  )}`
}

export const getCurrentDate = () => {
  const date = new Date()
  const year = date.getFullYear()
  const month = ("0" + (date.getMonth() + 1)).slice(-2)
  const day = ("0" + date.getDate()).slice(-2)

  const hour = ("0" + date.getHours()).slice(-2)
  const minute = ("0" + date.getMinutes()).slice(-2)

  return `${year}-${month}-${day}`
}

export const getYesterdayDate = () => {
  const date = new Date()
  date.setDate(date.getDate() - 1) // subtract 1 day from current date
  const year = date.getFullYear()
  const month = ("0" + (date.getMonth() + 1)).slice(-2)
  const day = ("0" + date.getDate()).slice(-2)

  const hour = ("0" + date.getHours()).slice(-2)
  const minute = ("0" + date.getMinutes()).slice(-2)

  return `${year}-${month}-${day}`
}




export const getTodayEpoch = () => {
  return (new Date(getCurrentDate()).getTime() / 1000);
}
export const getCurrentEpoch = () => {
  return Math.floor(new Date().getTime() / 1000);
}
export const getToday6amEpoch = () => {
  return (new Date(getCurrentDate() + " 06:00:00").getTime() / 1000);
}

export const getWeekAgoDate = () => {
  const date = new Date()
  date.setDate(date.getDate() - 7) // subtract 7 days from current date
  const year = date.getFullYear()
  const month = ("0" + (date.getMonth() + 1)).slice(-2)
  const day = ("0" + date.getDate()).slice(-2)

  const hour = ("0" + date.getHours()).slice(-2)
  const minute = ("0" + date.getMinutes()).slice(-2)

  return `${year}-${month}-${day}`
}

// export const refreshToken = () => {
//   const storedValue = localStorage.getItem('entity');

//   // Parse the stored value from a JSON string to a JavaScript object
//   const entity = JSON.parse(storedValue);
//   console.log("ENTITY: ");
//   console.log(entity);

//   // Access the 'entityName' property of the parsed object
//   const entityName = entity.entityName;
//   console.log("ENTITY NAME: ");
//   console.log(entityName);


//   if (entityName === "brand") {
//     query = gql`
//             query getBrandPrincipalWebAccessToken($refreshToken: String!) {
//               getBrandPrincipalWebAccessToken(refreshToken: $refreshToken)
//             }
//           `;

//     reponseTokenPath = "getBrandPrincipalWebAccessToken";
//     console.log("BRAND QUERY");
//   }
//   else if (entityName === "store") {
//     query = gql`
//             query Query($refreshToken: String!) {
//               getStorePrincipalWebAccessToken(refreshToken: $refreshToken)
//             }
//           `;

//     reponseTokenPath = "getStorePrincipalWebAccessToken";
//     console.log("STORE QUERY");
//   }
//   else {
//     query = gql`
//             query GetManagerAccessToken($refreshToken: String!) {
//               getManagerAccessToken(refreshToken: $refreshToken)
//             }
//           `;

//     reponseTokenPath = "getManagerAccessToken";
//     console.log("COMPANY QUERY");
//   }
//   console.log("QUERY: ");
//   console.log(query);
// }