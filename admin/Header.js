// @flow
import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { Link } from "react-router-dom";

type $Props = {
  classes: Object,
  viewTitle: string,
};

type $State = {
  anchorEl: any,
};

class Header extends Component<$Props, $State> {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
    };
  }

  handleMenu = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleLogout = () => {
    fetch("/mac-cms/logout")
      .then(() => location.reload(true))
      /* eslint-disable-next-line */
      .catch((err) => console.error(err));
  };

  render() {
    const { classes, viewTitle } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              {viewTitle}
            </Typography>

            <div>
              <IconButton
                aria-owns={open ? "menu-appbar" : undefined}
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={this.handleClose}
              >
                <Link
                  className={classes.linkStyle}
                  to="/mac-cms/users/my-account"
                >
                  <MenuItem onClick={this.handleClose}>My account</MenuItem>
                </Link>
                <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const styles = () => ({
  root: {
    position: "relative",
    flexGrow: 1,
    zIndex: 999,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  linkStyle: {
    outline: "none",
    textDecoration: "none",
  },
});

export default withStyles(styles)(Header);
