// @flow
import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withGlobalContext } from "../GlobalContext";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import UpdateIcon from "@material-ui/icons/Update";
import AccountCircle from "@material-ui/icons/AccountCircle";
import LockIcon from "@material-ui/icons/Lock";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { withSnackbar } from "notistack";

import AdminContainer from "../common/AdminContainer";
import Heading from "../common/Heading";

type $Props = {
  classes: Object,
  user: Object,
  enqueueSnackbar: Function,
};

type $State = {
  successSnackOpen: boolean,
  failureSnackOpen: boolean,
  incorrectPassword: boolean,
};

class MyAccount extends Component<$Props, $State> {
  constructor(props) {
    super(props);

    this.state = {
      successSnackOpen: false,
      failureSnackOpen: false,
      incorrectPassword: false,
    };
  }

  handleSuccessClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ successSnackOpen: false });
  };

  handleFailureClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ failureSnackOpen: false });
  };

  render() {
    const { classes, user } = this.props;

    return (
      <AdminContainer>
        <Paper className={classes.container}>
          <Heading heading="My Account" Icon={<AccountCircle />} />
          <Typography className={classes.header} variant="h6">
            User Information
          </Typography>
          <Divider className={classes.divider} />
          <Formik
            initialValues={{
              id: user.id,
              first_name: user.first_name,
              last_name: user.last_name,
              email: user.email,
              twitter_url: user.twitter_url,
              facebook_url: user.facebook_url,
              linkedin_url: user.linkedin_url,
              instagram_url: user.instagram_url,
              youtube_url: user.youtube_url,
            }}
            validationSchema={() =>
              Yup.object().shape({
                first_name: Yup.string().required("First Name is required"),
                last_name: Yup.string().required("Last Name is required"),
                email: Yup.string()
                  .email("Invalid Email")
                  .required("Email is required"),
                twitter_url: Yup.string()
                  .url("Invalid URL, must include http:// or https://")
                  .nullable(),
                facebook_url: Yup.string()
                  .url("Invalid URL, must include http:// or https://")
                  .nullable(),
                linkedin_url: Yup.string()
                  .url("Invalid URL, must include http:// or https://")
                  .nullable(),
                instagram_url: Yup.string()
                  .url("Invalid URL, must include http:// or https://")
                  .nullable(),
                youtube_url: Yup.string()
                  .url("Invalid URL, must include http:// or https://")
                  .nullable(),
              })
            }
            onSubmit={(values, { setSubmitting }) => {
              return fetch("/mac-cms/api/users/update", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
              })
                .then((res) => res.text())
                .then((res) => {
                  if (res === "Accepted") {
                    this.props.enqueueSnackbar("Account information updated", {
                      variant: "success",
                    });
                  } else {
                    this.props.enqueueSnackbar(
                      "Failed to update account information",
                      { variant: "error" }
                    );
                  }
                  setSubmitting(false);
                })
                .catch((err) => {
                  /* eslint-disable-next-line */
                  console.error(err);
                  this.props.enqueueSnackbar(
                    "Failed to update account information",
                    { variant: "error" }
                  );
                });
            }}
            render={({ errors, touched, isSubmitting }) => (
              <Form noValidate id="updateUser">
                <div className={classes.formContainer}>
                  <Field
                    id="first_name"
                    name="first_name"
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="First Name"
                        className={classes.input}
                        inputProps={{
                          "aria-label": "First Name",
                        }}
                        required
                        error={
                          touched.first_name && errors.first_name ? true : false
                        }
                        helperText={touched.first_name && errors.first_name}
                      />
                    )}
                  />
                  <Field
                    id="last_name"
                    name="last_name"
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Last Name"
                        className={classes.input}
                        inputProps={{
                          "aria-label": "Last Name",
                        }}
                        error={
                          touched.last_name && errors.last_name ? true : false
                        }
                        helperText={touched.last_name && errors.last_name}
                        required
                      />
                    )}
                  />
                  <Field
                    id="email"
                    name="email"
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Email"
                        className={classes.input}
                        inputProps={{
                          "aria-label": "Email",
                        }}
                        type="email"
                        required
                        error={touched.email && errors.email ? true : false}
                        helperText={touched.email && errors.email}
                      />
                    )}
                  />
                  <Field
                    id="twitter_url"
                    name="twitter_url"
                    type="url"
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Twitter URL "
                        className={classes.input}
                        inputProps={{
                          "aria-label": "Twitter URL ",
                        }}
                        error={
                          touched.twitter_url && errors.twitter_url
                            ? true
                            : false
                        }
                        helperText={touched.twitter_url && errors.twitter_url}
                      />
                    )}
                  />
                  <Field
                    id="facebook_url"
                    name="facebook_url"
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Facebook URL "
                        className={classes.input}
                        inputProps={{
                          "aria-label": "Facebook URL ",
                        }}
                        type="url"
                        error={
                          touched.facebook_url && errors.facebook_url
                            ? true
                            : false
                        }
                        helperText={touched.facebook_url && errors.facebook_url}
                      />
                    )}
                  />
                  <Field
                    id="linkedin_url"
                    name="linkedin_url"
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="LinkedIn URL "
                        className={classes.input}
                        inputProps={{
                          "aria-label": "LinkedIn URL ",
                        }}
                        type="url"
                        error={
                          touched.linkedin_url && errors.linkedin_url
                            ? true
                            : false
                        }
                        helperText={touched.linkedin_url && errors.linkedin_url}
                      />
                    )}
                  />
                  <Field
                    id="instagram_url"
                    name="instagram_url"
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Instagram URL "
                        className={classes.input}
                        inputProps={{
                          "aria-label": "Instagram URL ",
                        }}
                        type="url"
                        error={
                          touched.instagram_url && errors.instagram_url
                            ? true
                            : false
                        }
                        helperText={
                          touched.instagram_url && errors.instagram_url
                        }
                      />
                    )}
                  />
                  <Field
                    id="youtube_url"
                    name="youtube_url"
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="YouTube URL "
                        className={classes.input}
                        inputProps={{
                          "aria-label": "YouTube URL ",
                        }}
                        type="url"
                        error={
                          touched.youtube_url && errors.youtube_url
                            ? true
                            : false
                        }
                        helperText={touched.youtube_url && errors.youtube_url}
                      />
                    )}
                  />
                </div>
                <Button
                  className={classes.button}
                  type="submit"
                  variant="contained"
                  color="secondary"
                  disabled={isSubmitting}
                >
                  <UpdateIcon className={classes.updateIcon} /> Update User
                </Button>
              </Form>
            )}
          />
          <Typography className={classes.header} variant="h6">
            User Security
          </Typography>
          <Divider className={classes.divider} />
          <Typography className={classes.subHeading} variant="subtitle1">
            Change Password
          </Typography>
          <Formik
            initialValues={{
              currentPassword: "",
              newPassword: "",
              id: user.id,
            }}
            validationSchema={() =>
              Yup.object().shape({
                currentPassword: Yup.string()
                  .min(9, "Must be at least 9 characters long")
                  .required("Current password is required"),
                newPassword: Yup.string()
                  .min(9, "Must be at least 9 characters long")
                  .required("New password is required"),
                id: Yup.string(),
              })
            }
            onSubmit={(values, { setSubmitting, resetForm }) => {
              return fetch("/mac-cms/api/users/change-password", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
              })
                .then((res) => res.text())
                .then((res) => {
                  if (res === "Accepted") {
                    this.props.enqueueSnackbar("Password updated", {
                      variant: "success",
                    });
                  } else if (res === "Unauthorized") {
                    this.props.enqueueSnackbar("Failed to update password", {
                      variant: "error",
                    });
                  } else {
                    this.setState({ failureSnackOpen: true });
                  }
                  setSubmitting(false);
                  resetForm();
                })
                .catch((err) => {
                  /* eslint-disable-next-line */
                  console.error(err);
                  this.props.enqueueSnackbar("Failed to update password", {
                    variant: "error",
                  });
                });
            }}
            render={() => (
              <Form noValidate id="changePassword">
                <div className={classes.formContainer}>
                  <Field
                    id="currentPassword"
                    name="currentPassword"
                    render={({ field, form: { errors, touched } }) => (
                      <TextField
                        {...field}
                        label="Current Password"
                        className={classes.input}
                        inputProps={{
                          "aria-label": "Current Password",
                        }}
                        required
                        type="password"
                        error={
                          touched.currentPassword && errors.currentPassword
                            ? true
                            : false
                        }
                        helperText={
                          touched.currentPassword && errors.currentPassword
                        }
                      />
                    )}
                  />
                  <Field
                    id="newPassword"
                    name="newPassword"
                    render={({ field, form: { errors, touched } }) => (
                      <TextField
                        {...field}
                        label="New Password"
                        className={classes.input}
                        inputProps={{
                          "aria-label": "New Password",
                        }}
                        required
                        type="password"
                        error={
                          touched.newPassword && errors.newPassword
                            ? true
                            : false
                        }
                        helperText={touched.newPassword && errors.newPassword}
                      />
                    )}
                  />
                </div>
                <Button
                  className={classes.button}
                  color="secondary"
                  variant="contained"
                  type="submit"
                >
                  <LockIcon className={classes.updateIcon} />
                  Update Password
                </Button>
              </Form>
            )}
          />
        </Paper>
      </AdminContainer>
    );
  }
}

const styles = (theme) => ({
  container: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width: "100%",
  },
  header: {
    margin: `26px ${theme.spacing.unit} 0`,
  },
  subHeading: {
    marginLeft: theme.spacing.unit,
  },
  input: {
    margin: theme.spacing.unit,
    width: "100%",
  },
  divider: {
    margin: `20px ${theme.spacing.unit}`,
  },
  button: {
    margin: `${theme.spacing.unit * 4} ${theme.spacing.unit}`,
  },
  updateIcon: {
    marginRight: theme.spacing.unit,
  },
  formContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gridColumnGap: "50px",
  },
  close: {
    padding: theme.spacing.unit / 2,
  },
  snack: {
    bottom: 24,
  },
});

export default withStyles(styles)(withGlobalContext(withSnackbar(MyAccount)));
