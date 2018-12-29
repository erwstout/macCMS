// @flow
import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import theme from "../styles/theme";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";

type $Props = {
  classes: Object
};

class Login extends Component<$Props> {
  render() {
    const { classes } = this.props;
    console.log(theme);
    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <Paper className={classes.loginContainer}>
            <Typography variant="h4">MacCMS Login</Typography>
            <Divider />
            <Formik
              initialValues={{ username: "", password: "" }}
              validationSchema={() =>
                Yup.Object().shape({
                  username: Yup.string().required("Username is required"),
                  password: Yup.string().required("Password is required")
                })
              }
              onSubmit={(values, { setSubmitting }) => {
                // manually submit the form
                document.getElementById("login-form").submit();
              }}
              render={({ isSubmitting }) => (
                <Form method="POST" action="/mac-cms/login" id="login-form">
                  <div className={classes.formContainer}>
                    <TextField
                      id="username"
                      name="username"
                      label="Username"
                      className={classes.input}
                      inputProps={{
                        "aria-label": "Username"
                      }}
                    />
                    <TextField
                      id="password"
                      name="password"
                      type="password"
                      label="Password"
                      className={classes.input}
                      inputProps={{
                        "aria-label": "Password"
                      }}
                    />
                  </div>
                  <Button variant="contained" color="primary" type="submit">
                    Login
                  </Button>
                </Form>
              )}
            />
          </Paper>
        </div>
      </MuiThemeProvider>
    );
  }
}

const styles = theme => ({
  "@global": {
    html: {
      margin: 0,
      padding: 0
    },
    body: {
      margin: 0,
      padding: 0
    }
  },
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    width: "100%",
    backgroundColor: "#ff3d00"
  },
  loginContainer: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width: "100%",
    maxWidth: 600
  },
  input: {
    margin: theme.spacing.unit,
    width: "100%"
  },
  formContainer: {
    margin: "18px 0"
  }
});

export default withStyles(styles)(Login);
