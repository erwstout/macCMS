// @flow
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import AllUsers from "./users/AllUsers";
import NewUser from "./users/NewUser";
import DeletedUsers from "./users/DeletedUsers";
import { GlobalProvider } from "./GlobalContext";

type $Props = {
  user: Object
};

type $State = {
  showNav: boolean
};

class Admin extends Component<$Props, $State> {
  constructor(props: $Props) {
    super(props);

    this.state = {
      showNav: true
    };
  }

  handleNavigationToggle = () => {
    this.setState(state => ({ showNav: !state.showNav }));
  };

  render() {
    const { showNav } = this.state;
    return (
      <GlobalProvider user={this.props.user}>
        <Router>
          <div>
            <Header viewTitle={"MacCMS Dashboard"} />
            <div
              style={{
                display: "flex",
                position: "relative",
                flexFlow: "row nowrap",
                justifyContent: "flex-start",
                width: "100%"
              }}
            >
              <Sidebar isOpen={showNav} />

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
                  render={() => <AllUsers />}
                />
                <Route
                  exact
                  path="/mac-cms/users/deleted"
                  render={() => <DeletedUsers />}
                />
                <Route
                  exact
                  path="/mac-cms/users/new"
                  render={() => <NewUser />}
                />
                <Route exact render={() => <div>404!</div>} />
              </Switch>
            </div>
          </div>
        </Router>
      </GlobalProvider>
    );
  }
}

export default Admin;
