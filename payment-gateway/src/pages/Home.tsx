import { useEffect, useState } from "react"
import { H3 } from "../components/styles/Typography.styled"
import { getEndpoint } from "../utils/Utils"
import axios from "axios";
import { toast } from "react-toastify";
import { div } from "three/examples/jsm/nodes/Nodes.js";
import ItemBox from "../components/ItemBox";

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
    // check for any token in local storage
    // if no token, redirect to login
    // if token, redirect to home

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
                console.error('Error:', error);
                toast.error("Error occurred during API call.");
            }

            retryCount++;
            console.log(`Retrying API call (attempt ${retryCount})...`);

            if (retryCount > 0) {
                await new Promise((resolve) => setTimeout(resolve, 1500)); // Wait for 1 second before retrying
            }
        }

        if (retryCount === MAX_RETRY_ATTEMPTS) {
            console.log(`Maximum retry attempts (${MAX_RETRY_ATTEMPTS}) exceeded.`);
            toast.error("Maximum retry attempts exceeded. Login Failed");
        }
    };

    useEffect(() => {
        getRechargeItemList();
    }, []);


    return (
        <div>
            <div className="grid grid-cols-2 p-8">
                <div className="p-20">
                    <div className="pb-12">
                        <H3>
                            Hi there,<br /> John Doe
                        </H3>
                    </div>
                    <div>
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