import { Box, FormHelperText, IconButton, makeStyles, Typography } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { AddCircleOutline, RemoveCircleOutline } from '@material-ui/icons';
import React from 'react';
import { Controller } from 'react-hook-form';

type QuantityFieldProps = {
  form: { control: any; formState: { errors: any }; setValue: any };
  name: string;
  label: string;
  disable?: boolean;
};

const useStyles = makeStyles((theme) => ({
  root: {},
  quantityBox: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    maxWidth: '200px',
  },
}));

const QuantityField = ({ form, name, label, disable }: QuantityFieldProps) => {
  const classes = useStyles();
  const { formState, setValue } = form;
  const { errors } = formState;
  const hasError = errors[name];

  return (
    <FormControl error={hasError} fullWidth margin='normal' variant='outlined' size='small'>
      <Typography>{label}</Typography>
      <Controller
        name={`${name}` as const}
        control={form.control}
        render={({ field: { onChange, onBlur, value, name } }) => (
          <Box className={classes.quantityBox}>
            <IconButton onClick={() => setValue(name, Number.parseInt(value) ? Number.parseInt(value) - 1 : 1)}>
              <RemoveCircleOutline />
            </IconButton>

            <OutlinedInput
              id={name}
              type='number'
              disabled={disable}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
            />

            <IconButton onClick={() => setValue(name, Number.parseInt(value) ? Number.parseInt(value) + 1 : 1)}>
              <AddCircleOutline />
            </IconButton>
          </Box>
        )}
      />

      {hasError && <FormHelperText>{errors[name]?.message}</FormHelperText>}
    </FormControl>
  );
};

export default QuantityField;
