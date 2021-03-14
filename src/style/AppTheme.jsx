/* eslint-disable prefer-destructuring */
import { createMuiTheme } from "@material-ui/core/styles";
import { teal, grey } from "@material-ui/core/colors";

const img = require.context("../asset/image/movie-details-background", true);

class AppTheme {
  constructor() {
    this.primary = grey[50];
    this.secondary = teal[400];
    this.background = "#040714";
    this.backgroundImage = undefined;
  }

  setBackgroundImage(image) {
    this.backgroundImage = {
      body: {
        backgroundImage: `url(${img(`./${image}`).default})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top 50px center",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        height: "100%",
      },
    };
  }

  setDefaultBackground() {
    this.backgroundImage = undefined;
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
      overrides: {
        MuiAppBar: {
          colorPrimary: {
            backgroundColor: this.background,
          },
        },
        MuiCssBaseline: {
          "@global": this.backgroundImage,
        },
      },
    });
  }
}

export default AppTheme;
