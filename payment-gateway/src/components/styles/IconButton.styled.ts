import styled from "styled-components";

export const IconButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    color: #333;
    transition: background-color 0.3s;

    &:hover {
    background-color: rgba(255, 255, 255, 0.3);
    }
`;