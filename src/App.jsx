import React from "react";
import "./App.css";
import { withRouter, Switch, Route } from "react-router-dom";
import { AppBar, Toolbar, Link, Typography } from "@material-ui/core";

// style
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import useGlobalStyles from "./style/GlobalStyles";

// helpers
import Config from "./config/config";
import { useStore } from "./context/Store";

// components
import HomeMain from "./components/home/HomeMain";
import Error from "./components/common/Error";

const App = () => {
  // styles
  const globalClasses = useGlobalStyles();

  // data
  const config = Config();
  const { state } = useStore();

  // render
  return (
    <div className={globalClasses.root}>
      <ThemeProvider theme={state.appTheme.createTheme()}>
        <CssBaseline />
        {/* top bar */}
        <AppBar position="fixed">
          <Toolbar disableGutters className={globalClasses.topbar}>
            <Typography variant="h6">
              <Link href="/" underline="none">
                Movie Home
              </Link>
            </Typography>
          </Toolbar>
        </AppBar>

        {/* content */}
        <div className={globalClasses.content}>
          <Switch>
            <Route exact path="/" component={HomeMain} />
            <Route path={config.path.home} component={HomeMain} />
            <Route component={Error} />
          </Switch>
        </div>
      </ThemeProvider>
    </div>
  );
};

export default withRouter(App);
