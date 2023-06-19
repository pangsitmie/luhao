import React from 'react'
import { Item } from '../types/Item.types'
import styled from 'styled-components'

import { H2, H3 } from './styles/Typography.styled'
import { RiCopperCoinFill } from 'react-icons/ri'
import { formatTimestamp } from '../utils/Utils'


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



const handleClick = (item_id: number) => {
    console.log("item Id: ", item_id);
}

type Props = {
    createdAt: string,
    orderNo: string,
    item: Item
}

const TransactionItem: React.FC<Props> = ({ createdAt, orderNo, item }: Props) => {
    return (
        <div className="border border-black rounded-xl mb-3 px-4 py-3 flex justify-between items-start">
            <div>
                <H3 className="font-semibold">{formatTimestamp(createdAt)}</H3>
                <span className="text-black text-sm">{orderNo}</span>
            </div>
            <div className="flex flex-col items-end"> {/* Updated class: flex and items-end */}
                <div className="flex items-center gap-1">
                    <H3 className="font-semibold">{item.coin}</H3>
                    <RiCopperCoinFill className="text-xl text-black" />
                </div>
                <span className="text-black text-right">$ {item.amount}</span> {/* Updated class: text-right */}
            </div>
        </div>

    );
};

export default TransactionItem
