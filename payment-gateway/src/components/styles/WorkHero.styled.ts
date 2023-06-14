import styled from 'styled-components'

export const StyledWorkHero = styled.div`
    display: flex;
    width: 100%;
    height: 85vh;
    align-items: center;
    justify-content: center;
    background: #FFFFFF;
    padding: 10rem 5rem 0;
    color: #111;

   
    @media(max-width: ${({ theme }) => theme.mobile}) {
        h1{
            margin-bottom: 3.5rem;
        }
        padding: 12rem 1rem 0;
    }
        
`