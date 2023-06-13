import styled from "styled-components";

export const StyledButtonFill = styled.button`
    width: 100%;
    border-radius: 12px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 600;
    padding: .8rem 2.4rem;
    background-color: #fff;
    color: #111;
    transition: all 0.3s ease-in-out;

    & a{
        color: #111;
        text-decoration: none;
    }

    &:hover {
        transform: scale(1.05);
        box-shadow: 0 0 10px #61F8D4;
    }
`
