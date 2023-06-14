import styled from "styled-components";

export const StyledLabel = styled.label`
    display: block;
    transition: 0.2s ease all;
    margin-bottom: .5rem;
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: .8rem;
  background-color: transparent;
  border: 1px solid #3A3A3A;
  border-radius: 12px;
  position: relative;
  cursor: text;
  outline: none;
  
  &:focus {
    box-shadow: 0 0 10px rgba(255,255,255,0.25);
  }

  &::before {
    content: attr(data-label);
    position: absolute;
    top: -0.5em;
    left: 0.5em;
    background-color: white;
    padding: 0 5px;
    font-size: 0.8em;
    color: #3A3A3A;
  }

  &.error {
    border-color: #c1121f;

    &::after {
      content: attr(data-error);
      position: absolute;
      top: 100%;
      left: 0;
      background-color: #c1121f;
      color: white;
      padding: 0.5em;
      border-radius: 0.25rem;
    }
  }
`;
