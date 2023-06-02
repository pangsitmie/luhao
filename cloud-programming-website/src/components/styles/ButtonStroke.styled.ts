import styled from "styled-components";

export const StyledButtonStroke = styled.button`
    border-radius: 50px;
    border: 2px solid #111;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 600;
    padding: .5rem 2.4rem;
    background-color: transparent;
    color: ${({ color }) => color || "#111"};
    transition: all 0.3s ease-in-out;

    & a{
        color: #fff;
        text-decoration: none;
    }

    &:hover {
        transform: scale(1.05);
        border-color: #111;
        box-shadow: 0 0 10px #111;
    }
`
