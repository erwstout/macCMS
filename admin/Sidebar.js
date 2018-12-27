// @flow
import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Create from "@material-ui/icons/Create";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ExpandLess from "@material-ui/icons/ExpandLess";
import Add from "@material-ui/icons/Add";
import ListIcon from "@material-ui/icons/List";
import Collapse from "@material-ui/core/Collapse";

import ListItemWIcon from "./Sidebar/ListItemWIcon";

type $Props = {
  classes: Object
};

type $State = {
  usersOpen: boolean
};

class Sidebar extends Component<$Props, $State> {
  constructor(props) {
    super(props);

    this.state = {
      usersOpen: false
    };
  }

  handleListExpand = () =>
    this.setState(state => ({ usersOpen: !state.usersOpen }));

  render() {
    const { classes } = this.props;
    const { usersOpen } = this.state;
    return (
      <div className={classes.root}>
        <List component="nav">
          <ListItemWIcon
            to="/mac-cms/posts"
            primary="Posts"
            icon={<Create />}
          />
          <ListItem button onClick={this.handleListExpand}>
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText inset primary="Users" />
            {usersOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={usersOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemWIcon
                to="/mac-cms/users/new"
                primary="New User"
                icon={<Add />}
              />
              <ListItemWIcon
                to="/mac-cms/users/all"
                primary="View All Users"
                icon={<ListIcon />}
              />
            </List>
          </Collapse>
        </List>
      </div>
    );
  }
}

const styles = () => ({
  root: {
    width: 250,
    height: "100vh",
    borderRight: "1px solid #ececec"
  }
});

export default withStyles(styles)(Sidebar);
