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
            return `https://file.cloudprogrammingonline.com/files/${filename}?serverId=1&fileType=IMAGE`;
        case "qa":
            return `https://file-qa.cloudprogrammingonline.com/files/${filename}?serverId=1&fileType=IMAGE`;
        default:
            return `https://file-test.cloudprogrammingonline.com/files/${filename}?serverId=1&fileType=IMAGE`;
    }
};