import React, { useState, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import { Grid, Card, Typography } from "@material-ui/core";
import { makeStyles, fade } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import axios from "axios";

// helpers
import Config from "../../config/config";
import GlobalStyles from "../../style/GlobalStyles";
import { useStore } from "../../context/Store";

// components
import LoadingError from "../common/LoadingError";
import Loading from "../common/Loading";

const localStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: fade(theme.palette.background.default, 0.5),
    padding: theme.spacing(1, 2, 0, 2),
  },
}));

const MovieDetailsMain = (props) => {
  // style
  const classes = localStyles();
  const globalClasses = GlobalStyles();

  // data
  const { selectedMovie: parSelectedMovie } = props;
  const { params } = useRouteMatch();
  const config = Config();
  const { dispatch } = useStore();

  // state
  const [selectedMovie, setSelectedMovie] = useState(parSelectedMovie);
  const [loading, setLoading] = useState(
    Object.entries(selectedMovie).length === 0
  );
  const [error, setError] = useState(false);

  // get movie data
  useEffect(() => {
    if (Object.entries(selectedMovie).length === 0) {
      axios
        .get(config.APIs.getMovieData)
        .then((res) => {
          setSelectedMovie(res.data[params.id - 1]);
          setLoading(false);
        })
        .catch(() => {
          setError(true);
          setLoading(false);
        });
    }
  });

  // set background image
  useEffect(() => {
    const setBackgroundImage = () => {
      dispatch({
        type: "SET_BACKGROUND_IMAGE",
        payload: { image: selectedMovie.image },
      });
    };

    const setDefaultBackground = () => {
      dispatch({
        type: "SET_DEFAULT_BACKGROUND",
      });
    };

    if (selectedMovie.image) {
      // change background image when enter the page
      window.addEventListener(
        "beforeunload",
        setBackgroundImage(selectedMovie.image)
      );
    }

    return () => {
      // set back to default background when exit page
      window.removeEventListener("beforeunload", setDefaultBackground());
    };
  }, [dispatch, selectedMovie.image]);

  // logic to display
  let mainDisplay = <div />;
  if (loading) mainDisplay = <Loading />;
  else if (error) mainDisplay = <LoadingError />;
  else {
    // synopsis split <br /><br />
    const content = selectedMovie.synopsis
      .split("<br /><br />")
      .map((para, index) => {
        const key = `para_${index}`;
        return (
          <div key={key}>
            <Typography variant="body2" component="p" align="justify">
              {para}
            </Typography>
            <br />
          </div>
        );
      });

    mainDisplay = (
      <Grid
        item
        xs={12}
        sm={10}
        md={8}
        lg={5}
        xl={5}
        className={globalClasses.fullHeight}
      >
        <Card className={classes.card}>
          {/* Movie title */}
          <Typography variant="h4">{selectedMovie.name}</Typography>
          {/* genre and year */}
          <Typography variant="subtitle2" component="h6">
            {selectedMovie.genre}, Year {selectedMovie.productionYear}
          </Typography>
          <br />
          {/* synopsis short */}
          <Typography variant="subtitle2" component="h6">
            Synopsis Short
          </Typography>
          <Typography variant="caption" component="p" align="justify">
            {selectedMovie.synopsisShort}
          </Typography>
          <br />
          {/* synopsis */}
          <Typography variant="subtitle2" component="h6">
            Synopsis
          </Typography>
          {content}
        </Card>
      </Grid>
    );
  }

  // render
  return (
    <Grid
      container
      className={globalClasses.fullHeight}
      justify="center"
      alignItems="center"
    >
      {mainDisplay}
    </Grid>
  );
};

export default MovieDetailsMain;

MovieDetailsMain.defaultProps = {
  selectedMovie: {
    genre: "",
    image: "",
    name: "",
    productionYear: -1,
    synopsis: "",
    synopsisShort: "",
  },
};

MovieDetailsMain.propTypes = {
  selectedMovie: PropTypes.exact({
    genre: PropTypes.string,
    image: PropTypes.string,
    name: PropTypes.string,
    productionYear: PropTypes.number,
    synopsis: PropTypes.string,
    synopsisShort: PropTypes.string,
  }),
};
