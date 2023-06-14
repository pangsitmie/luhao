import styled from "styled-components";

export const StyledPortfolioCard = styled.div`
    background-color: #111;
    border-radius: 25px;
    border: 1px solid transparent;
    transition: 0.5s ease-in-out;
    position: relative;
    cursor: pointer;

    &:hover {
        transform: scale(1.05);
        box-shadow: 0 0 10px #cecece;
    }


    &:hover::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        border-radius: 25px;
    }

    &:hover h3 {
        visibility: visible;
        opacity: 1;
    }

    & h3 {
        padding: 1.5rem;
        /* existing styles */
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        font-size: 1.5rem;
        text-align: center;
        visibility: hidden;
        opacity: 0;
        transition: visibility 0s, opacity 0.5s ease-in-out;
      }

    & .portfolio__item-image {
        position: relative;
    }

    & .portfolio__item-image::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #111;
        visibility: hidden;
        border-radius: 25px;
        opacity: 0;
        transition: visibility 0s, opacity 0.5s ease-in-out;
    }

    &:hover .portfolio__item-image::before {
        visibility: visible;
        opacity: 1;
    }

    .portfolio__item-image {
        width: 100%;
        height: 100%;
      }
      
    .portfolio__item-image img {
        border-radius: 25px;
        height: 100%;
        width: 100%;
        object-fit: cover;
    }

    @media(max-width: ${({ theme }) => theme.mobile}) {
        text-align: center;

       h3{
              font-size: 1rem;
       }
    }
`