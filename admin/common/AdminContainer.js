// @flow
import React from "react";
import { withStyles } from "@material-ui/core/styles";

const AdminContainer = ({ classes, children }) => (
  <div className={classes.root}>{children}</div>
);

const styles = theme => ({
  root: {
    flex: "1 1 auto",
    display: "flex",
    position: "relative",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: "20px 14px",
    backgroundColor: "#f9f7f7"
  }
});

export default withStyles(styles)(AdminContainer);
