import { useEffect, useState } from "react"
import { H1, H2, H3 } from "../components/styles/Typography.styled"
import { getEndpoint } from "../utils/Utils"
import axios from "axios";
import { toast } from "react-toastify";
import RechargeItem from "../components/RechargeItem";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
// import COIN_ICON from '../assets/coin_icon.png'
import { RiCopperCoinFill } from 'react-icons/ri'
import TransactionItem from "../components/TransactionItem";
import { Transaction } from "../types/Transaction.tyles";

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
    const [tranactionHistories, setTranactionHistories] = useState<Transaction[]>([])

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

    const getUserDetails = async () => {
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

    const getUserTransactionHistory = async () => {
        if (memberId) {
            console.log("REST_FetchMachineList");
            const MAX_RETRY_ATTEMPTS = 3;
            let retryCount = 0;

            while (retryCount < MAX_RETRY_ATTEMPTS) {
                try {
                    const URI = `${getEndpoint()}/member/${memberId}/v1/recharge-records`;

                    const response = await axios.get(URI, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                            "Content-Type": "application/json",
                        },
                    });
                    console.log(response);
                    if (response.data && response.data.data) {
                        console.log("recharge-records RESPONSE: ")
                        console.log(response.data.data);
                        setTranactionHistories(response.data.data);
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
        getUserBalance();
        getUserTransactionHistory();
    }, []);


    return (
        <div>
            <div className="px-[5%] py-[5%]">
                <div className={`${isMobile ? 'py-12' : 'pb-12'}`}>
                    <H1>
                        Recharge
                    </H1>
                    <p className="mt-2">
                        Purchase special packs to claim great value and precious rewards
                    </p>
                </div>

                <div className={`${isMobile ? 'flex flex-col' : (isTablet ? 'flex flex-col' : 'flex')} gap-4`}>
                    {/* transaction histories */}
                    <div className={`${(isMobile || isTablet) ? '' : 'w-[40%]'} text-black`}>
                        <div className="bg-primary-100  rounded-[25px] p-4">
                            <div className="bg-[#111] rounded-[15px] w-full py-3 px-6 flex items-center  justify-between">
                                <div className="flex items-center gap-2 text-primary-100">
                                    <H3>
                                        Available Balance
                                    </H3>
                                </div>

                                <div className="flex items-center gap-2">
                                    <H3 className="text-white">
                                        {balance}
                                    </H3>
                                    <RiCopperCoinFill className="text-xl text-white" />
                                </div>
                            </div>
                            <div className="mt-10 p-1">
                                <div>
                                    <H2>
                                        Transaction History
                                    </H2>
                                </div>
                                <div className="h-[300px] mt-4 overflow-auto pr-1">
                                    {tranactionHistories.slice().reverse().map((item) => (
                                        <TransactionItem key={item.id} createdAt={item.created_at} orderNo={item.order_no} item={item.item} />
                                    ))}

                                </div>
                            </div>
                        </div>
                    </div>

                    {/* item list */}
                    <div className={`${isMobile ? 'flex flex-col' : (isTablet ? 'grid grid-cols-2' : 'w-[60%] grid grid-cols-3')} gap-4`}>
                        {itemList.map((item) => (
                            <RechargeItem key={item.id} {...item} />
                        ))}
                    </div>
                </div>


            </div>
        </div>

    )
}
export default Home