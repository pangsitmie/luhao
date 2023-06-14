import styled from "styled-components";


export const StyledHeroSocials = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    position: absolute;
    left: 0;
    bottom: 0;
    font-size: 1.5rem;
    color: #61F8D4;

    &::after {
        content: "";
        width: 1px;
        height: 2rem;
        background-color: #61F8D4;
        cursor: normal;
    }
    & a:hover {
        color: #FFF;
    }

    @media(max-width: ${({ theme }) => theme.mobile}) {
        display: none;
    }
`