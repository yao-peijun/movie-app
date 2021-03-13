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
    margin: theme.spacing(2, 4, 2, 4),
    height: `calc(100% - ${theme.spacing(10)}px)`,
  },
  contentRoot: {
    flexGrow: 1,
    height: "100%",
    overflow: "auto",
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
