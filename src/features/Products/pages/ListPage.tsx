import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import React, { useEffect, useState } from 'react';
import productApi from '../../../api/productApi';
import { PaginationType, ProductListType } from '../../../interfaces';
import ProductFilter from '../components/ProductFilter';
import ProductList from '../components/ProductList';
import ProductSkeletonList from '../components/ProductSkeletonList';
import ProductSort from '../components/ProductSort';

const useStyle = makeStyles((theme) => ({
  root: {},
  left: {
    width: '250px',
  },
  right: {
    flex: '1 1 0',
  },
  pagination: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    marginTop: '20px',
    padding: '15px',
  },
}));

export default function ListPage() {
  const classes = useStyle();
  const [productList, setProductList] = useState<ProductListType[]>([]);
  /*const [pagination, setPagination] = useState<PaginationType>({
    limit: 9,
    page: 2,
    total: 10,
  });*/
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    _page: 1,
    _limit: 9,
    _sort: 'salePrice:ASC',
  });
  const [total, setTotal] = useState(10);
  useEffect(() => {
    (async () => {
      try {
        const {
          data: { data },
          pagination,
        } = await productApi.getAll(filters);
        setProductList(data);
        setTotal(pagination.total);
        //setPagination(pagination);
      } catch (error) {
        console.log('failed to fetch product list');
      }
      setLoading(false);
    })();
  }, [filters]);
  const handlePageChange = (e: any, page: number) => {
    setFilters((prevFilter) => ({
      ...prevFilter,
      _page: page,
    }));
  };
  const handleSortChange = (newSortValue: string) => {
    setFilters((prevFilter) => ({
      ...prevFilter,
      _sort: newSortValue,
    }));
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters((prevFilter) => ({
      ...prevFilter,
      ...newFilters,
    }));
  };

  console.log('filters on ListPage', filters);
  return (
    <div>
      <Box>
        <Container>
          <Grid container spacing={1}>
            <Grid item className={classes.left}>
              <Paper elevation={0}>
                <ProductFilter filters={filters} onChange={handleFilterChange}></ProductFilter>
              </Paper>
            </Grid>
            <Grid item className={classes.right}>
              <Paper elevation={0}>
                <ProductSort currentSort={filters._sort} onChange={handleSortChange} />
                {loading ? <ProductSkeletonList /> : <ProductList productList={productList} />}
                <Box className={classes.pagination}>
                  <Pagination
                    count={Math.ceil(total / filters._limit)}
                    page={filters._page}
                    color='primary'
                    onChange={handlePageChange}
                  />
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
}
