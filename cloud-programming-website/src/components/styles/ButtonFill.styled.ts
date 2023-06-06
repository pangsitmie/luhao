import styled from "styled-components";

export const StyledButtonFill = styled.button`
    border-radius: 50px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 600;
    padding: 1rem 2.5rem;
    transition: all 0.5s ease-in-out;
    background: #272D4D;
    color: #fff;

    & a{
        text-decoration: none;
    }

    &:hover {
        transform: scale(1.02);
        box-shadow: 0 0 10px #cecece;
    }
`
