// @flow
import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

type $Props = {
  showDialog: boolean,
  handleConfirmClose: Function,
  handlePermanentDelete: Function,
};

const ConfirmDelete = ({
  showDialog,
  handleConfirmClose,
  handlePermanentDelete,
}: $Props) => (
  <Dialog
    open={showDialog}
    onClose={handleConfirmClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        Deleting inactive users is a permanent action. Once they are deleted
        they can NOT be restored. Are you sure you want to do this?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleConfirmClose} autoFocus color="primary">
        Cancel
      </Button>
      <Button onClick={handlePermanentDelete} color="secondary">
        Delete
      </Button>
    </DialogActions>
  </Dialog>
);

export default ConfirmDelete;
