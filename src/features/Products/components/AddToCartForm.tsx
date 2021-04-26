import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import QuantityField from '../../../components/form-controls/QuantityField/QuantityField';
import { AddToCartQuantity } from '../../../interfaces';

interface AddToCartFormPropType {
  onSubmit: (submitValue: AddToCartQuantity) => void;
}

export default function AddToCartForm({ onSubmit }: AddToCartFormPropType) {
  const schema = yup.object().shape({
    quantity: yup
      .number()
      .min(1, 'Minimum value is 1')
      .required('Please enter quantity')
      .typeError('Please enter a number'),
  });

  const form = useForm<AddToCartQuantity>({
    defaultValues: {
      quantity: 1,
    },
    resolver: yupResolver(schema),
  });
  const { handleSubmit } = form;

  const handleOnSubmit = async (submitValue: AddToCartQuantity) => {
    if (onSubmit) {
      await onSubmit(submitValue);
    }
  };
  //const { isSubmitting } = form.formState;
  return (
    <div>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <QuantityField name='quantity' label='Quantity' form={form} />

        <Button type='submit' variant='contained' color='primary' style={{ width: '250px' }} size='large'>
          Add to Cart
        </Button>
      </form>
    </div>
  );
}
