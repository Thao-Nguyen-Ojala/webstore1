import React, { useEffect, useState } from 'react';
import productApi from '../../../api/productApi';
import { ProductListType } from '../../../interfaces';

export default function useProductDetail(productId: string) {
  const [product, setProduct] = useState<ProductListType>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await productApi.get(productId);
        setProduct(data);
      } catch (error) {
        console.log('Failed to fetch product', error);
      }
      setLoading(false);
    })();
  }, [productId]);

  return { loading, product };
}
