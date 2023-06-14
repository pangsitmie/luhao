import { StyledButtonStroke } from "../styles/ButtonStroke.styled";
import { motion } from "framer-motion";

interface Props {
  text: string;
  link?: string;
  onClick?: () => void;
  className?: string;
}

export default function ButtonStorke({ text, link, className, onClick }: Props) {
  return (
    <a href={link}>
      <StyledButtonStroke onClick={onClick} className={`btn ${className}`}>
        {text}
      </StyledButtonStroke>
    </a>
  );
}
