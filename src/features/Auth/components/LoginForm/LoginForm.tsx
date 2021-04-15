import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, Button, LinearProgress, Typography } from '@material-ui/core';
import { LockOpenOutlined } from '@material-ui/icons';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { InputField } from '../../../../components';
import PasswordField from '../../../../components/form-controls/PasswordField/PasswordField';

import { useStyles } from './LogInFormUseStyleHook';

type logInFormProps = {
  onSubmit(formValue: formValueObj): void;
};

type formValueObj = {
  fullName: string;
  email: string;
  password: string;
  retypePassword: string;
};

type InputFieldType = {
  identifier: string;
  password: string;
};

export default function LogInForm({ onSubmit }: logInFormProps) {
  const classes = useStyles();

  const schema = yup.object().shape({
    identifier: yup.string().required('Please enter your email').email('Please enter a valid email'),
    password: yup.string().required('Please enter your password'),
  });

  const form = useForm<InputFieldType>({
    defaultValues: {
      identifier: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });
  const { handleSubmit } = form;

  const handleOnSubmit = async (values: formValueObj) => {
    if (onSubmit) {
      await onSubmit(values);
    }
  };
  const { isSubmitting } = form.formState;
  return (
    <div className={classes.root}>
      {isSubmitting && <LinearProgress className={classes.progress} />}
      <Avatar className={classes.avatar}>
        <LockOpenOutlined></LockOpenOutlined>
      </Avatar>

      <Typography className={classes.title} component='h3' variant='h5'>
        Sign in
      </Typography>

      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <InputField name='identifier' label='Identifier' form={form} />
        <PasswordField name='password' label='Password' form={form} />

        <Button
          disabled={isSubmitting}
          type='submit'
          className={classes.submit}
          variant='contained'
          color='primary'
          fullWidth
          size='large'
        >
          Sign in
        </Button>
      </form>
    </div>
  );
}
