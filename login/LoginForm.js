// @flow
import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import theme from "../styles/theme";
import { withSnackbar } from "notistack";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";

type $Props = {
  classes: Object,
  messages: Object,
  enqueueSnackbar: function,
};

class LoginForm extends Component<$Props> {
  componentDidMount() {
    const { messages, enqueueSnackbar } = this.props;
    messages &&
      Object.keys(messages).forEach(key => {
        return enqueueSnackbar(messages[key], { variant: key });
      });
  }
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
                Yup.object().shape({
                  username: Yup.string().required("Username is required"),
                  password: Yup.string().required("Password is required")
                })
              }
              onSubmit={(values, { setSubmitting }) => {
                // manually submit the form
                document.getElementById("login-form").submit();
              }}
              render={({ touched, errors, isSubmitting }) => (
                <Form method="POST" action="/mac-cms/login" id="login-form">
                  <div className={classes.formContainer}>
                    <Field
                      id="username"
                      name="username"
                      render={({ field, form: { errors, touched } }) => (
                        <TextField
                          {...field}
                          label="Username"
                          className={classes.input}
                          inputProps={{
                            "aria-label": "Username"
                          }}
                          error={
                            touched.username && errors.username ? true : false
                          }
                          helperText={touched.username && errors.username}
                        />
                      )}
                    />

                    <Field
                      id="password"
                      name="password"
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Password"
                          className={classes.input}
                          inputProps={{
                            "aria-label": "Password"
                          }}
                          type="password"
                          error={
                            touched.password && errors.password ? true : false
                          }
                          helperText={touched.password && errors.password}
                        />
                      )}
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
    backgroundColor: "#03a9f4"
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

export default withStyles(styles)(withSnackbar(LoginForm));
