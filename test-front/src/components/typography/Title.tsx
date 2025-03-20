import styled from "styled-components";

export const Title = styled.h1<{ size?: number | string }>`
  font-size: ${(props) => (!!props.size ? props.size : "1.5em")};
  color: ${(props) => props?.theme?.colors?.title};
`;
