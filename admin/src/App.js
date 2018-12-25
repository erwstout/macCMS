// @flow
import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import theme from "./styles/theme";

import Login from "./Login";

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <div>
            <Route
              exact
              path="/mac-cms/"
              render={() => <div>Hello CMS!</div>}
            />
            <Route exact path="/mac-cms/login" render={() => <Login />} />
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
