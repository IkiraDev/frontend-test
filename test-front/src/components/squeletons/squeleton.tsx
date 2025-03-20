import styled from "styled-components";

export const Squeleton = (options: SqueletonOptions) => {
  return <div></div>;
};

interface SqueletonOptions {
  type: "rounded" | "squire";
  borderType: "rounded" | "flat";
}

export const SqueletonStyled = styled.div``;
