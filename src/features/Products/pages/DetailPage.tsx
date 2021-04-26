import { Box, Container, Grid, LinearProgress, makeStyles, Paper } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import React from 'react';
import { useRouteMatch } from 'react-router';
import AddToCartForm from '../components/AddToCartForm';
import ProductDesAddionalReview from '../components/ProductDesAddionalReview/ProductDesAddionalReview';
import ProductInfo from '../components/ProductInfo';
import ProductThumbnail from '../components/ProductThumbnail';
import useProductDetail from '../hooks/useProductDetail';
import { Switch, Route } from 'react-router-dom';
import ProductDescription from '../components/ProductDesAddionalReview/ProductDescription';
import ProductAdditional from '../components/ProductDesAddionalReview/ProductAdditional';
import ProductReview from '../components/ProductDesAddionalReview/ProductReview';
import { useDispatch } from 'react-redux';
import { addToCart, showMiniCart } from '../../Cart/cartSlice';
import { AddToCartQuantity } from '../../../interfaces';

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
    console.log('submit add to cart', quantity);
    const action = addToCart({
      id: product?.id,
      product,
      quantity,
    });

    const showMiniCartAction = showMiniCart();

    console.log('action', action);
    dispatch(action);

    console.log('action2', showMiniCartAction);
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
