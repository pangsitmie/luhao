import { motion } from "framer-motion";
import { StyledButtonFill } from "../styles/ButtonFill.styled";

interface Props {
  text: string;
  link?: string;
  className?: string;
  onClick?: () => void;
  type?: "submit" | "button" | "reset";
}

export default function ButtonFill({
  text,
  link,
  className,
  onClick,
  type = "button",
}: Props) {
  return (
    <a href={link}>
      <StyledButtonFill onClick={onClick} className={`btn ${className}`} type={type}>
        {text}
      </StyledButtonFill>
    </a>
  );
}
