import React from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import { lighten } from "@material-ui/core/styles/colorManipulator";
import moment from "moment";
import { withSnackbar } from "notistack";

type $Props = {
  handleDelete: Function,
  tableTitle: string,
  orderBy: any,
  data: Array<Object>,
  getAllUsers?: Function,
  enqueueSnackbar?: Function,
  onSelectAllClick: Function,
  order: any,
  numSelected: number,
  rowCount: number,
  onRequestSort?: Function,
  classes: Object,
};

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

const rows = [
  {
    id: "id",
    numeric: true,
    disablePadding: true,
    label: "ID",
  },
  { id: "username", numeric: false, disablePadding: false, label: "Username" },
  {
    id: "user_type",
    numeric: false,
    disablePadding: false,
    label: "User Type",
  },
  {
    id: "first_name",
    numeric: false,
    disablePadding: false,
    label: "First Name",
  },
  {
    id: "last_name",
    numeric: false,
    disablePadding: false,
    label: "Last Name",
  },
  { id: "email", numeric: false, disablePadding: false, label: "Email" },
  {
    id: "created_at",
    numeric: false,
    disablePadding: false,
    label: "Created On",
  },
  {
    id: "last_login",
    numeric: false,
    disablePadding: false,
    label: "Last Login",
  },
];

class EnhancedTableHead extends React.Component<$Props> {
  createSortHandler = (property) => (event) => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount,
    } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {rows.map((row) => {
            return (
              <TableCell
                key={row.id}
                align="left"
                padding={row.disablePadding ? "none" : "default"}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? "bottom-end" : "bottom-start"}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

const toolbarStyles = (theme) => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: "1 1 100%",
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: "0 0 auto",
  },
});

let EnhancedTableToolbar = (props: $Props) => {
  const { numSelected, classes } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
      handleDelete={props.handleDelete}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="h6" id="tableTitle">
            {props.tableTitle}
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip handleDelete={props.handleDelete} title="Delete">
            <IconButton
              onClick={() => props.handleDelete()}
              aria-label="Delete"
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : null}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = (theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 0,
  },
  tableWrapper: {
    overflowX: "scroll",
  },
});

class UserTable extends React.Component<$Props> {
  state = {
    order: "asc",
    orderBy: this.props.orderBy,
    selected: [],
    data: this.props.data,
    page: 0,
    rowsPerPage: 25,
  };

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      this.setState({ data: this.props.data });
    }
  }

  handleDelete = () => {
    const users = this.state.selected;
    if (!users) {
      return null;
    }

    return users.forEach((user) => {
      fetch(`/mac-cms/api/users/delete/${user}`, {
        method: "POST",
      })
        .then((res) => res.text())
        .then(() => this.props.getAllUsers())
        .then(() =>
          this.setState({ selected: [] }, () =>
            this.props.enqueueSnackbar("Successfully deleted user", {
              variant: "success",
            })
          )
        )
        .catch((err) => {
          /* eslint-disable-next-line */
          console.error(err);
          this.props.enqueueSnackbar("User deletion failed, please try again", {
            variant: "error",
          });
        });
    });
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = (event) => {
    if (event.target.checked) {
      this.setState((state) => ({ selected: state.data.map((n) => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = (id) => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <Paper className={classes.root} elevation={0}>
        <EnhancedTableToolbar
          tableTitle={this.props.tableTitle}
          numSelected={selected.length}
          handleDelete={this.handleDelete}
        />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {stableSort(data, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((n) => {
                  const isSelected = this.isSelected(n.id);
                  return (
                    <TableRow
                      hover
                      onClick={(event) => this.handleClick(event, n.id)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.id}
                      selected={isSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isSelected} />
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        {n.id}
                      </TableCell>
                      <TableCell align="left">{n.username}</TableCell>
                      <TableCell align="left">{n.user_type}</TableCell>
                      <TableCell align="left">{n.first_name}</TableCell>
                      <TableCell align="left">{n.last_name}</TableCell>
                      <TableCell align="left">{n.email}</TableCell>
                      <TableCell align="left">
                        {moment(n.created_at).format("MM/DD/YYYY")}
                      </TableCell>
                      <TableCell align="left">
                        {n.last_login
                          ? moment(n.last_login).format("MM/DD/YYYY, h:mm a")
                          : "Never"}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow>
                  <TableCell colSpan={9} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            "aria-label": "Previous Page",
          }}
          nextIconButtonProps={{
            "aria-label": "Next Page",
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

export default withStyles(styles)(withSnackbar(UserTable));
