import React from "react";
import { StyledPortfolioCard } from "./styles/PortfolioCard.styled";

type Props = {
  title: string;
  image: string;
  redirect?: string;
};

const PortfolioCard = ({ title, image, redirect }: Props) => {
  return (
    <StyledPortfolioCard>
      <a href={redirect}>
        <div className="portfolio__item-image">
          <img src={image} alt={title} />
        </div>
        <h3>{title}</h3>
      </a>
    </StyledPortfolioCard>
  );
};

export default PortfolioCard;
