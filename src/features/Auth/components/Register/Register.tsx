import React from 'react';
import RegisterForm from '../RegisterForm/RegisterForm';
import { register } from '../../userSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { resgisterFormType } from '../../../../interfaces';
import { AppDispatch } from '../../../../app/store';
import { useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import userApi from '../../../../api/userApi';

type registerPropsType = {
  closeDialog: () => void;
};

export default function Register({ closeDialog }: registerPropsType) {
  const dispatch: AppDispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (values: resgisterFormType) => {
    try {
      //auto set username = email
      values.username = values.email;

      const action = register(values);
      const resultAction = await dispatch(action);
      unwrapResult(resultAction);

      /*const res = await userApi.register(values);
      localStorage.setItem('access_token', res.data.jwt);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      dispatch(updateUser(res.data.user));*/

      enqueueSnackbar('Register successfully!', { variant: 'success' });

      if (closeDialog) {
        closeDialog();
      }
    } catch (error) {
      console.log('fail to register', error);
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };
  return (
    <div>
      <RegisterForm onSubmit={handleSubmit} />
    </div>
  );
}
