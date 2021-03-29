import { Tab, Tabs } from '@material-ui/core';
import React from 'react';

interface ProductSortProps {
  currentSort: string;
  onChange: (newValue: string) => void;
}

export default function ProductSort({ onChange, currentSort }: ProductSortProps) {
  const onHandleSortChange = (e: any, newValue: string) => {
    if (onChange) onChange(newValue);
  };
  return (
    <Tabs
      value={currentSort}
      indicatorColor='primary'
      textColor='primary'
      onChange={onHandleSortChange}
      aria-label='disabled tabs example'
    >
      <Tab label='Low to high' value='salePrice:ASC'></Tab>
      <Tab label='High to low' value='salePrice:DESC'></Tab>
    </Tabs>
  );
}
