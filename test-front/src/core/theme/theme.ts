import { ThemeModes } from "../types/Theme";

const colors = {
  secondary: "#cfc",
  primary: "#fefefe",
  white: "#fefefe",
  grey: "#555",
  black: "#333",
  paper: {
    white: "#fefefe",
    dark: "#888",
  },
  gradient: {
    white: {
      10: "#999",
      30: "#aaa",
      60: "#ccc",
      80: "#eee",
      90: "#eee",
      100: "#fefefe",
    },
    black: {
      10: "#fefefe",
      30: "#eee",
      60: "#ccc",
      80: "#aaa",
      90: "#999",
      100: "#888",
    },
  },
};

const light = {
  bg: colors.white,
  paper: colors.paper.white,
  colors: {
    ...colors,
    primary: colors.black,
    secondary: colors.secondary,
    typography: colors.black,
    title: colors.grey,
    gradient: colors.gradient.black,
  },
};

const dark = {
  bg: colors.grey,
  paper: colors.paper.dark,
  colors: {
    ...colors,
    primary: colors.white,
    secondary: colors.secondary,
    typography: colors.white,
    gradient: colors.gradient.white,
    title: colors.white,
  },
};

const modes = {
  light,
  dark,
};

export const theme = (mode: ThemeModes = "light") => ({
  type: mode,
  ...modes[mode],
});
