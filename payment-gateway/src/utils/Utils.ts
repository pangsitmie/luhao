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