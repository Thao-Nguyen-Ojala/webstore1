import { Box } from '@material-ui/core';
import React from 'react';
import { priceRangeValuesType, serviceValuesType } from '../../../interfaces';
import FilterByCategory from './Filters/FilterByCategory';
import FilterByPrice from './Filters/FilterByPrice';
import FilterByService from './Filters/FilterByService';

interface ProductFilterType {
  filters: {};
  onChange: (newValue: any) => void;
}

export default function ProductFilter({ filters, onChange }: ProductFilterType) {
  const handleCategoryChange = (newCategoryId: any) => {
    if (!onChange) return;

    const newFilters = {
      'category.id': newCategoryId,
    };
    onChange(newFilters);
  };

  const handleChange = (values: priceRangeValuesType | serviceValuesType) => {
    if (onChange) onChange(values);
  };
  return (
    <Box>
      <FilterByCategory onChange={handleCategoryChange}></FilterByCategory>
      <FilterByPrice onChange={handleChange}></FilterByPrice>
      <FilterByService filters={filters} onChange={handleChange}></FilterByService>
    </Box>
  );
}
