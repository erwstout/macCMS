import React, { Component } from "react";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import theme from "./styles/theme";

const GlobalContext = React.createContext({
  user: {}
});

export class GlobalProvider extends Component {
  render() {
    const { user } = this.props;
    console.log("GlobalContext ==>", user); // this works

    return (
      <MuiThemeProvider theme={theme}>
        <GlobalContext.Provider value={{ user }}>
          {this.props.children}
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
