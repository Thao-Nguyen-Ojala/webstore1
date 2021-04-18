import { Paper } from '@material-ui/core';
import React from 'react';
import { ProductListType } from '../../../../interfaces';
import DOMPurify from 'dompurify';

type ProductPropsType = {
  product?: ProductListType;
};

export default function ProductDescription({ product }: ProductPropsType) {
  if (!product) return <p> Product not found</p>;
  const safeDescription = DOMPurify.sanitize(product.description);
  return (
    <Paper elevation={1} style={{ padding: '15px' }}>
      <div dangerouslySetInnerHTML={{ __html: safeDescription }} />
    </Paper>
  );
}
