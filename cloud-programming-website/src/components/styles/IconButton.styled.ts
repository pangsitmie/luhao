import styled from "styled-components";

export const IconButtonStyled = styled.button`
    background-color: transparent;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    outline: none;
    padding: .8rem;
    transition: all 0.2s ease-in-out;


    &:hover {
        transform: scale(1.05);
        background-color: rgba(0, 0, 0, 0.1);
    }

    &:active {
        transform: scale(0.9);
    }
`;