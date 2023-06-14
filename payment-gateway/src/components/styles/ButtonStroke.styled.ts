import styled from "styled-components";

export const StyledButtonStroke = styled.button`
    border-radius: 50px;
    border: 4px solid #ffffff;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 600;
    padding: .5rem 2.4rem;
    background-color: transparent;
    color: ${({ color }) => color || "#FFF"};
    transition: all 0.3s ease-in-out;

    & a{
        color: #fff;
        text-decoration: none;
    }

    &:hover {
        transform: scale(1.05);
        border-color: #61F8D4;
        box-shadow: 0 0 10px #61F8D4;
    }
`
