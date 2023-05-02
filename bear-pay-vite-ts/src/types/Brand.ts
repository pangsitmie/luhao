type Brand = {
    id: string;
    status: string;
    name: string;
    intro: string;
    logo: string;
    cover: string;
    vatNumber: string;
    currency: {
        id: number;
        name: string;
        type: string;
    };
    principal: {
        id: number;
        name: string;
        email: string;
        phone: string;
        lineUrl: string;
    }

};

export default Brand;
