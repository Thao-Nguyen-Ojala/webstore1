import * as yup from 'yup';

import { Avatar, Button, LinearProgress, Typography } from '@material-ui/core';

import { InputField } from '../../../../components';
import { LockOpenOutlined } from '@material-ui/icons';
import PasswordField from '../../../../components/form-controls/PasswordField/PasswordField';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useStyles } from './RegisterFormUseStyleHook';
import { yupResolver } from '@hookform/resolvers/yup';

type RegisterFormProps = {
  onSubmit(formValue: formValueObj): void;
};

type formValueObj = {
  fullName: string;
  email: string;
  password: string;
  retypePassword: string;
};

type InputFieldType = {
  fullName: string;
  email: string;
  password: string;
  retypePassword: string;
};

export default function RegisterForm({ onSubmit }: RegisterFormProps) {
  const classes = useStyles();

  const schema = yup.object().shape({
    fullName: yup
      .string()
      .required('Please enter your full name')
      .test('should has at least two words', 'Please enter at least two words', (value) => {
        if (!value) {
          return false;
        }
        return value.split(' ').length >= 2;
      }),
    email: yup.string().required('Please enter your email').email('Please enter a valid email'),
    password: yup
      .string()
      .required('Please enter your password')
      .min(6, 'Please enter at least 8 charater')
      .max(26, 'Maximum is 26 characters'),
    //.matches(
    //   /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
    //   'Password must contain normal and capital leters, numbers'
    // )
    retypePassword: yup
      .string()
      .required('Please retype your password')
      .oneOf([yup.ref('password'), 'Password does not match']),
  });

  const form = useForm<InputFieldType>({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      retypePassword: '',
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
        Create An Account
      </Typography>

      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <InputField name='fullName' label='Full Name' form={form} />
        <InputField name='email' label='Email' form={form} />
        <PasswordField name='password' label='Password' form={form} />
        <PasswordField name='retypePassword' label='Retype Password' form={form} />

        <Button
          disabled={isSubmitting}
          type='submit'
          className={classes.submit}
          variant='contained'
          color='primary'
          fullWidth
          size='large'
        >
          Create an account
        </Button>
      </form>
    </div>
  );
}
