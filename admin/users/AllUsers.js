// @flow
import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import AdminContainer from "../common/AdminContainer";
import Heading from "../common/Heading";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Loading from "../common/Loading";
import moment from "moment";

type $Props = {
  classes: Object
};

type $State = {
  loading: boolean,
  users: Array<Object>
};

class AllUsers extends Component<$Props, $State> {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      users: []
    };
  }

  componentDidMount() {
    this.getAllUsers();
  }

  getAllUsers = () => {
    fetch("/mac-cms/api/users")
      .then(res => res.json())
      .then(users => this.setState({ users, loading: false }))
      .catch(err => console.error(err));
  };

  render() {
    const { classes } = this.props;
    const { loading, users } = this.state;
    if (loading) {
      return <Loading />;
    }
    return (
      <AdminContainer>
        <Paper className={classes.container}>
          <Heading heading="All Users" Icon={<AccountCircle />} />
          {users && users.length > 0 ? (
            <div className={classes.userTable}>
              <div
                className={classNames(
                  classes.userTableRow,
                  classes.userTableHeader
                )}
              >
                <div>
                  <Typography variant="subtitle2">ID</Typography>
                </div>
                <div>
                  <Typography variant="subtitle2">Username</Typography>
                </div>
                <div>
                  <Typography variant="subtitle2">First Name</Typography>
                </div>
                <div>
                  <Typography variant="subtitle2">Last Name</Typography>
                </div>
                <div>
                  <Typography variant="subtitle2">Email</Typography>
                </div>
                <div>
                  <Typography variant="subtitle2">Created At</Typography>
                </div>
                <div>
                  <Typography variant="subtitle2">Last Login</Typography>
                </div>
              </div>
              {users.map((user, i) => (
                <div key={i} className={classes.userTableRow}>
                  <div>
                    <Typography variant="body2">{user.id}</Typography>
                  </div>
                  <div>
                    <Typography variant="body2">{user.username}</Typography>
                  </div>
                  <div>
                    <Typography variant="body2">{user.first_name}</Typography>
                  </div>
                  <div>
                    <Typography variant="body2">{user.last_name}</Typography>
                  </div>
                  <div>
                    <Typography variant="body2">{user.email}</Typography>
                  </div>
                  <div>
                    <Typography variant="body2">
                      {user.created_at
                        ? moment(user.created_at).format("MM/DD/YYYY")
                        : "N/A"}
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="body2">
                      {user.last_login
                        ? moment(user.last_login).fromNow()
                        : "Never"}
                    </Typography>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <Typography variant="body1">No Users Found!</Typography>
          )}
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

export default withStyles(styles)(AllUsers);
