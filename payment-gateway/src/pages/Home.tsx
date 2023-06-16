import { useEffect, useState } from "react"
import { H1, H3 } from "../components/styles/Typography.styled"
import { getEndpoint } from "../utils/Utils"
import axios from "axios";
import { toast } from "react-toastify";
import ItemBox from "../components/ItemBox";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import COIN_ICON from '../assets/coin_icon.png'

type Items = {
    id: number;
    amount: number;
    coin: number;
    describe: string;
    image_filename: string;
    name: string;
    status: number;
}

const Home = () => {
    const navigate = useNavigate();

    const memberId = useSelector((state: RootState) => state.user.member_id);


    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [isTablet, setIsTablet] = useState(window.innerWidth < 1024);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            setIsTablet(window.innerWidth < 1024);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const token = localStorage.getItem("token")
    useEffect(() => {
        if (token === '') {
            console.log("no token")
            window.location.href = "/login"
        }
        else {

        }
    }, [token])


    const [itemList, setItemList] = useState<Items[]>([]);
    const [balance, setBalance] = useState(0);

    const getRechargeItemList = async () => {
        console.log("REST_FetchMachineList");
        const MAX_RETRY_ATTEMPTS = 3;
        let retryCount = 0;

        while (retryCount < MAX_RETRY_ATTEMPTS) {
            try {
                const URI = `${getEndpoint()}/recharge/v1/item`;

                const response = await axios.get(URI, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "application/json",
                    },
                });
                console.log(response);
                if (response.data && response.data.data) {
                    console.log(response.data.data);
                    setItemList(response.data.data);
                    break; // Exit the loop if the API call was successful
                }
            } catch (error) {
                toast.error("an Error occurred.");
            }

            retryCount++;
            console.log(`Retrying API call (attempt ${retryCount})...`);

            if (retryCount > 0) {
                await new Promise((resolve) => setTimeout(resolve, 1500)); // Wait for 1 second before retrying
            }
        }

        if (retryCount === MAX_RETRY_ATTEMPTS) {
            toast.error("Please try again later.");
            navigate("/");
        }
    };

    // const getUserDetails = async () => {
    //     console.log("REST_FetchMachineList");
    //     const MAX_RETRY_ATTEMPTS = 3;
    //     let retryCount = 0;

    //     while (retryCount < MAX_RETRY_ATTEMPTS) {
    //         try {
    //             const URI = `${getEndpoint()}/recharge/v1/item`;

    //             const response = await axios.get(URI, {
    //                 headers: {
    //                     Authorization: `Bearer ${localStorage.getItem("token")}`,
    //                     "Content-Type": "application/json",
    //                 },
    //             });
    //             console.log(response);
    //             if (response.data && response.data.data) {
    //                 console.log(response.data.data);
    //                 setItemList(response.data.data);
    //                 break; // Exit the loop if the API call was successful
    //             }
    //         } catch (error) {
    //             toast.error("an Error occurred.");
    //         }

    //         retryCount++;
    //         console.log(`Retrying API call (attempt ${retryCount})...`);

    //         if (retryCount > 0) {
    //             await new Promise((resolve) => setTimeout(resolve, 1500)); // Wait for 1 second before retrying
    //         }
    //     }

    //     if (retryCount === MAX_RETRY_ATTEMPTS) {
    //         toast.error("Please try again later.");
    //         navigate("/");
    //     }
    // };

    const getUserBalance = async () => {
        if (memberId) {
            console.log("REST_FetchMachineList");
            const MAX_RETRY_ATTEMPTS = 3;
            let retryCount = 0;

            while (retryCount < MAX_RETRY_ATTEMPTS) {
                try {
                    const URI = `${getEndpoint()}/member/${memberId}/v1/balance`;

                    const response = await axios.get(URI, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                            "Content-Type": "application/json",
                        },
                    });
                    console.log(response);
                    if (response.data && response.data.data) {
                        console.log("BALANCE RESPONSE: ")
                        console.log(response.data.data);
                        setBalance(response.data.data.balance);
                        break; // Exit the loop if the API call was successful
                    }
                } catch (error) {
                    toast.error("an Error occurred.");
                }

                retryCount++;
                console.log(`Retrying API call (attempt ${retryCount})...`);

                if (retryCount > 0) {
                    await new Promise((resolve) => setTimeout(resolve, 1500)); // Wait for 1 second before retrying
                }
            }

            if (retryCount === MAX_RETRY_ATTEMPTS) {
                toast.error("Please try again later.");
                navigate("/");
            }
        }
    };




    useEffect(() => {
        getRechargeItemList();
        // getUserDetails();
        getUserBalance();;
    }, []);


    return (
        <div>
            <div className="">
                <div className="p-[8%]">
                    <div className="pb-12">

                        <div className='absolute top-3 right-2 font-bold text-xl flex items-center justify-center'>
                            <H3>
                                Balance: {balance}
                            </H3>
                            <img src={COIN_ICON} alt="" className='h-[24px] flex-shrink-0 object-contain' />
                        </div>

                    </div>
                    <div className={`${isMobile ? 'py-12' : 'pb-12'}`}>
                        <H1>
                            Recharge
                        </H1>
                        <p className="mt-2">
                            Purchase special packs to claim great value and precious rewards
                        </p>
                    </div>

                    <div className={`${isMobile ? 'flex flex-col' : (isTablet ? 'grid grid-cols-2' : 'grid grid-cols-4')} gap-4`}>
                        {itemList.map((item) => (
                            <ItemBox key={item.id} {...item} />
                        ))}
                    </div>
                </div>
            </div>
        </div>

    )
}
export default Home