// @flow
import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import { Formik, Form } from "formik";
import * as Yup from "yup";

type $Props = {
  classes: Object
};

class Login extends Component<$Props> {
  render() {
    const { classes } = this.props;
    return (
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
                  <Input
                    id="username"
                    name="username"
                    placeholder="Username"
                    className={classes.input}
                    inputProps={{
                      "aria-label": "Username"
                    }}
                  />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
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
    backgroundColor: theme.palette.secondary.light
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
