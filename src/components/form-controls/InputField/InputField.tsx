import { Controller } from 'react-hook-form';
import React from 'react';
import { TextField } from '@material-ui/core';

type InputFieldProps = {
  form: { control: any; formState: { errors: any } };
  name: string;
  label: string;
  disable?: boolean;
};

const InputField = ({ form, name, label, disable }: InputFieldProps) => {
  const { formState } = form;
  const { errors } = formState;
  const hasError = errors[name];

  return (
    <Controller
      name={`${name}` as const}
      control={form.control}
      render={({ field: { onChange, onBlur, value, name } }) => (
        <TextField
          margin='normal'
          variant='outlined'
          fullWidth
          label={label}
          disabled={disable}
          error={hasError}
          helperText={errors[name]?.message}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
      )}
    />
  );
};

export default InputField;
