import React, { useState, useEffect } from "react";
import { Grid, Card, CardActionArea, CardMedia } from "@material-ui/core";
import axios from "axios";

//  helpers
import useGlobalStyles from "../../style/GlobalStyles";
import Config from "../../config/config";

// components
import Loading from "../common/Loading";
import LoadingError from "../common/LoadingError";

const HomeMain = () => {
  // styles
  const globalClasses = useGlobalStyles();

  // data
  const config = Config();

  // states
  const [movieData, setMovieData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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
      <Grid item xs={6} sm={6} md={4} lg={4} xl={4} key={key}>
        <Card>
          <CardActionArea>
            <CardMedia
              style={{ height: "220px", paddingTop: "2%" }}
              image={img(`./${movie.image}`).default}
              title={movie.name}
            />
          </CardActionArea>
        </Card>
      </Grid>
    );
  });

  let mainDisplay = movieDisply;
  if (loading) mainDisplay = <Loading />;
  else if (error) mainDisplay = <LoadingError />;

  // render
  return (
    <div className={globalClasses.contentRoot}>
      <Grid container spacing={4} className={globalClasses.fullHeight}>
        {mainDisplay}
      </Grid>
    </div>
  );
};

export default HomeMain;
