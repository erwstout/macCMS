// @flow
import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import AdminContainer from "../common/AdminContainer";
import Heading from "../common/Heading";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Delete from "@material-ui/icons/Delete";
import CreateIcon from "@material-ui/icons/Create";
import Loading from "../common/Loading";
import { withGlobalContext } from "../GlobalContext";
import PostsTable from "./PostsTable";
import values from "lodash/values";
import { withSnackbar } from "notistack";

type $Props = {
  classes: Object,
  user: Object,
  enqueueSnackbar: Function
};

type $State = {
  loading: boolean,
  posts: Array<Object>
};

class AllPosts extends Component<$Props, $State> {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      posts: []
    };
  }

  componentDidMount() {
    this.getAllPosts();
  }

  getAllPosts = () => {
    return fetch("/mac-cms/api/posts/all")
      .then(res => res.json())
      .then(posts => this.setState({ posts, loading: false }))
      .catch(err => {
        console.error(err);
        return this.props.enqueueSnackbar("Error loading posts", {
          variant: "error"
        });
      });
  };

  render() {
    const { classes } = this.props;
    const { loading, posts } = this.state;
    if (loading) {
      return <Loading />;
    } else {
      return (
        <AdminContainer>
          <Paper className={classes.container}>
            <Heading heading="All Posts" Icon={<CreateIcon />} />
            <PostsTable
              orderBy="published_at"
              tableTitle="All Posts"
              data={posts}
              getAllPosts={this.getAllPosts}
            />
          </Paper>
        </AdminContainer>
      );
    }
  }
}

const styles = theme => ({
  container: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width: "100%"
  },
  userTable: {
    display: "flex",
    position: "relative",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    margin: "20px 0 10px",
    border: `1px solid ${theme.palette.grey["300"]}`,
    borderRadius: 4
  },
  userTableRow: {
    flex: "0 0 auto",
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
    padding: 8,
    "& > div": {
      flex: "0 0 14.28%",
      padding: "0 4px"
    }
  },
  userTableHeader: {
    backgroundColor: theme.palette.grey["300"]
  }
});

export default withStyles(styles)(withGlobalContext(withSnackbar(AllPosts)));
