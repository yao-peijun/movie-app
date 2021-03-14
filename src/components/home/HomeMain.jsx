import React, { useState } from "react";
import { withRouter, Switch, Route, useRouteMatch } from "react-router-dom";

// helpers
import useGlobalStyles from "../../style/GlobalStyles";
import Config from "../../config/config";

// components
import MoviewsDisplayMain from "../movies-display/MoviesDisplayMain";
import MovieDetailsMain from "../movie-details/MovieDetailsMain";
import Error from "../common/Error";

const HomeMain = () => {
  // styles
  const globalClasses = useGlobalStyles();

  // data
  const { path } = useRouteMatch();
  const config = Config();

  // states
  const [selectedMovie, setSelectedMovie] = useState({});

  // functions
  const handleViewMovieDetails = (selectedMovieData) => {
    setSelectedMovie(selectedMovieData);
  };

  // render
  return (
    <div className={globalClasses.contentRoot}>
      <Switch>
        {/* movies display */}
        <Route exact path={path}>
          <MoviewsDisplayMain handleViewMovieDetails={handleViewMovieDetails} />
        </Route>

        {/* display movie details */}
        <Route path={`${config.path.home}/:id`}>
          <MovieDetailsMain selectedMovie={selectedMovie} />
        </Route>
        <Route component={Error} />
      </Switch>
    </div>
  );
};

export default withRouter(HomeMain);
