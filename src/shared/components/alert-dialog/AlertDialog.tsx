import styles from './AlertDialog.module.scss';

import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';   

interface Props {
  open: boolean;
  onClose: () => void;
  onContinue: () => void;
}

const AlertDialog = ({ open, onClose, onContinue}: Props) => {

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{
        className: styles['alert-dialog']
      }}
    >
      <DialogTitle>
        {"Are you sure to continue?"}
      </DialogTitle>
      <DialogActions>
        <Button onClick={onContinue} autoFocus>Yes</Button>
        <Button onClick={onClose}>No</Button>
      </DialogActions>
    </Dialog>
  );
}

export default AlertDialog
