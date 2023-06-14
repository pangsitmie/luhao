import styled from "styled-components";


export const StyledExperienceCard = styled.div`
    background-color: #1B1B1B;
    border-radius: 0 0 2.5rem 2.5rem;
    border: 1px solid #fff;
    height: fit-content;
    transition: 0.5s ease-in-out;

    &:hover {
        border-color: #61F8D4;
        cursor: default;
    }

    & > div:first-child {
        background-color: #fff;
        padding: 2rem;
        border-radius: 0 0 2.5rem 2.5rem;
        box-shadow: 0 2rem 1 rem rgba(0, 0, 0, 0.1);
        margin-bottom: 2rem;
        color: #111;
    }
`