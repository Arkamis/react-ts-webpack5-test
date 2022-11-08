import { Theme, ThemeOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
  type CustomTheme = {
    status: {
      danger: string;
    };
  } & Theme;
  // allow configuration using `createTheme`
  type CustomThemeOptions = {
    status?: {
      danger?: string;
    };
  } & ThemeOptions;
  export function createTheme(options?: CustomThemeOptions): CustomTheme;
}
