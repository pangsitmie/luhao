import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";
import { PaletteMode } from "@mui/material";


// color design tokens export
export const tokens = (mode: string) => ({
  ...(mode === "dark"
    ? {
      grey: {
        100: "#F5F5F5",
        200: "#D0D0D0",
        300: "#a3a3a3",
        400: "#858585",
        500: "#666666",
        600: "#525252",
        700: "#3d3d3d",
        800: "#292929",
        900: "#141414",
      },
      primary: {
        100: "#fcfcfc",
        200: "#a1a4ab",
        300: "#727681",
        400: "#17191E",
        500: "#0E1015",
        600: "#101624",
        700: "#0c101b",
        800: "#080b12",
        900: "#040509",
      },
    }
    : {
      grey: {
        100: "#141414",
        200: "#292929",
        300: "#3d3d3d",
        400: "#525252",
        500: "#666666",
        600: "#858585",
        700: "#a3a3a3",
        800: "#c2c2c2",
        900: "#e0e0e0",
      },
      primary: {
        100: "#040509",
        200: "#080b12",
        300: "#0c101b",
        400: "#f2f0f0", // manually changed
        500: "#B4B1B1",
        600: "#1F2A40",
        700: "#727681",
        800: "#a1a4ab",
        900: "#d0d1d5",
      },
    }),
});

// mui theme settings
export const themeSettings = (mode: string) => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode as PaletteMode,
      ...(mode === "dark"
        ? {
          primary: {
            main: colors.primary[500],
          },
          background: {
            default: colors.primary[500],
          },
        }
        : {
          primary: {
            main: colors.primary[100],
          },
          background: {
            default: "#fcfcfc",
          },
        }),
    },
  };
};

// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => { },
});

export const useMode = () => {
  const [mode, setMode] = useState("light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return [theme, colorMode];
};


