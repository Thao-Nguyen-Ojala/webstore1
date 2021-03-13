import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { InputField } from '../../../../components';

type TodoFormProps = {
  onSubmit(formValue: formValueObj): void;
};

type formValueObj = {
  title: string;
};

type InputFieldType = {
  title: string;
};

export default function TodoForm({ onSubmit }: TodoFormProps) {
  const schema = yup.object().shape({
    title: yup.string().required('Please enter title').min(4, 'Title is too short'),
  });

  const form = useForm<InputFieldType>({
    defaultValues: {
      title: '',
    },
    resolver: yupResolver(schema),
  });
  const { handleSubmit } = form;

  const handleOnSubmit = (values: formValueObj) => {
    if (onSubmit) {
      onSubmit(values);
    }
    //reset form (empty the box)
    form.reset();
  };
  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <InputField name='title' label='Todo' form={form} />
    </form>
  );
}
