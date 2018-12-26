// @flow
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import theme from "./styles/theme";

import Login from "./Login";

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <div>
            <Switch>
              <Route
                exact
                path="/mac-cms"
                render={() => (
                  <div>
                    Hello CMS! <Link to="/mac-cms/login">Login</Link>
                  </div>
                )}
              />
              <Route exact path="/mac-cms/login" render={() => <Login />} />
              <Route exact render={() => <div>404!</div>} />
            </Switch>
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
