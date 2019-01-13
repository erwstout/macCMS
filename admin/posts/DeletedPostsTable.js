import React, { Fragment } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
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
import RestoreIcon from "@material-ui/icons/Restore";

type $Props = {
  handleDelete: Function,
  handleRestore: Function,
  tableTitle: string,
  order: string,
  orderBy: string,
  data: Array<Object>,
  getDeletedPosts: Function,
  enqueueSnackbar: Function,
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
  { id: "title", numeric: false, disablePadding: false, label: "Title" },
  {
    id: "author",
    numeric: false,
    disablePadding: false,
    label: "Author",
  },
  { id: "status", numeric: false, disablePadding: false, label: "Status" },

  {
    id: "published_at",
    numeric: false,
    disablePadding: false,
    label: "Published",
  },
  {
    id: "updated_at",
    numeric: false,
    disablePadding: false,
    label: "Updated",
  },
  {
    id: "deleted_at",
    numeric: false,
    disablePadding: false,
    label: "Deleted",
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

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

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
    display: "flex",
    flexFlow: "row nowrap",
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
      handleRestore={props.handleRestore}
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
          <Fragment>
            <Tooltip handleDelete={props.handleDelete} title="Delete">
              <IconButton
                onClick={() => props.handleDelete()}
                aria-label="Delete"
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
            <Tooltip handleRestore={props.handleRestore} title="Restore">
              <IconButton
                onClick={() => props.handleRestore()}
                aria-label="Restore"
              >
                <RestoreIcon />
              </IconButton>
            </Tooltip>
          </Fragment>
        ) : null}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
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

class DeletedPostsTable extends React.Component<$Props> {
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

  handleRestore = () => {
    const users = this.state.selected;
    return users.forEach((user) => {
      fetch(`/mac-cms/api/posts/restore/${user}`, {
        method: "POST",
      })
        .then((res) => res.text())
        .then(() => this.props.getDeletedPosts())
        .then(() =>
          this.setState({ selected: [] }, () =>
            this.props.enqueueSnackbar("Post restored", {
              variant: "success",
            })
          )
        )
        .catch((err) => {
          /* eslint-disable-next-line */
          console.error(err);
          this.props.enqueueSnackbar("Post not restored", {
            variant: "error",
          });
        });
    });
  };

  handleDelete = () => {
    const posts = this.state.selected;
    if (!posts) {
      return null;
    }

    return posts.forEach((post) => {
      fetch(`/mac-cms/api/posts/remove/${post}`, {
        method: "POST",
      })
        .then((res) => {
          if (res.status >= 200 && res.status < 300) {
            return res;
          } else {
            /* eslint-disable-next-line */
            console.error("Error deleting post(s)", res.text());
            this.props.enqueueSnackbar(res.text(), { variant: "error" });
          }
        })
        .then(() => this.props.getDeletedPosts())
        .then(() =>
          this.setState({ selected: [] }, () =>
            this.props.enqueueSnackbar("Successfully deleted post", {
              variant: "success",
            })
          )
        )
        .catch((err) => {
          /* eslint-disable-next-line */
          console.error(err);
          this.props.enqueueSnackbar(
            "Post(s) deletion failed, please try again",
            {
              variant: "error",
            }
          );
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
          handleRestore={this.handleRestore}
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
                      <TableCell align="left">{n.title}</TableCell>
                      <TableCell align="left">{n.author}</TableCell>
                      <TableCell align="left">{n.status}</TableCell>
                      <TableCell align="left">
                        {n.published_at &&
                          moment(n.published_at).format("MM/DD/YYYY, h:mm a")}
                      </TableCell>
                      <TableCell align="left">
                        {n.updated_at &&
                          moment(n.updated_at).format("MM/DD/YYYY, h:mm a")}
                      </TableCell>
                      <TableCell align="left">
                        {n.deleted_at &&
                          moment(n.deleted_at).format("MM/DD/YYYY, h:mm a")}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow>
                  <TableCell colSpan={6} />
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

export default withStyles(styles)(withSnackbar(DeletedPostsTable));
