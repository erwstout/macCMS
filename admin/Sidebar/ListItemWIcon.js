// @flow
import React, { Component } from "react";
import { Link } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

type $Props = {
  icon: any,
  primary: string,
  to: string
};

class ListItemWIcon extends Component<$Props> {
  renderLink = (itemProps: $Props) => (
    <Link to={this.props.to} {...itemProps} />
  );

  render() {
    const { icon, primary } = this.props;
    return (
      <li>
        <ListItem button component={this.renderLink}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={primary} />
        </ListItem>
      </li>
    );
  }
}

export default ListItemWIcon;
