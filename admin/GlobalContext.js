import React, { Component } from "react";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import theme from "../styles/theme";
import GlobalAlertsProvider from "./common/GlobalAlertsProvider";

const GlobalContext = React.createContext({
  user: {}
});

export class GlobalProvider extends Component {
  render() {
    const { user } = this.props;

    return (
      <MuiThemeProvider theme={theme}>
        <GlobalContext.Provider value={{ user }}>
          <GlobalAlertsProvider>{this.props.children}</GlobalAlertsProvider>
        </GlobalContext.Provider>
      </MuiThemeProvider>
    );
  }
}

export const withGlobalContext = Component => props => (
  <GlobalContext.Consumer>
    {globalContext => <Component {...globalContext} {...props} />}
  </GlobalContext.Consumer>
);
