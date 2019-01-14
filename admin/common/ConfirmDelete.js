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
  headline: string,
  body: string,
};

const ConfirmDelete = ({
  showDialog,
  handleConfirmClose,
  handlePermanentDelete,
  headline,
  body,
}: $Props) => (
  <Dialog
    open={showDialog}
    onClose={handleConfirmClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">{headline}</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        {body}
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
