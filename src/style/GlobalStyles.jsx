import { makeStyles } from "@material-ui/core/styles";

const useGlobalStyle = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: "100%",
  },
  topbar: {
    margin: theme.spacing(0, 4, 0, 4),
  },
  content: {
    flexGrow: 1,
    display: "flex",
    padding: theme.spacing(10, 4, 0, 4),
    height: "100%",
  },
  fullHeight: {
    height: "100%",
  },
  contentRoot: {
    flexGrow: 1,
    height: "100%",
  },
  flexCenterDisplay: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
}));

export default useGlobalStyle;
