import React from "react";
import { Typography } from "@material-ui/core";
import useGlobalStyle from "../../style/GlobalStyles";

const Error = () => {
  const globalClasses = useGlobalStyle();
  return (
    <Typography variant="h6" className={globalClasses.flexCenterDisplay}>
      Ops! Page not found...
    </Typography>
  );
};

export default Error;
