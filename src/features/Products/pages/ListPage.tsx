import { Box, Container, Grid, Paper, makeStyles } from '@material-ui/core';
import { DEFAULT_PAGINATION_PAGE, DEFAULT_PAGINATION_lIMIT, DEFAULT_SALEPRICE_SORT } from '../../../constants';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';

import FilterView from '../components/FilterView';
import { Pagination } from '@material-ui/lab';
import ProductFilter from '../components/ProductFilter';
import ProductList from '../components/ProductList';
import { ProductListType } from '../../../interfaces';
import ProductSkeletonList from '../components/ProductSkeletonList';
import ProductSort from '../components/ProductSort';
import productApi from '../../../api/productApi';
import queryString from 'query-string';

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
  const history = useHistory();
  console.log('history', history)
  const [productList, setProductList] = useState<ProductListType[]>([]);

  const location = useLocation();
  const queryParams = queryString.parse(location.search);
  console.log('query', queryParams);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState(() => ({
    ...queryParams,
    _page: queryParams._page ? Number.parseInt(String(queryParams._page)) : DEFAULT_PAGINATION_PAGE,
    _limit: queryParams._limit ? Number.parseInt(String(queryParams._limit)) : DEFAULT_PAGINATION_lIMIT,
    _sort: queryParams._sort ? String(queryParams._sort) : DEFAULT_SALEPRICE_SORT,
  }));

  const [totalPage, setTotalPage] = useState(10);

  useEffect(() => {
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  }, [history, filters]);

  useEffect(() => {
    (async () => {
      try {
        const {
          data: { data },
          pagination,
        } = await productApi.getAll(filters);
        setProductList(data);
        setTotalPage(pagination.total);
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

  const setNewFilters = (newFilters: any) => {
    setFilters(newFilters);
  };

  console.log('filters on ListPage', filters);
  return (
    <div>
      <Box>
        <Container>
          <Grid container spacing={1}>
            <Grid item className={classes.left}>
              <Paper elevation={0}>
                <ProductFilter filters={filters} onChange={handleFilterChange} />
              </Paper>
            </Grid>
            <Grid item className={classes.right}>
              <Paper elevation={0}>
                <FilterView filters={filters} onChange={setNewFilters} />
                <ProductSort currentSort={filters._sort} onChange={handleSortChange} />
                {loading ? <ProductSkeletonList /> : <ProductList productList={productList} />}
                <Box className={classes.pagination}>
                  <Pagination
                    count={Math.ceil(totalPage / filters._limit)}
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
