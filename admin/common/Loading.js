// @flow
import React from "react";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

type $Props = {
  classes: Object
};

const Loading = ({ classes }: $Props) => (
  <div className={classes.root}>
    <CircularProgress color="secondary" />
  </div>
);

const style = () => ({
  root: {
    display: "flex",
    position: "relative",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#353535",
    width: "100%"
  }
});

export default withStyles(style)(Loading);
