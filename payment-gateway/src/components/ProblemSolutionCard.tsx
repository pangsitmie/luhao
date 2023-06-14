import React from "react";
import { StyledProblemSolutionCard } from "./styles/ProblemSolutionCard.styled";

type Props = {
  title: string;
  content: string;
  color: string;
};

const ProblemSolutionCard = ({ title, content, color }: Props) => {
  return (
    <StyledProblemSolutionCard color={color}>
      <h2>{title}</h2>
      <p style={{ whiteSpace: "pre-wrap" }}>{content}</p>
    </StyledProblemSolutionCard>
  );
};

export default ProblemSolutionCard;
