import React from "react";
import "./App.css";
import { withRouter, Switch, Route } from "react-router-dom";
import { Toolbar, Link, Typography } from "@material-ui/core";

// style
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppTheme from "./style/AppTheme";
import useGlobalStyles from "./style/GlobalStyles";

// components
import HomeMain from "./components/home/HomeMain";
import Error from "./components/common/Error";

const App = () => {
  // styles
  const theme = new AppTheme();
  const globalClasses = useGlobalStyles();

  // render
  return (
    <div className={globalClasses.root}>
      <ThemeProvider theme={theme.createTheme()}>
        <CssBaseline />
        {/* top bar */}
        <Toolbar disableGutters className={globalClasses.topbar}>
          <Typography variant="h6">
            <Link href="#/home" underline="none">
              Movie Home
            </Link>
          </Typography>
        </Toolbar>

        {/* content */}
        <div className={globalClasses.content}>
          <Switch>
            <Route exact path="/" component={HomeMain} />
            <Route path="/home" component={HomeMain} />
            <Route component={Error} />
          </Switch>
        </div>
      </ThemeProvider>
    </div>
  );
};

export default withRouter(App);
