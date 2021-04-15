import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import React from 'react';
import { useRouteMatch } from 'react-router';
import AddToCartForm from '../components/AddToCartForm';
import ProductInfo from '../components/ProductInfo';
import ProductThumbnail from '../components/ProductThumbnail';
import useProductDetail from '../hooks/useProductDetail';

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
}));

type paramsType = {
  productId: string;
};

export default function DetailPage() {
  const classes = useStyle();

  const {
    params: { productId },
  } = useRouteMatch<paramsType>();

  const { product, loading } = useProductDetail(productId);

  const handleAddToCartSubmit = (values: any) => {
    console.log('submit add to cart', values);
  };
  return (
    <Box className={classes.root}>
      <Container>
        <Paper elevation={0}>
          {loading ? (
            <Grid container>
              <Grid item className={classes.left}>
                <Skeleton variant='rect' width={375} height={375} />
              </Grid>
              <Grid item className={classes.right}>
                <Skeleton variant='text' width='60%' />
                <Skeleton variant='text' width='100%' />
              </Grid>
            </Grid>
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
      </Container>
    </Box>
  );
}
