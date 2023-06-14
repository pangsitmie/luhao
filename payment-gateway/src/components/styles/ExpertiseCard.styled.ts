import styled from "styled-components";

export const StyledExpertiseCard = styled.div`
    background-color: #1B1B1B;
    padding: 2.4rem 3.5rem;
    border-radius: 2rem;
    border: 1px solid transparent;
    transition: 0.5s ease-in-out;

    &:hover {
        border: 1px solid #61F8D4;
        cursor: default;
    }

    
    @media(max-width: ${({ theme }) => theme.mobile}) {
        padding: 2rem 1.5rem
    }
`