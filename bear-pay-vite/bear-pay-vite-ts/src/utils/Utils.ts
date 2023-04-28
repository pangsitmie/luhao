import LOGO_IMG_PLACEHOLDER from "../assets/logo_img_placeholder.png";
import COVER_IMG_PLACEHOLDER from "../assets/cover_img_placeholder900x300.png";
import ADS_IMG_PLACEHOLDER from "../assets/cover_img_placeholder900x300.png";
import BILLBOARD_IMG_PLACEHOLDER from "../assets/billboard_img_placeholder600x600.png";

export function replaceNullWithEmptyString(obj: { [key: string]: any }): { [key: string]: any } {
  const newObj: { [key: string]: any } = { ...obj };
  Object.keys(newObj).forEach((key) => {
    if (newObj[key] && typeof newObj[key] === "object")
      newObj[key] = replaceNullWithEmptyString(newObj[key]);
    else if (newObj[key] === null) newObj[key] = "";
  });
  return newObj;
}


export function unixTimestampToDatetimeLocal(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  const year = date.getFullYear();
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const day = `0${date.getDate()}`.slice(-2);
  const hours = `0${date.getHours()}`.slice(-2);
  const minutes = `0${date.getMinutes()}`.slice(-2);
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}



const viteEnv = import.meta.env.VITE_ENDPOINT;

function parseImgURL(filename: string) {
  switch (viteEnv) {
    case "main":
      return `https://file.cloudprogrammingonline.com/files/${filename}?serverId=1&fileType=IMAGE`;
    case "qa":
      return `https://file-qa.cloudprogrammingonline.com/files/${filename}?serverId=1&fileType=IMAGE`;
    default:
      return `https://file-test.cloudprogrammingonline.com/files/${filename}?serverId=1&fileType=IMAGE`;
  }
}

export const getRESTEndpoint = () => {
  switch (viteEnv) {
    case "main":
      return "https://market.cloudprogrammingonline.com/restful";
    case "qa":
      return "https://market-qa.cloudprogrammingonline.com/restful";
    default:
      return "https://market-test.cloudprogrammingonline.com/restful";
  }
};

export function getImgURL(filename: string, type: string) {
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




// const defaultOptions = {
//   significantDigits: '0',
//   thousandsSeparator: ',',
//   decimalSeparator: '.',
//   symbol: 'NT'
// }

// export const currencyFormatter = (value, options) => {
//   if (typeof value !== 'number') value = 0.0
//   options = { ...defaultOptions, ...options }
//   value = value.toFixed(options.significantDigits)

//   const [currency, decimal] = value.split('.')
//   return `${options.symbol} ${currency.replace(
//     /\B(?=(\d{3})+(?!\d))/g,
//     options.thousandsSeparator
//   )}`
// }

// export const numberFormatter = (value, options) => {
//   if (typeof value !== 'number') value = 0.0
//   options = { ...defaultOptions, ...options }
//   value = value.toFixed(options.significantDigits)

//   const [number] = value.split('.')
//   return `${number.replace(
//     /\B(?=(\d{3})+(?!\d))/g,
//     options.thousandsSeparator
//   )}`
// }


interface NumberFormatterOptions {
  thousandsSeparator: string;
}

const defaultNumberFormatterOptions: NumberFormatterOptions = {
  thousandsSeparator: ',',
};

export function numberFormatter(value: number, options?: NumberFormatterOptions): string {
  if (typeof value !== 'number') value = 0;
  options = { ...defaultNumberFormatterOptions, ...options };
  const [integer, decimal = ''] = value.toFixed(0).split('.');
  return `${integer.replace(/\B(?=(\d{3})+(?!\d))/g, options.thousandsSeparator)}`;
}

interface CurrencyFormatterOptions extends NumberFormatterOptions {
  symbol: string;
}

const defaultCurrencyFormatterOptions: CurrencyFormatterOptions = {
  symbol: 'NT',
  thousandsSeparator: ',',
};

export function currencyFormatter(value: number, options?: CurrencyFormatterOptions): string {
  if (typeof value !== 'number') value = 0;
  options = { ...defaultCurrencyFormatterOptions, ...options };
  const [integer] = value.toFixed(0).split('.');
  return `${options.symbol} ${integer.replace(/\B(?=(\d{3})+(?!\d))/g, options.thousandsSeparator)}`;
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
