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
import { Link } from "react-router-dom";
import { withSnackbar } from "notistack";

import { withGlobalContext } from "../GlobalContext";
import AdminContainer from "../Common/AdminContainer";
import Heading from "../common/Heading";

type $Props = {
  classes: Object,
  user: Object,
  enqueueSnackbar: function,
};

type $State = {
  success: boolean,
  error: boolean
};

class NewUser extends Component<$Props, $State> {
  constructor(props) {
    super(props);

    this.state = {
      success: false,
      error: false
    };
  }

  // make flow happy
  newUserForm: any;

  handleReset = () => {
    this.newUserForm.resetForm();
  };

  render() {
    const { classes } = this.props;
    return (
      <AdminContainer>
        <Paper className={classes.container}>
          <Heading heading="Add User" Icon={<Add />} />
          <Formik
            enableReinitialize
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
              Yup.object().shape({
                username: Yup.string().required("Username is required"),
                password: Yup.string()
                  .min(9, "Password must be at least 9 characters")
                  .required("Password is required"),
                first_name: Yup.string().required("First Name is required"),
                last_name: Yup.string().required("Last Name is required"),
                email: Yup.string()
                  .email("Invalid Email")
                  .required("Email is required"),
                twitter_url: Yup.string().url(
                  "Invalid URL, must include http:// or https://"
                ),
                facebook_url: Yup.string().url(
                  "Invalid URL, must include http:// or https://"
                ),
                linkedin_url: Yup.string().url(
                  "Invalid URL, must include http:// or https://"
                ),
                instagram_url: Yup.string().url(
                  "Invalid URL, must include http:// or https://"
                ),
                youtube_url: Yup.string().url(
                  "Invalid URL, must include http:// or https://"
                ),
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
                .then(res => {
                  if (res === "Created") {
                    this.handleReset();
                    return this.props.enqueueSnackbar(
                      "User created successfully",
                      { variant: "success" }
                    );
                  } else {
                    return this.props.enqueueSnackbar("Error creating user", {
                      variant: "error"
                    });
                  }
                })
                .catch(err => {
                  console.error(err);
                  return this.props.enqueueSnackbar("Error creating user", {
                    variant: "error"
                  });
                });
            }}
            ref={node => (this.newUserForm = node)}
            render={({ errors, touched, isSubmitting, resetForm }) => (
              <Form noValidate id="newUser">
                <Typography className={classes.sectionHeadline} variant="h6">
                  User Information
                </Typography>
                <div className={classes.formContainer}>
                  <Field
                    id="username"
                    name="username"
                    render={({ field, form: { errors, touched } }) => (
                      <TextField
                        {...field}
                        label="Username"
                        className={classes.input}
                        InputProps={{
                          "aria-label": "Username"
                        }}
                        required
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
                        InputProps={{
                          "aria-label": "Password"
                        }}
                        required
                        type="password"
                        error={
                          touched.password && errors.password ? true : false
                        }
                        helperText={touched.password && errors.password}
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
                        InputProps={{
                          "aria-label": "First Name"
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
                        InputProps={{
                          "aria-label": "Last Name"
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
                        InputProps={{
                          "aria-label": "Email"
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
                        InputProps={{
                          "aria-label": "Twitter URL "
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
                        InputProps={{
                          "aria-label": "Facebook URL "
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
                        InputProps={{
                          "aria-label": "LinkedIn URL "
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
                        InputProps={{
                          "aria-label": "Instagram URL "
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
                        InputProps={{
                          "aria-label": "YouTube URL "
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
                          error={
                            touched.user_type && errors.user_type ? true : false
                          }
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
                  disabled={isSubmitting}
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
  },
  informationText: {
    margin: "26px 0 16px"
  }
});

export default withStyles(styles)(withGlobalContext(withSnackbar(NewUser)));
