import { Box, Checkbox, FormControlLabel, makeStyles, Typography } from '@material-ui/core';
import React from 'react';

interface FilterByServiceType {
  filters: {};
  onChange: (values: any) => void;
}

const useStyle = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.grey[300]}`,
  },
  list: {
    padding: 0,
    margin: 0,
    listStyleType: 'none',

    '& > li': {
      margin: 0,
    },
  },
}));

export default function FilterByService({ filters, onChange }: FilterByServiceType) {
  const classes = useStyle();

  console.log('this shitty', filters);

  const filtersMap = new Map<string, any>(Object.entries(filters));

  const services = [
    {
      value: 'isPromotion',
      label: 'On Sale',
    },
    {
      value: 'isFreeShip',
      label: 'FreeShip',
    },
  ];

  const handleChange = (e: any) => {
    //e.persist()
    if (!onChange) return;
    const { name, checked } = e.target;
    onChange({ [name]: checked });
  };

  return (
    <Box className={classes.root}>
      <Typography variant='subtitle2'>SERVICES</Typography>

      <ul className={classes.list}>
        {services.map((service) => (
          <li key={service.value}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={Boolean(filtersMap.get(service.value))}
                  onChange={handleChange}
                  name={service.value}
                  color='primary'
                />
              }
              label={service.label}
            />
          </li>
        ))}
      </ul>
    </Box>
  );
}
