// @flow
import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { withGlobalContext } from "../GlobalContext";

type $Props = {
  classes: Object,
  children: any,
};

const AdminContainer = ({ classes, children }: $Props) => (
  <div className={classes.root}>{children}</div>
);

const styles = () => ({
  root: {
    flex: "1 1 auto",
    display: "flex",
    position: "relative",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: "20px 14px",
    backgroundColor: "#353535",
    overflow: "hidden",
  },
});

export default withStyles(styles)(withGlobalContext(AdminContainer));
