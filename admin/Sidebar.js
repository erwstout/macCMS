// @flow
import React, { Component, Fragment } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withGlobalContext } from "./GlobalContext";
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
import Delete from "@material-ui/icons/Delete";
import Collapse from "@material-ui/core/Collapse";

import ListItemWIcon from "./Sidebar/ListItemWIcon";

type $Props = {
  classes: Object,
  user: Object
};

type $State = {
  usersOpen: boolean,
  postsOpen: boolean
};

class Sidebar extends Component<$Props, $State> {
  constructor(props) {
    super(props);

    this.state = {
      usersOpen: false,
      postsOpen: false
    };
  }

  handleListExpand = list => this.setState(state => ({ [list]: !state[list] }));

  render() {
    const { classes } = this.props;
    const { usersOpen, postsOpen } = this.state;
    return (
      <div className={classes.root}>
        <List component="nav">
          <Fragment>
            <ListItem button onClick={() => this.handleListExpand("postsOpen")}>
              <ListItemIcon>
                <Create />
              </ListItemIcon>
              <ListItemText inset primary="Posts" />
              {postsOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={postsOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemWIcon
                  to="/mac-cms/posts/new"
                  primary="New Post"
                  icon={<Add />}
                />
                <ListItemWIcon
                  to="/mac-cms/posts/all"
                  primary="View All Posts"
                  icon={<ListIcon />}
                />
                <ListItemWIcon
                  to="/mac-cms/posts/deleted"
                  primary="View Deleted Posts"
                  icon={<Delete />}
                />
              </List>
            </Collapse>
          </Fragment>
          {this.props.user && this.props.user.user_type === "super" ? (
            <Fragment>
              <ListItem
                button
                onClick={() => this.handleListExpand("usersOpen")}
              >
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
                  <ListItemWIcon
                    to="/mac-cms/users/deleted"
                    primary="View Deleted Users"
                    icon={<Delete />}
                  />
                </List>
              </Collapse>
            </Fragment>
          ) : null}
        </List>
      </div>
    );
  }
}

const styles = () => ({
  root: {
    flex: "0 0 250px",
    height: "100vh",
    borderRight: "1px solid #1f1f1f"
  }
});

export default withStyles(styles)(withGlobalContext(Sidebar));
