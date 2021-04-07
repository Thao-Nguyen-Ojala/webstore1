import { Box, Grid } from '@material-ui/core';
import React from 'react';
import { ProductListType } from '../../../interfaces';
import Product from './Product';

type ProductListProps = {
  productList: ProductListType[];
};
export default function ProductList({ productList }: ProductListProps) {
  return (
    <Box>
      <Grid container>
        {productList.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
