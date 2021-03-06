// @flow
import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import AdminContainer from "../common/AdminContainer";
import Heading from "../common/Heading";
import Paper from "@material-ui/core/Paper";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Loading from "../common/Loading";
import NoAccess from "../NoAccess";
import { withGlobalContext } from "../GlobalContext";
import UserTable from "./UserTable";

type $Props = {
  classes: Object,
  user: Object,
};

type $State = {
  loading: boolean,
  users: Array<Object>,
  restricted: boolean,
};

class AllUsers extends Component<$Props, $State> {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      users: [],
      restricted: false,
    };
  }

  componentDidMount() {
    if (this.props.user && this.props.user.user_type === "super") {
      this.getAllUsers();
    } else {
      this.setRestricted();
    }
  }

  getAllUsers = () => {
    return (
      fetch("/mac-cms/api/users")
        .then((res) => res.json())
        .then((users) => this.setState({ users, loading: false }))
        /* eslint-disable-next-line */
        .catch((err) => console.error(err))
    );
  };

  setRestricted = () => {
    this.setState({ restricted: true, loading: false });
  };

  render() {
    const { classes } = this.props;
    const { loading, users, restricted } = this.state;
    if (loading) {
      return <Loading />;
    } else if (restricted && !loading) {
      return <NoAccess />;
    } else {
      return (
        <AdminContainer>
          <Paper className={classes.container}>
            <Heading heading="All Users" Icon={<AccountCircle />} />
            <UserTable
              orderBy="id"
              tableTitle="Active Users"
              data={users}
              getAllUsers={this.getAllUsers}
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

export default withStyles(styles)(withGlobalContext(AllUsers));
