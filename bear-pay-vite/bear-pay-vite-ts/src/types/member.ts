type Member = {
    id: number;
    status: string;
    profile: {
        nickname: string;
        birthday: string;
        avatar: string;
    };
    phone: {
        number: string;
    };
    career: {
        continuousSignDays: string;
        totalSignDays: string;
        lastSignAt: string;
    };
};

export default Member;
