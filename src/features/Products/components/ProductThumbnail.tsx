import { Box } from '@material-ui/core';
import React from 'react';
import { STATIC_HOST, THUMBNAIL_PLACEHOLDER } from '../../../constants';
import { ProductListType } from '../../../interfaces';

type ProductPropsType = {
  product?: ProductListType;
  loading?: boolean;
};

export default function ProductThumbnail({ product, loading }: ProductPropsType) {
  const thumbnailUrl = product?.thumbnail ? `${STATIC_HOST}${product.thumbnail?.url}` : THUMBNAIL_PLACEHOLDER;
  return (
    <Box>
      <img src={thumbnailUrl} alt={product?.name} width='100%' />
    </Box>
  );
}
