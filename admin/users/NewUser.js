// @flow
import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Add from "@material-ui/icons/Add";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";

import { withGlobalContext } from "../GlobalContext";
import AdminContainer from "../Common/AdminContainer";
import Heading from "../common/Heading";

type $Props = {
  classes: Object,
  user: Object
};

class NewUser extends Component<$Props> {
  render() {
    const { classes } = this.props;
    return (
      <AdminContainer>
        <Paper className={classes.container}>
          <Heading heading="Add User" Icon={<Add />} />
          <Formik
            initialValues={{
              username: "",
              password: "",
              first_name: "",
              last_name: "",
              email: "",
              twitter_url: "",
              facebook_url: "",
              linkedin_url: "",
              instagram_url: "",
              youtube_url: "",
              user_type: "standard",
              created_by: this.props.user.id
            }}
            validationSchema={() =>
              Yup.Object().shape({
                username: Yup.string().required("Username is required"),
                password: Yup.string().required("Password is required"),
                first_name: Yup.string().required("First Name is required"),
                last_name: Yup.string().required("Last Name is required"),
                email: Yup.email().required("Email is required"),
                twitter_url: Yup.string(),
                facebook_url: Yup.string(),
                linkedin_url: Yup.string(),
                instagram_url: Yup.string(),
                youtube_url: Yup.string(),
                user_type: Yup.string().required("User Type is required"),
                created_by: Yup.string()
              })
            }
            onSubmit={(values, { setSubmitting }) => {
              console.log(values);
              return fetch("/mac-cms/api/users/add", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
              })
                .then(res => res.text())
                .then(res => console.log(res))
                .catch(err => console.error(err));
            }}
            render={({ isSubmitting, resetForm }) => (
              <Form noValidate id="newUser">
                <Typography className={classes.sectionHeadline} variant="h6">
                  User Information
                </Typography>
                <div className={classes.formContainer}>
                  <Field
                    id="username"
                    name="username"
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Username"
                        className={classes.input}
                        inputProps={{
                          "aria-label": "Username"
                        }}
                        required
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
                        required
                        type="password"
                      />
                    )}
                  />
                  <Field
                    id="first_name"
                    name="first_name"
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="First Name"
                        className={classes.input}
                        inputProps={{
                          "aria-label": "First Name"
                        }}
                        required
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
                          "aria-label": "Last Name"
                        }}
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
                          "aria-label": "Email"
                        }}
                        type="email"
                        required
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
                          "aria-label": "Twitter URL "
                        }}
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
                          "aria-label": "Facebook URL "
                        }}
                        type="url"
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
                          "aria-label": "LinkedIn URL "
                        }}
                        type="url"
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
                          "aria-label": "Instagram URL "
                        }}
                        type="url"
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
                          "aria-label": "YouTube URL "
                        }}
                        type="url"
                      />
                    )}
                  />
                </div>
                <div>
                  <Typography className={classes.sectionHeadline} variant="h6">
                    User Settings
                  </Typography>
                </div>
                <div className={classes.formContainer}>
                  <Field
                    id="user_type"
                    name="user_type"
                    render={({ field }) => {
                      return (
                        <TextField
                          {...field}
                          select
                          label="User Type"
                          className={classes.input}
                          SelectProps={{
                            MenuProps: {
                              className: classes.menu
                            }
                          }}
                          helperText="Please select a user type. Super Admins have full access (including creating users). Standard users can edit, create, and delete posts and pages. Limited users can only create, edit, and delete posts."
                          margin="normal"
                        >
                          <MenuItem key={"super"} value={"super"}>
                            Super Admin
                          </MenuItem>
                          <MenuItem key={"standard"} value={"standard"}>
                            Standard User
                          </MenuItem>
                          <MenuItem key={"limited"} value={"limited"}>
                            Limited User
                          </MenuItem>
                        </TextField>
                      );
                    }}
                  />
                </div>
                <Divider className={classes.bottomDivider} />
                <Button
                  className={classes.button}
                  type="submit"
                  variant="contained"
                  color="secondary"
                >
                  <Add /> Add User
                </Button>
              </Form>
            )}
          />
        </Paper>
      </AdminContainer>
    );
  }
}

const styles = theme => ({
  container: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width: "100%"
  },
  input: {
    margin: theme.spacing.unit,
    width: "100%"
  },
  sectionHeadline: {
    margin: `40px ${theme.spacing.unit} 0`
  },
  formContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gridColumnGap: "50px"
  },
  menu: {
    width: 200
  },
  bottomDivider: {
    margin: "20px 0"
  },
  button: {
    marginRight: theme.spacing.unit
  }
});

export default withStyles(styles)(withGlobalContext(NewUser));
