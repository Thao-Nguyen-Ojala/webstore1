import { Badge, Box, IconButton, Menu, MenuItem } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { AccountCircle, Close, ShoppingCart } from '@material-ui/icons';
import CodeIcon from '@material-ui/icons/Code';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import LogIn from '../../features/Auth/components/Login/Login';
import Register from '../../features/Auth/components/Register/Register';
import { logout } from '../../features/Auth/userSlice';
import CartNoti from '../../features/Cart/CartNoti';
import { cartItemsCountSelector } from '../../features/Cart/selectors';
import { CartState, UserState } from '../../interfaces';
import { useStyles } from './HeaderUseStyleHook';

const MODE = {
  LOGIN: 'login',
  REGISTER: 'register',
};

interface RootState {
  user: UserState;
  cart: CartState;
}

export default function Header() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const loggedInUser = useSelector((state: RootState) => state.user.current);
  const cartItemsCount = useSelector(cartItemsCountSelector);
  const miniCartOpen = useSelector((state: RootState) => state.cart.showMiniCart);
  const isLoggedIn = !!loggedInUser.id;
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(MODE.LOGIN);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUserClick = (e: any) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogoutCLick = () => {
    const action = logout();
    dispatch(action);
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

          {/*
            <NavLink className={classes.link} to='/todos'>
              <Button color='inherit'>Todo</Button>
            </NavLink>*/}

          <NavLink className={classes.link} to='/products'>
            <Button color='inherit'>Products</Button>
          </NavLink>
          {!isLoggedIn && (
            <Button color='inherit' onClick={handleClickOpen}>
              Login
            </Button>
          )}

          <MenuItem>
            <IconButton aria-label='cart' color='inherit'>
              <Badge badgeContent={cartItemsCount} color='secondary'>
                <ShoppingCart />
              </Badge>
            </IconButton>
            <p>Messages</p>
          </MenuItem>

          {miniCartOpen && <CartNoti />}

          {isLoggedIn && (
            <IconButton color='inherit' onClick={handleUserClick}>
              <AccountCircle />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        getContentAnchorEl={null}
      >
        <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
        <MenuItem onClick={handleLogoutCLick}>Logout</MenuItem>
      </Menu>

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
          {mode === MODE.LOGIN && (
            <>
              <LogIn closeDialog={handleClose} />

              <Box textAlign='center'>
                <Button color='primary' onClick={() => setMode(MODE.REGISTER)}>
                  Do not have an account? Click here to sign in
                </Button>
              </Box>
            </>
          )}
          {mode === MODE.REGISTER && (
            <>
              <Register closeDialog={handleClose} />

              <Box textAlign='center'>
                <Button color='primary' onClick={() => setMode(MODE.LOGIN)}>
                  Already have an account? Click here to login
                </Button>
              </Box>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
