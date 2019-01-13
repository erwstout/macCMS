import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import AdminContainer from "../common/AdminContainer";
import Heading from "../common/Heading";
import Paper from "@material-ui/core/Paper";
import Delete from "@material-ui/icons/Delete";
import Loading from "../common/Loading";
import { withGlobalContext } from "../GlobalContext";
import DeletedPostsTable from "./DeletedPostsTable";
import { withSnackbar } from "notistack";

type $Props = {
  classes: Object,
  user: Object,
  enqueueSnackbar: Function,
};

type $State = {
  loading: boolean,
  posts: Array<Object>,
};

class DeletedPosts extends Component<$Props, $State> {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      posts: [],
    };
  }

  componentDidMount() {
    this.getDeletedPosts();
  }

  getDeletedPosts = () => {
    return fetch("/mac-cms/api/posts/deleted")
      .then((res) => res.json())
      .then((posts) => this.setState({ posts, loading: false }))
      .catch((err) => {
        /* eslint-disable-next-line */
        console.error(err);
        return this.props.enqueueSnackbar("Error loading posts", {
          variant: "error",
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
            <Heading heading="All Deleted Posts" Icon={<Delete />} />
            <DeletedPostsTable
              orderBy="deleted_at"
              tableTitle="All Deleted Posts"
              data={posts}
              getDeletedPosts={this.getDeletedPosts}
            />
          </Paper>
        </AdminContainer>
      );
    }
  }
}

const styles = (theme) => ({
  container: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width: "100%",
  },
  userTable: {
    display: "flex",
    position: "relative",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    margin: "20px 0 10px",
    border: `1px solid ${theme.palette.grey["300"]}`,
    borderRadius: 4,
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
      padding: "0 4px",
    },
  },
  userTableHeader: {
    backgroundColor: theme.palette.grey["300"],
  },
});

export default withStyles(styles)(
  withGlobalContext(withSnackbar(DeletedPosts))
);
