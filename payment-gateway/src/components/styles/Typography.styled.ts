import styled from 'styled-components'

export const H1 = styled.h1`
    font-size: 3.5rem;
    font-weight: 700;
    line-height: 1.2;

    @media(max-width: ${({ theme }) => theme.mobile}) {
        font-size: 12vw;
    }
`

export const H2 = styled.h2`
    font-size: 2rem;
    font-weight: 700;

    @media(max-width: ${({ theme }) => theme.mobile}) {
        font-size: 10vw;
    }
`

export const H3 = styled.h3`
    font-size: 1.3rem;

    @media(max-width: ${({ theme }) => theme.mobile}) {
        font-size: 6vw;
    }
`