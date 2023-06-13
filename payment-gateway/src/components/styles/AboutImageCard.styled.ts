import styled from "styled-components";

export const StyledAboutImageCard = styled.div`
    margin-top: 5rem;
    width: 100%;
    height: fit-content;
    border-radius: 2rem;
    background: linear-gradient(45deg, transparent, #61F8D4, transparent);
    display: grid;
    place-items: center;

    & > div{
        border-radius: 2rem;
        width: 100%;
        overflow: hidden;
        transform: rotate(10deg);
        transition: 0.5s ease-in-out;
    }

    & > div:hover{
        transform: rotate(0deg);
        transition: 0.5s ease-in-out;
    }
`