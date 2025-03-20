import styled, { css } from "styled-components";

export const Divider = styled.div<{ opacity?: number; vertical?: boolean }>`
  width: ${(props) => (props.vertical ? "1px" : "100%")};
  height: ${(props) => (props.vertical ? "100%" : "1px")};
  background-color: rgba(0, 0, 0, 0.05);
  opacity: ${(props) => props.opacity || 1};
`;
