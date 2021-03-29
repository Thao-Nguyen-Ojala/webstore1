import { Box, Chip, makeStyles } from '@material-ui/core';
import React, { useMemo } from 'react';
import { filtersType } from '../../../interfaces';

interface FilterViewType {
  filters: filtersType;
  onChange: (newFilters: any) => void;
}

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

interface FILTER_LIST_TYPE {
  id: number;
  getLabel: (filters: any) => string;
  isActive: (filters: any) => boolean;
  isVisible: (filters?: any) => boolean;
  isRemovable: boolean;
  onRemove: (filters?: any) => void;
  onToggle: (filtes: any) => void;
}

export default function FilterView({ filters = {}, onChange }: FilterViewType) {
  const classes = useStyles();
  const visibleFilters = useMemo(() => {
    const FILTER_LIST: FILTER_LIST_TYPE[] = [
      {
        id: 1,
        getLabel: () => 'FreeShip',
        isActive: (filters) => filters.isFreeShip,
        isVisible: () => true,
        isRemovable: false,
        onRemove: () => {},
        onToggle: (filtes) => {
          const newFilters = { ...filters };
          console.log('new filter, onToggle', newFilters);
          if (newFilters.isFreeShip) {
            delete newFilters.isFreeShip;
          } else {
            newFilters.isFreeShip = true;
          }
          return newFilters;
        },
      },
      {
        id: 2,
        getLabel: () => 'On Sale',
        isActive: () => true,
        isVisible: (filters) => Object.keys(filters).includes('isPromotion'),
        isRemovable: false,
        onRemove: (filters) => {
          const newFilters = { ...filters };
          delete newFilters.isPromotion;
          return newFilters;
        },
        onToggle: () => {},
      },
      {
        id: 3,
        getLabel: () => 'Price range',
        isActive: () => true,
        isVisible: (filters) =>
          Object.keys(filters).includes('salePrice_lte') && Object.keys(filters).includes('salePrice_gte'),
        isRemovable: false,
        onRemove: () => false,
        onToggle: () => {},
      },
      {
        id: 4,
        getLabel: () => 'Category',
        isActive: () => true,
        isVisible: (filters) => Object.keys(filters).includes('category.id'),
        isRemovable: false,
        onRemove: () => false,
        onToggle: () => {},
      },
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
                    console.log('aaaaaaaa');
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
