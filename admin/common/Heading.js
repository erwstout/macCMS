import React, { Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

const Heading = ({ classes, heading, Icon }) => (
  <Fragment>
    <Typography className={classes.heading} variant="h5">
      {Icon} {heading}
    </Typography>
    <Divider />
  </Fragment>
);

const styles = () => ({
  heading: {
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "flex-start",
    alignItems: "center",
    "& svg": {
      marginRight: 10
    }
  }
});

export default withStyles(styles)(Heading);
