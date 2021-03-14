import React, { useState, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import { Grid, Card, CardActionArea, CardMedia, Link } from "@material-ui/core";
import axios from "axios";
import PropTypes from "prop-types";

//  helpers
import useGlobalStyles from "../../style/GlobalStyles";
import Config from "../../config/config";

// components
import LoadingError from "../common/LoadingError";
import Loading from "../common/Loading";

const MoviesDisplayMain = (props) => {
  // styles
  const globalClasses = useGlobalStyles();

  // data
  const config = Config();
  const { handleViewMovieDetails } = props;
  const { path } = useRouteMatch();

  // state
  const [movieData, setMovieData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // functions
  const handleSelectedMovie = (selectedMovieData) => {
    handleViewMovieDetails(selectedMovieData);
  };

  // get movie data
  useEffect(() => {
    if (movieData.length === 0) {
      axios
        .get(config.APIs.getMovieData)
        .then((res) => {
          setMovieData(res.data);
          setLoading(false);
        })
        .catch(() => {
          setError(true);
          setLoading(false);
        });
    }
  });

  // movie display cards
  const img = require.context("../../asset/image/main-page", true);
  const movieDisply = movieData.map((movie, index) => {
    const key = `${movie.genre}_${index}`;
    return (
      <Grid item xs={12} sm={6} md={6} lg={4} xl={4} key={key}>
        <Card>
          <CardActionArea onClick={() => handleSelectedMovie(movie)}>
            <Link href={`#${path}/${index + 1}`} underline="none">
              <CardMedia
                style={{ height: "220px", paddingTop: "2%" }}
                image={img(`./${movie.image}`).default}
                title={movie.name}
              />
            </Link>
          </CardActionArea>
        </Card>
      </Grid>
    );
  });

  // logic to display
  let mainDisplay = movieDisply;
  if (loading) mainDisplay = <Loading />;
  else if (error) mainDisplay = <LoadingError />;

  return (
    <Grid container spacing={4} className={globalClasses.fullHeight}>
      {mainDisplay}
    </Grid>
  );
};

export default MoviesDisplayMain;

MoviesDisplayMain.defaultProps = {
  handleViewMovieDetails: () => {},
};

MoviesDisplayMain.propTypes = {
  handleViewMovieDetails: PropTypes.func,
};
