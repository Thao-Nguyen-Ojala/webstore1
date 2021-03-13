import { FormHelperText } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';

type PasswordFieldProps = {
  form: { control: any; errors: any; formState: any };
  name: string;
  label: string;
  disable?: boolean;
};

const PasswordField = ({ form, name, label, disable }: PasswordFieldProps) => {
  const { errors } = form;
  const hasError = errors[name];
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((x) => !x);
  };
  return (
    <FormControl error={hasError} fullWidth margin='normal' variant='outlined'>
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <Controller
        name={name}
        control={form.control}
        as={OutlinedInput}
        id={name}
        type={showPassword ? 'text' : 'password'}
        label={label} /*cheat way to fit the ui bug (line over some of the text)*/
        endAdornment={
          <InputAdornment position='end'>
            <IconButton aria-label='toggle password visibility' onClick={toggleShowPassword} edge='end'>
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
        disabled={disable}
      />

      {hasError && <FormHelperText>{errors[name]?.message}</FormHelperText>}
    </FormControl>
  );
};

export default PasswordField;
