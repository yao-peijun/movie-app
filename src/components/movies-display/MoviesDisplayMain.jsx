import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  Link,
  Chip,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import PropTypes from "prop-types";

//  helpers
import useGlobalStyles from "../../style/GlobalStyles";
import Config from "../../config/config";

// components
import LoadingError from "../common/LoadingError";
import Loading from "../common/Loading";

const localStyles = makeStyles((theme) => ({
  grid: {
    height: `calc(100% - ${theme.spacing(8)}px)`,
    overflow: "auto",
    [theme.breakpoints.down("md")]: {
      height: `calc(100% - ${theme.spacing(12)}px)`,
    },
    [theme.breakpoints.down("sm")]: {
      height: `calc(100% - ${theme.spacing(17)}px)`,
    },
  },
  filter: {
    display: "flex",
    flexGrow: 1,
    justifyContent: "space-between",
    flexWrap: "wrap",
    width: "100%",
    marginBottom: theme.spacing(4),
  },

  chip: {
    width: "85px",
    marginTop: theme.spacing(1),
  },
}));

const MoviesDisplayMain = (props) => {
  // styles
  const classes = localStyles();
  const globalClasses = useGlobalStyles();

  // data
  const config = Config();
  const { handleViewMovieDetails } = props;
  const displayAll = "All";

  // state
  const [movieData, setMovieData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(new Set([displayAll]));

  // functions
  const handleSelectedMovie = (selectedMovieData) => {
    handleViewMovieDetails(selectedMovieData);
  };

  const handleFilter = (label) => {
    if (label === displayAll) {
      setSelectedFilter(new Set([displayAll]));
    } else {
      let tempFilters = new Set([...selectedFilter]);

      // empty set if there "ALL" are in filter
      if (selectedFilter.has(displayAll)) tempFilters = new Set();

      // check is label is already selected
      if (tempFilters.has(label)) tempFilters.delete(label);
      else tempFilters.add(label);

      // if filter size is empty, assign all to the filter
      if (tempFilters.size === 0) setSelectedFilter(new Set([displayAll]));
      else setSelectedFilter(tempFilters);
    }
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
  const genreSet = new Set();
  const yearSet = new Set();
  genreSet.add(displayAll);

  const img = require.context("../../asset/image/main-page", true);
  const movieDisply = movieData.map((movie, index) => {
    const { genre, productionYear, name, image } = movie;
    const key = `${genre}_${index}`;
    genreSet.add(genre);
    yearSet.add(productionYear);

    if (
      selectedFilter.has(genre) ||
      selectedFilter.has(productionYear) ||
      selectedFilter.has(displayAll)
    ) {
      return (
        <Grid item xs={12} sm={6} md={6} lg={4} xl={4} key={key}>
          <Card>
            <CardActionArea onClick={() => handleSelectedMovie(movie)}>
              <Link href={`#${config.path.home}/${index + 1}`} underline="none">
                <CardMedia
                  style={{ height: "220px", paddingTop: "2%" }}
                  image={img(`./${image}`).default}
                  title={name}
                />
              </Link>
            </CardActionArea>
          </Card>
        </Grid>
      );
    }
    return null;
  });

  // filters
  const filters = [...genreSet].concat([...yearSet].sort((a, b) => a - b));
  const displayFilters = (
    <div className={classes.filter}>
      {filters.map((filter) => {
        return (
          <Chip
            className={classes.chip}
            key={filter}
            label={filter}
            onClick={() => handleFilter(filter)}
            color={selectedFilter.has(filter) ? "secondary" : undefined}
          />
        );
      })}
    </div>
  );

  // logic to display
  let mainDisplay = <div />;
  if (loading) mainDisplay = <Loading />;
  else if (error) mainDisplay = <LoadingError />;
  else {
    mainDisplay = (
      <div className={globalClasses.fullHeight}>
        {displayFilters}
        <Grid
          container
          spacing={4}
          alignItems="flex-start"
          className={classes.grid}
        >
          {movieDisply}
        </Grid>
      </div>
    );
  }

  return <div className={globalClasses.fullHeight}>{mainDisplay}</div>;
};

export default MoviesDisplayMain;

MoviesDisplayMain.defaultProps = {
  handleViewMovieDetails: () => {},
};

MoviesDisplayMain.propTypes = {
  handleViewMovieDetails: PropTypes.func,
};
