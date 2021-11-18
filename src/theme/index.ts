import { createMuiTheme } from "@material-ui/core";
import { PaletteOptions } from "@material-ui/core/styles/createPalette";


const palette: PaletteOptions = {
  primary: {
    main: '#FFFFFF',
    dark: '#1E1E1E',
  },
};

export const theme = createMuiTheme({
  palette,
});

export default theme;
