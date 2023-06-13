import styled from "styled-components";

export const StyledMediaContainerGone = styled.div`
    @media(max-width: ${({ theme }) => theme.mobile}) {
        display: none;
    }
`