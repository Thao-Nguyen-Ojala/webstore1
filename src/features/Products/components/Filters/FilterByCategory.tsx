import { Box, Typography, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

import FilterByCategorySkeleton from './FilterByCategorySkeleton';
import categoryApi from '../../../../api/categoryApi';

interface FilterByCategoryProps {
  onChange: (newValue: any) => void;
}

interface CategoryDataType {
  id: number;
  name: string;
}

const useStyle = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },

  menu: {
    padding: 0,
    margin: 0,
    listStyleType: 'none',

    '& > li': {
      marginTop: theme.spacing(1),
      transition: 'all .25s',

      '&:hover': {
        color: theme.palette.primary.main,
        cursor: 'pointer',
      },
    },
  },
}));

export default function FilterByCategory({ onChange }: FilterByCategoryProps) {
  const [categoryList, setCategoryList] = useState<CategoryDataType[]>([]);
  //const [loading, setLoading];
  const classes = useStyle();
  useEffect(() => {
    (async () => {
      try {
        const { data } = await categoryApi.getAll();

        setCategoryList(data);
      } catch (error) {
        console.log('error', error);
      }
    })();
  }, []);

  const handleCategoryClick = (category: CategoryDataType) => {
    if (onChange) {
      onChange(category.id);
    }
  };
  return (
    <Box className={classes.root}>
      <Typography variant='subtitle2'>PRODUCT LIST</Typography>

      {categoryList.length > 0 ? (
        <ul className={classes.menu}>
          {categoryList.map((category) => (
            <li key={category.id} onClick={() => handleCategoryClick(category)}>
              <Typography variant='body2'>{category.name}</Typography>
            </li>
          ))}
        </ul>
      ) : (
        <FilterByCategorySkeleton></FilterByCategorySkeleton>
      )}
    </Box>
  );
}
