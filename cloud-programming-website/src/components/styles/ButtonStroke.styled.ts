import styled from "styled-components";

export const StyledButtonStroke = styled.button`
    border-radius: 50px;
    border: 2px solid #FFF;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 600;
    padding: 1rem 2.5rem;
    background-color: transparent;
    color: ${({ color }) => color || "#FFF"};
    transition: all 0.5s ease-in-out;

    & a{
        color: #fff;
        text-decoration: none;
    }

    &:hover {
        transform: scale(1.02);
        box-shadow: 0 0 10px #fff;
    }
`
