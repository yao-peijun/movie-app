/* eslint-disable prefer-destructuring */
import { createMuiTheme } from "@material-ui/core/styles";
import { teal, grey } from "@material-ui/core/colors";

class AppTheme {
  constructor() {
    this.primary = grey[50];
    this.secondary = teal[400];
    this.background = "#040714";
  }

  createTheme() {
    return createMuiTheme({
      palette: {
        type: "dark",
        primary: {
          main: this.primary,
        },
        secondary: {
          main: this.secondary,
        },
        background: {
          default: this.background,
        },
      },
      typography: {
        fontFamily: "Roboto",
      },
    });
  }
}

export default AppTheme;
