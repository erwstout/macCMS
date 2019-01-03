// @flow
import React, { Component, Fragment } from "react";
import { SnackbarProvider, withSnackbar } from "notistack";

type $Props = {
  children: any
};

class GlobalAlertsProvider extends Component<$Props> {
  render() {
    return (
      <SnackbarProvider maxSnack={3}>{this.props.children}</SnackbarProvider>
    );
  }
}

export default GlobalAlertsProvider;
