import React from 'react'
import { Item } from '../types/Item.types'
import styled from 'styled-components'
import { getImageUrl } from '../utils/Utils'

const StyledItemBox = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0,0,0,0.1);
    border: 1px solid rgba(255,255,255,0.3);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
`

const StyledImage = styled.img`
    height: 80%;
    object-fit: cover;
    margin-bottom: 10px;
`

const StyledCoin = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
`

const StyledText = styled.div`
    text-align: center;
`

const ItemBox: React.FC<Item> = ({ id, name, amount, coin, describe, image_filename }) => {
    return (
        <StyledItemBox>
            <StyledCoin>{coin}</StyledCoin>
            <StyledImage src={getImageUrl(image_filename)} alt={name} />
            <StyledText>
                <h3>{name}</h3>
                <p>{describe}</p>
                <p>{amount} NT</p>
            </StyledText>
        </StyledItemBox>
    )
}

export default ItemBox
