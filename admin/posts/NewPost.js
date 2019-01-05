// @flow
import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { withSnackbar } from "notistack";
import { MuiPickersUtilsProvider } from "material-ui-pickers";
import MomentUtils from "@date-io/moment";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { withGlobalContext } from "../GlobalContext";
import AdminContainer from "../Common/AdminContainer";
import Heading from "../common/Heading";
import Paper from "@material-ui/core/Paper";
import Add from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";
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
      publishDate: new Date()
    };
  }

  handleDateChange = date => {
    this.setState({ publishDate: date });
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
              initialValues={{
                title: "",
                content: "",
                author: user.id,
                status: "draft",
                published_at: ""
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
                        <DateTimePicker
                          value={publishDate}
                          onChange={this.handleDateChange}
                          label="Publish Date"
                          showTodayButton
                        />
                        <Button
                          className={classes.saveButton}
                          type="submit"
                          color="primary"
                        >
                          Save
                        </Button>
                        <Button
                          type="submit"
                          color="secondary"
                          variant="outlined"
                        >
                          Publish
                        </Button>
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
  saveButton: {
    marginRight: theme.spacing.unit
  }
});

export default withStyles(styles)(withGlobalContext(withSnackbar(NewPost)));
