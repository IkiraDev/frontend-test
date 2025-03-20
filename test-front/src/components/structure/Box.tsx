import { laptop } from "@/core/theme/breakpoints";
import styled, { css } from "styled-components";
import { Styles } from "styled-components/dist/types";

export const Box = styled.div<Partial<BoxProp>>`
  display: flex;
  flex-direction: ${(props) => props?.direction || "unset"};
  justify-content: ${(props) =>
    props?.justify
      ? props?.justify
      : ["full", "justify"].includes(props?.center!)
      ? "center"
      : "unset"};
  padding: ${(props) => (props?.p ? props?.p : "1rem")};
  align-items: ${(props) => (["full", "align"].includes(props?.center!) ? "center" : "unset")};
  padding-left: ${(props) => (!isNaN(+props?.px!) || props?.px ? props?.px : "1rem")};
  padding-right: ${(props) => (!isNaN(+props?.px!) || props?.px ? props?.px : "1rem")};
  padding-top: ${(props) =>
    props?.pt ? props?.pt : !isNaN(+props?.py!) || props?.py ? props?.py : "1rem"};
  padding-bottom: ${(props) => (!isNaN(+props?.py!) || props?.py ? props?.py : "1rem")};
  flex-wrap: ${(props) => (props?.wrap ? "wrap" : "unset")};
  width: ${(props) => props?.width || "unset"};
  height: ${(props) => props?.height || "unset"};
  min-width: ${(props) => props?.minw || "unset"};
  min-height: ${(props) => props?.minH || "unset"};
  gap: ${(props) => (props?.gap ? props?.gap : "unset")};
  box-shadow: ${(props) => (props?.paper ? "0 0 3px 1px rgba(0,0,0,0.09)" : "unset")};
  background-color: ${(props) => (props?.paper ? props?.theme?.paper : "")};
  border-radius: ${(props) => props?.radius || "unset"};

  ${(props) =>
    props.mobile
      ? laptop(css`
          ${Object.keys(props.mobile)
            .map(
              (key) => `${key as keyof BoxProp}:${props?.mobile?.[key as keyof BoxProp["mobile"]]}`
            )
            .join(";")}
        `)
      : ""}
`;

interface BoxProp {
  center: "full" | "justify" | "align" | "none";
  direction: "column" | "row";
  width: string | number;
  minw: string | number;
  height: string | number;
  minH: string | number;
  wrap: boolean;
  p: string | number;
  py: string | number;
  px: string | number;
  pt: string | number;
  gap: string | number;
  paper: "simple" | null;
  radius: string | number;
  justify: "center" | "space-between" | "flex-start" | "flex-end" | "space-around" | "space-evenly";
  mobile: Styles<object>;
}
