import { TextField } from '@material-ui/core';
import React from 'react';
import { Controller } from 'react-hook-form';

type InputFieldProps = {
  form: { control: any; errors: any; formState: any };
  name: string;
  label: string;
  disable?: boolean;
};

const InputField = ({ form, name, label, disable }: InputFieldProps) => {
  const { errors } = form;
  const hasError = errors[name];

  return (
    <Controller
      name={name}
      control={form.control}
      as={TextField}
      margin='normal'
      variant='outlined'
      fullWidth
      label={label}
      disabled={disable}
      error={hasError}
      helperText={errors[name]?.message}
      //?. errors[name] is optional
    />
  );
};

export default InputField;
