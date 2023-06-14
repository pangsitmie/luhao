import styled, { keyframes } from 'styled-components';

const fadeMoveDown = keyframes`
  0% {
    transform: translate(0, -10px) rotate(45deg);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translate(0, 10px) rotate(45deg);
    opacity: 0;
  }
`;

const StyledScrollDown = styled.a`
  position: absolute;
  left: 50%;
  bottom: 10px;
  display: block;
  text-align: center;
  font-size: 20px;
  z-index: 9;
  text-decoration: none;
  text-shadow: 0;
  width: 13px;
  height: 13px;
  border-bottom: 2px solid #fff;
  border-right: 2px solid #fff;
  transform: translate(-50%, 0%) rotate(45deg);
  animation: ${fadeMoveDown} 4s ease-in-out infinite;
`;

export default StyledScrollDown;
