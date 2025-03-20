import styled from "styled-components";

export const Button = styled.button`
  background: ${(props) => props?.theme?.colors?.secondary};
  border: none;
  outline: none;
  border-radius: 2px;
  padding: 10px;
  padding-left: 1rem;
  padding-right: 1rem;
  transition: all ease 0.2s;
  opacity: 0.9;
  font-size: 1em;
  font-weight: 500;
  color: ${(props) => props.theme?.colors?.gradient?.[100]};
  text-transform: uppercase;

  &:hover {
    transform: scale(1.06);
    opacity: 1;
  }

  &:active {
    transform: scale(0.99);
  }
`;
