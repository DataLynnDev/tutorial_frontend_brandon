import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

const CommonDialog = ({
  open,
  title,
  content,
  cancelBtnText,
  confirmBtnText,
  onCancelClick,
  onConfirmClick,
  tutorial,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onCancelClick}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth="xs"
      disableEnforceFocus
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onCancelClick}>
          {cancelBtnText}
        </Button>
        <Button variant="contained" onClick={onConfirmClick}>
          {confirmBtnText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CommonDialog;
