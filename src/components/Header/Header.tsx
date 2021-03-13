import { IconButton } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Close } from '@material-ui/icons';
import CodeIcon from '@material-ui/icons/Code';
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import LogIn from '../../features/Auth/components/Login/Login';
import Register from '../../features/Auth/components/Register/Register';
import { useStyles } from './HeaderUseStyleHook';

export default function Header() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <CodeIcon className={classes.menuButton} />
          <Typography variant='h6' className={classes.title}>
            <Link className={classes.link} to='/'>
              Thao
            </Link>
          </Typography>

          <NavLink className={classes.link} to='/todos'>
            <Button color='inherit'>Todo</Button>
          </NavLink>

          <NavLink className={classes.link} to='/albums'>
            <Button color='inherit'>Albums</Button>
          </NavLink>

          <Button color='inherit' onClick={handleClickOpen}>
            Register
          </Button>
        </Toolbar>
      </AppBar>

      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <IconButton className={classes.closeButton} onClick={handleClose}>
          <Close />
        </IconButton>
        <DialogContent>
          <LogIn closeDialog={handleClose} />
          <Register closeDialog={handleClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
