import React from 'react'
import { Item } from '../types/Item.types'
import styled from 'styled-components'
import { getEndpoint, getImageUrl } from '../utils/Utils'
import axios from 'axios'
import COIN_ICON from '../assets/coin_icon.png'
import { H2, H3 } from './styles/Typography.styled'


const StyledItemBox = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 12px;
    box-shadow: 0px 0px 10px rgba(255,255,255,0.1);
    border: 1px solid rgba(255,255,255,0.3);
    cursor: pointer;
    transition: all 0.5s ease-in-out;

    &:hover {
        border: 1px solid rgba(255,255,255,0.5);
        box-shadow: 0px 0px 10px rgba(255,255,255,0.5);
        scale: 1.05;
    }
`

const StyledImage = styled.img`
    object-fit: cover;
    padding: 20% 12% 12% 12%;
`




const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.src = COIN_ICON; // Set the default image source
};

const createOrder = async (item_id: number) => {
    axios.post(`${getEndpoint()}/recharge/v1/create-order`, {
        item_id: item_id
    }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
            credentials: 'include'
        },
    }).then((response) => {
        console.log(response.data.data)
        if (response.data.data) {
            const { merchant_id, trade_info, trade_sha, version } = response.data.data;

            // Create form
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = 'https://ccore.newebpay.com/MPG/mpg_gateway';
            form.target = '_blank';  // Optional: Open in a new tab

            // Add input fields
            const fields = {
                'MerchantID': merchant_id,
                'TradeInfo': trade_info,
                'TradeSha': trade_sha,
                'Version': version
            }

            for (const [name, value] of Object.entries(fields)) {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = name;
                input.value = value;
                form.appendChild(input);
            }

            // Append form to body and submit
            document.body.appendChild(form);
            form.submit();

        }
    }).catch((error) => {
        console.log(error)
    })
};


const handleClick = (item_id: number) => {
    console.log("item Id: ", item_id);
    createOrder(item_id);
}

const ItemBox: React.FC<Item> = ({ id, name, amount, coin, describe, image_filename }) => {
    return (
        <StyledItemBox
            onClick={() => handleClick(id)}
        >
            <div className='absolute top-3 right-2 font-bold text-xl flex items-center justify-center'>
                {coin}
                <img src={COIN_ICON} alt="" className='h-[24px] flex-shrink-0 object-contain' />
            </div>
            <StyledImage
                src={getImageUrl(image_filename)}
                alt={name}
                onError={handleImageError}
            />
            <div className='px-4 pb-4'>
                <H3 className='font-semibold'>{name}</H3>
                <span className='text-indigo-100'>{describe}</span>

                <H2 className='font-bold mt-4 text-primary-100'>${amount}</H2>
            </div>
        </StyledItemBox>
    )
}

export default ItemBox

// {
//     "merchant_id": "MS348991020",
//     "trade_info": "b54db5d09126c5e6b996ba2f95b3127d8bcc3f5271c0c6a9504ba28092a3871977071935d60815bbe7810148256e9cd4ab1cbecb3439a386673f7728a0f95de7df065666ee5ecffcc7552b279836ada5c68399ea8f6a4da7891aeb3e6b9bbfbf6f8e4a7eb66f24ff36cff77d2bd4f32848fa9a7c60d13f99379ae2da5c7ea02036e26ab71b73bd69b7c397e5f364f2a0f38ca150335521adeb6a358ed6fc0389baa51d20a53f2c84dfd1f89467d3f495f268a126845a3cabf25ef8eb5854c4ed00fce042548df49791ebcf98b98cbf38970ca1db5b586b8ca70b84d1df8e2836a742d9ce0bde2b2fe89569a9228bde43c59185861582915c2d37f24d47a57dc7690346e27ffd0c527fb9bdcfdb9c368500e1dfa6e226178101b53a7f8c5539da",
//     "trade_sha": "0DE9CFDE8A7FBD902BB3FCC71ACDDDB39FE391B4601DC8D24AC7F8B127279DD5",
//     "version": "2.0"
// }