// @flow
import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withSnackbar } from "notistack";
import { MuiPickersUtilsProvider } from "material-ui-pickers";
import MomentUtils from "@date-io/moment";
import moment from "moment";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { withGlobalContext } from "../GlobalContext";
import AdminContainer from "../Common/AdminContainer";
import Heading from "../common/Heading";
import Paper from "@material-ui/core/Paper";
import Add from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import { DateTimePicker } from "material-ui-pickers";

import Wysiwyg from "./Editor";

type $Props = {
  classes: Object,
  user: Object
};
type $State = {
  publishDate: string
};

class NewPost extends Component<$Props, $State> {
  constructor(props) {
    super(props);

    this.state = {
      publishDate: moment().format()
    };
  }

  // make flow happy for ref
  postForm: any;

  handleDateChange = date => {
    const formattedDate = moment(date).format();
    this.setState({ publishDate: formattedDate }, () =>
      this.postForm.setFieldValue("published_at", formattedDate)
    );
  };

  render() {
    const { classes, user } = this.props;
    const { publishDate } = this.state;
    return (
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <AdminContainer>
          <Paper className={classes.container}>
            <Heading heading="New Post" Icon={<Add />} />
            <Formik
              ref={node => (this.postForm = node)}
              initialValues={{
                title: "",
                content: "",
                author: user.id,
                status: "draft",
                published_at: moment().format(),
                updated_at: moment().format()
              }}
              validationSchema={() =>
                Yup.object.shape({
                  title: Yup.string().required("Post title is required"),
                  content: Yup.string().required("Post content is required"),
                  author: Yup.integer(),
                  status: Yup.string().required("A post status is required"),
                  published_at: Yup.string()
                })
              }
              onSubmit={(values, { setSubmitting }) => {
                console.log(values);
              }}
              render={({ errors, touched, isSubmitting }) => (
                <Form noValidate id="newPost">
                  <div className={classes.postContainer}>
                    <Field
                      id="title"
                      name="title"
                      render={({ field, form: { errors, touched } }) => (
                        <TextField
                          {...field}
                          label="Title"
                          InputProps={{ "aria-label": "Title" }}
                          variant="outlined"
                          error={touched.title && errors.title ? true : false}
                          helperText={touched.title && errors.title}
                          className={classes.postTitle}
                        />
                      )}
                    />
                    <div className={classes.postBody}>
                      <div className={classes.postMain}>
                        <Field
                          id="content"
                          name="content"
                          render={({ form: { setFieldValue } }) => (
                            <Wysiwyg setFieldValue={setFieldValue} />
                          )}
                        />
                      </div>
                      <div className={classes.postSidebar}>
                        <Field
                          id="published_at"
                          name="published_at"
                          render={() => (
                            <DateTimePicker
                              value={publishDate}
                              onChange={this.handleDateChange}
                              label="Publish Date"
                              showTodayButton
                              className={classes.selectInput}
                            />
                          )}
                        />

                        <Field
                          id="status"
                          name="status"
                          render={({ field }) => (
                            <TextField
                              {...field}
                              select
                              label="Post Status"
                              className={classes.selectInput}
                              SelectProps={{
                                MenuProps: {
                                  className: classes.menu
                                }
                              }}
                              helperText="Select the status of the post"
                              margin="normal"
                              error={
                                touched.status && errors.status ? true : false
                              }
                            >
                              <MenuItem key={"draft"} value={"draft"}>
                                Draft
                              </MenuItem>
                              <MenuItem key={"published"} value={"published"}>
                                Published
                              </MenuItem>
                            </TextField>
                          )}
                        />
                        <div className={classes.buttonContainer}>
                          <Button
                            type="submit"
                            color="secondary"
                            variant="outlined"
                            className={classes.saveButton}
                          >
                            Save
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Form>
              )}
            />
          </Paper>
        </AdminContainer>
      </MuiPickersUtilsProvider>
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
  postContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    margin: "30px 0 20px",
    width: "100%"
  },
  postTitle: {
    width: "100%"
  },
  postBody: {
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "space-between",
    alignItems: "stretch",
    width: "100%",
    padding: "20px 0 0"
  },
  postMain: {
    flex: "0 0 75%"
  },
  postSidebar: {
    flex: "0 0 25%",
    paddingLeft: theme.spacing.unit * 2
  },
  selectInput: {
    marginBottom: "12px",
    width: "100%"
  },
  buttonContainer: {
    marginTop: "22px",
    width: "100%"
  },
  saveButton: {
    width: "100%"
  }
});

export default withStyles(styles)(withGlobalContext(withSnackbar(NewPost)));
