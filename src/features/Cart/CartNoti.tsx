import { Button, Dialog, IconButton, makeStyles, Paper, Snackbar, Typography } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router';
import CloseIcon from '@material-ui/icons/Close';
import { useDispatch } from 'react-redux';
import { hideMiniCart } from './cartSlice';

const useStyle = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(5),
    marginRight: theme.spacing(2),
    backgroundColor: '#e4e4e4',
    display: 'block',
    textAlign: 'center',
  },

  msg: {
    color: '#313131',
  },

  btn: {
    backgroundColor: '#4CAF50',
    padding: theme.spacing(1),
    margin: 'auto',
  },
}));

export default function CartNoti() {
  const classes = useStyle();
  const dispatch = useDispatch();
  const history = useHistory();
  const gotoCart = () => {
    history.push(`/cart`);
  };
  const handleClose = () => {
    const action = hideMiniCart();
    dispatch(action);
  };
  return (
    <Paper elevation={3}>
      <Snackbar
        ContentProps={{ className: classes.root }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        message={<Typography className={classes.msg}>Added products to cart successfully</Typography>}
        open={true}
        action={
          <Button className={classes.btn} onClick={gotoCart}>
            Go to cart
          </Button>
        }
        autoHideDuration={2000}
        onClose={handleClose}
      />
    </Paper>
  );
}
