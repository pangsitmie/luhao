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