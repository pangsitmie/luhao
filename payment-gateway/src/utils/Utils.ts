const viteEnv = import.meta.env.VITE_ENDPOINT;


export const getEndpoint = () => {
    switch (viteEnv) {
        case "main":
            return "https://playground-test.cloudprogrammingonline.com";
        case "qa":
            return "https://playground-test.cloudprogrammingonline.com";
        default:
            return "https://playground-test.cloudprogrammingonline.com";
    }
};

export const getImageUrl = (filename: string) => {
    switch (viteEnv) {
        case "main":
            return `https://playground.cloudprogrammingonline.com/image/${filename}`;
        case "qa":
            return `https://playground-qa.cloudprogrammingonline.com/image/${filename}`;
        default:
            return `https://playground-test.cloudprogrammingonline.com/image/${filename}`;
    }
};

export function formatTimestamp(timestamp: string) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

const input = '2023-06-13T02:52:25.000Z';
const formattedTimestamp = formatTimestamp(input);
console.log(formattedTimestamp);
