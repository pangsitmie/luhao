import styled from "styled-components";

export const StyledWorkContainer = styled.div<{ backgroundImage: string }>`
  height: 100vh;  
  position: relative;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url(${props => props.backgroundImage});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center; /* Optional property to center the image */
`
