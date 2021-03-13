import React from "react";
import { CircularProgress } from "@material-ui/core";
import useGlobalStyles from "../../style/GlobalStyles";

const Loading = () => {
  const globalStyle = useGlobalStyles();

  return (
    <div className={globalStyle.flexCenterDisplay}>
      <CircularProgress color="primary" />
    </div>
  );
};

export default Loading;
