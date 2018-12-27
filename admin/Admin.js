// @flow
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Login from "./Login";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { GlobalProvider } from "./GlobalContext";

type $Props = {
  user: Object
};

type $State = {
  viewTitle: string,
  showNav: boolean
};

class Admin extends Component<$Props, $State> {
  constructor(props: $Props) {
    super(props);

    this.state = {
      viewTitle: "Dashboard",
      showNav: true
    };
  }

  handleViewTitle = (updatedTitle: string) => {
    this.setState({ viewTitle: updatedTitle });
  };

  handleNavigationToggle = () => {
    this.setState(state => ({ showNav: !state.showNav }));
  };

  render() {
    const { user } = this.props;
    const { showNav, viewTitle } = this.state;
    return (
      <GlobalProvider user={user}>
        <Router>
          <div>
            <Route exact path="/mac-cms/login" component={Login} />
            <div>
              <Header viewTitle={viewTitle} />
              <div
                style={{
                  display: "flex",
                  flexFlow: "row nowrap",
                  justifyContent: "flex-start"
                }}
              >
                <Sidebar isOpen={showNav} />
                <div>
                  <Switch>
                    <Route
                      exact
                      path="/mac-cms"
                      render={() => (
                        <div>
                          Hello, {this.props.user.username}! Welcome to the
                          dashboard, <Link to="/mac-cms/users">Users</Link>
                        </div>
                      )}
                    />
                    <Route
                      exact
                      path="/mac-cms/users/all"
                      render={() => <div>Users</div>}
                    />
                    <Route exact render={() => <div>404!</div>} />
                  </Switch>
                </div>
              </div>
            </div>
          </div>
        </Router>
      </GlobalProvider>
    );
  }
}

export default Admin;
