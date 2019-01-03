// @flow
import React, { Component } from "react";
import LoginForm from "./LoginForm";
import GlobalAlertsProvider from '../admin/common/GlobalAlertsProvider';

type $Props = {
  messages: Object,
  enqueueSnackbar: function,
}

class Login extends Component<$Props> {
  render() {
    return (
      <GlobalAlertsProvider>
        <LoginForm messages={this.props.messages} />
      </GlobalAlertsProvider>
    
    );
  }
}

export default Login;
