import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../app/store';
import { logInFormType } from '../../../../interfaces';
import { logIn } from '../../userSlice';
import LogInForm from '../LoginForm/LoginForm';

type logInPropsType = {
  closeDialog: () => void;
};

export default function LogIn({ closeDialog }: logInPropsType) {
  const dispatch: AppDispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (values: logInFormType) => {
    console.log('logIn value', values);
    try {
      const action = logIn(values);

      const resultAction = await dispatch(action);
      unwrapResult(resultAction);

      if (closeDialog) {
        closeDialog();
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };
  return (
    <div>
      <LogInForm onSubmit={handleSubmit} />
    </div>
  );
}
