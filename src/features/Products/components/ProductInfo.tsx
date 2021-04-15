import { Box, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { ProductListType } from '../../../interfaces';
import { formatPriceVND } from '../../../utils';

type ProductPropsType = {
  product?: ProductListType;
  loading?: boolean;
};

const useStyle = makeStyles((theme) => ({
  root: {
    paddingBottom: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.grey[400]}`,
  },
  description: {
    margin: theme.spacing(2, 0),
  },
  priceBox: {
    backgroundColor: theme.palette.grey[100],
    borderRadius: '1rem',
    padding: theme.spacing(2),
  },
  salePrice: {
    fontSize: theme.typography.h4.fontSize,
    fontWeight: 'bold',
    marginRight: theme.spacing(3),
  },
  originalPrice: {
    marginRight: theme.spacing(2),
    textDecoration: 'line-through',
  },
}));

export default function ProductInfo({ product }: ProductPropsType) {
  const classes = useStyle();
  if (!product) return <p> No selected product</p>;
  const { name, shortDescription, salePrice, originalPrice, promotionPercent } = product;
  return (
    <Box className={classes.root}>
      <Typography component='h1' variant='h4'>
        {name}
      </Typography>
      <Typography variant='body2' className={classes.description}>
        {shortDescription}
      </Typography>

      <Box className={classes.priceBox}>
        <Box component='span' className={classes.salePrice}>
          {formatPriceVND(salePrice)}
        </Box>

        {promotionPercent > 0 && (
          <>
            <Box component='span' className={classes.originalPrice}>
              {formatPriceVND(originalPrice)}
            </Box>
            <Box component='span'>{`-${product.promotionPercent}%`}</Box>
          </>
        )}
      </Box>
    </Box>
  );
}
