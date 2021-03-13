import { Typography } from "@material-ui/core";
import React from "react";
import useGlobalStyle from "../../style/GlobalStyles";

const LoadingError = () => {
  const globalClasses = useGlobalStyle();
  return (
    <div className={globalClasses.flexCenterDisplay}>
      <Typography variant="h6">
        Loading Error. Please refresh the page.
      </Typography>
    </div>
  );
};

export default LoadingError;
