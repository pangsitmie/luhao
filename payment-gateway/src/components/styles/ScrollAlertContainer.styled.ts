import styled, { keyframes } from "styled-components";

const blink = keyframes`
  50% {
    opacity: 0;
  }
`;

export const ScrollAlertContainer = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  text-align: center;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  padding: 10px;
  width: 50px;
  height: 100%;
  font-size: 20px;
  z-index: 1000;
  animation: ${blink} 2s ease-in-out ;
`;