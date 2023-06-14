import styled from "styled-components";

export const StyledFooter = styled.footer`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 100px;
    padding: 60px 10% 60px;

    ul{
        list-style-type: none;
    }
    ul li{
        margin-bottom: 20px;
    }
    p{
        text-align: right;
    }

    @media(max-width: ${({ theme }) => theme.mobile}) {
        text-align: center;

        ul{
            padding: 0;
        }
        p{
            text-align: center;
        }
    }
`