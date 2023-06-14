import styled from 'styled-components'

export const StyledProblemSolutionCard = styled.div<{ color: string }>`
    height: 100%;
    padding: 1.5rem;
    border-radius: 25px;
    background-color: ${props => props.color};
    display: flex;
    flex-direction: column;
    

    & > h2 {
        font-size: 1.7rem;
        font-weight: 600;
        color: #FFFFFF;
        margin-bottom: 1rem;
    }

    & > p {
        font-size: 1rem;
        font-weight: 400;
        color: #FFFFFF;
    }
`
