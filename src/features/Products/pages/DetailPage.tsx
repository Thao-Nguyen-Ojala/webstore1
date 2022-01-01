import { Box, Container, Grid, LinearProgress, Paper, makeStyles } from '@material-ui/core';
import { Route, Switch } from 'react-router-dom';
import { addToCart, showMiniCart } from '../../Cart/cartSlice';

import AddToCartForm from '../components/AddToCartForm';
import { AddToCartQuantity } from '../../../interfaces';
import ProductAdditional from '../components/ProductDesAddionalReview/ProductAdditional';
import ProductDesAddionalReview from '../components/ProductDesAddionalReview/ProductDesAddionalReview';
import ProductDescription from '../components/ProductDesAddionalReview/ProductDescription';
import ProductInfo from '../components/ProductInfo';
import ProductReview from '../components/ProductDesAddionalReview/ProductReview';
import ProductThumbnail from '../components/ProductThumbnail';
import React from 'react';
import { Skeleton } from '@material-ui/lab';
import { useDispatch } from 'react-redux';
import useProductDetail from '../hooks/useProductDetail';
import { useRouteMatch } from 'react-router';

const useStyle = makeStyles((theme) => ({
  root: {},
  left: {
    width: '400px',
    padding: theme.spacing(1.5),
    borderRight: `1px solid ${theme.palette.grey[300]}`,
  },
  right: {
    flex: '1 1 0',
    padding: theme.spacing(1.5),
  },
  loading: {
    left: 0,
    width: '100%',
  },
}));

type paramsType = {
  productId: string;
};

export default function DetailPage() {
  const classes = useStyle();
  const { url } = useRouteMatch();
  const dispatch = useDispatch();

  const {
    params: { productId },
  } = useRouteMatch<paramsType>();

  const { product, loading } = useProductDetail(productId);

  const handleAddToCartSubmit = ({ quantity }: AddToCartQuantity) => {
    const action = addToCart({
      id: product?.id,
      product,
      quantity,
    });

    const showMiniCartAction = showMiniCart();

    dispatch(action);
    dispatch(showMiniCartAction);
  };
  return (
    <Box className={classes.root}>
      <Container>
        <Paper elevation={0}>
          {loading ? (
            <>
              <Box className={classes.loading}>
                <LinearProgress />
              </Box>
              <Grid container>
                <Grid item className={classes.left}>
                  <Skeleton variant='rect' width={375} height={375} />
                </Grid>
                <Grid item className={classes.right}>
                  <Skeleton variant='text' width='60%' />
                  <Skeleton variant='text' width='100%' />
                </Grid>
              </Grid>
            </>
          ) : (
            <Grid container>
              <Grid item className={classes.left}>
                <ProductThumbnail product={product} loading={loading} />
              </Grid>
              <Grid item className={classes.right}>
                <ProductInfo product={product} />
                <AddToCartForm onSubmit={handleAddToCartSubmit} />
              </Grid>
            </Grid>
          )}
        </Paper>
        <ProductDesAddionalReview />

        <Switch>
          <Route exact path={url}>
            <ProductDescription product={product} />
          </Route>
          <Route exact path={`${url}/additional`} component={ProductAdditional} />

          <Route exact path={`${url}/review`} component={ProductReview} />
        </Switch>
      </Container>
    </Box>
  );
}
