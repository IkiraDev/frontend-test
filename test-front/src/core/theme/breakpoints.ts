import { css } from "styled-components";

const size = {
  mobile: "400px",
  tablet: "768px",
  laptop: "1024px",
  desktop: "2560px",
};

export const mobile = (inner: any) => css`
  @media (max-width: ${size.mobile}) {
    ${inner};
  }
`;
export const tablet = (inner: any) => css`
  @media (max-width: ${size.tablet}) {
    ${inner};
  }
`;
export const desktop = (inner: any) => css`
  @media (max-width: ${size.desktop}) {
    ${inner};
  }
`;
export const laptop = (inner: any) => css`
  @media (max-width: ${size.laptop}) {
    ${inner};
  }
`;
