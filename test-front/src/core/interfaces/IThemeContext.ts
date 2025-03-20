import { ThemeModes } from "../types/Theme";

export interface IThemeContextContext {
  mode: ThemeModes;
  updateThemeMode: (mode: ThemeModes) => void;
}
