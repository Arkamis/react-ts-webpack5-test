import { CssBaseline, PaletteMode, useMediaQuery } from "@mui/material";
import {
  createTheme,
  StyledEngineProvider,
  Theme,
  ThemeProvider,
  useTheme,
} from "@mui/material/styles";
import { TypographyOptions } from "@mui/material/styles/createTypography";
import * as React from "react";

import breakpoints from "./breakpoints";
import shape from "./shape";
import typography from "./typography";

// ----------------------------------------------------------------------
interface Props {
  children: JSX.Element | JSX.Element[];
}

export const ThemeConfig = ({ children }: Props) => {
  const {
    palette: { mode: themeMode },
  } = useTheme();
  const prefersLightMode = useMediaQuery("(prefers-color-scheme: light)");

  const isLight = themeMode === "light" || prefersLightMode;

  const themeOptions = React.useMemo(
    () => ({
      palette: isLight
        ? { mode: "light" as PaletteMode }
        : { mode: "dark" as PaletteMode }, // Add custom theming mode settings
      shape,
      breakpoints,
      typography: typography as TypographyOptions,
    }),
    [isLight]
  );

  const theme = createTheme(themeOptions) as Theme;
  // theme.components = componentsOverride(theme); // Override components

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};
