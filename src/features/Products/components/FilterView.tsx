import { Box, Chip, makeStyles } from '@material-ui/core';
import { FILTER_LIST_TYPE, FilterViewType } from '../../../interfaces';
import React, { useMemo } from 'react';
import { getCategoryFilter, getFreeShippingFilter, getOnSaleFilter, getPriceRangeFilter } from '../../../utils/filterUtils';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'center',

    padding: 0,
    margin: theme.spacing(2, 0),
    listStyleType: 'none',

    '& > li': {
      margin: 0,
      padding: theme.spacing(1),
    },
  },
}));

export default function FilterView({ filters = {}, onChange }: FilterViewType) {
  const classes = useStyles();
  const visibleFilters = useMemo(() => {
    const FILTER_LIST: FILTER_LIST_TYPE[] = [
      getFreeShippingFilter(),
      getOnSaleFilter(),
      getPriceRangeFilter(),
      getCategoryFilter()
    ];
    return FILTER_LIST.filter((x) => x.isVisible(filters));
  }, [filters]);
  
  return (
    <Box component='ul' className={classes.root}>
      {visibleFilters.map((x) => (
        <li key={x.id}>
          <Chip
            label={x.getLabel(filters)}
            color={x.isActive(filters) ? 'primary' : 'default'}
            clickable={!x.isRemovable}
            onClick={
              x.isRemovable
                ? () => {}
                : () => {
                    if (!onChange) return;
                    const newFilters = x.onToggle(filters);
                    onChange(newFilters);
                  }
            }
            onDelete={
              x.isRemovable
                ? () => {
                    if (!onChange) return;
                    const newFilters = x.onRemove(filters);
                    onChange(newFilters);
                  }
                : undefined
            }
          />
        </li>
      ))}
    </Box>
  );
}
