import { IThemeContextContext } from "@/core/interfaces/IThemeContext";
import { theme } from "@/core/theme/theme";
import { ThemeModes } from "@/core/types/Theme";
import { createContext, PropsWithChildren, useState } from "react";
import { Bounce, ToastContainer } from "react-toastify";
import { ThemeProvider } from "styled-components";

const initialValue: IThemeContextContext = {
  mode: "light",
  updateThemeMode: () => null,
};

export const ThemeContext = createContext<IThemeContextContext>(initialValue);

export const ThemeContextProvider = ({ children }: PropsWithChildren) => {
  const [mode, setMode] = useState<ThemeModes>(initialValue.mode);

  const updateThemeMode = (newMode: ThemeModes) => setMode(newMode);

  const newTheme = theme(mode);

  return (
    <ThemeContext.Provider value={{ mode, updateThemeMode }}>
      <ThemeProvider theme={newTheme}>
        {children}
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
