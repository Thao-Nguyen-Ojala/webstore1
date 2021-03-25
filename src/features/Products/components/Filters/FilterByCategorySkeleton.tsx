import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

import React from 'react';

interface FilterByCategorySkeletonType {
  length?: number;
}

const useStyle = makeStyles((theme) => ({
  root: {},

  menu: {
    padding: 0,
    margin: 0,
    listStyleType: 'none',

    '& > li': {
      marginTop: theme.spacing(1),
      transition: 'all .25s',
    },
  },
}));

export default function FilterByCategorySkeleton({ length = 6 }: FilterByCategorySkeletonType) {
  const classes = useStyle();
  return (
    <div>
      <Box className={classes.root}>
        <ul className={classes.menu}>
          {Array.from(new Array(length)).map((x, index) => (
            <li>
              <Skeleton variant='text' />
            </li>
          ))}
        </ul>
      </Box>
    </div>
  );
}
