import React from 'react';
import { SignupRequest } from '../../api';
import { TextField } from '../../components/TextField';
import { Button } from '../../components/Button';
import { ExampleProps } from '../../types';
import * as yup from 'yup';
import { useForm } from './useForm';

type Values = SignupRequest;

const defaultState: Values = {
  firstName: '',
  lastName: '',
  email: '',
  birthdate: ''
};

const schema = yup.object<Values>({
  firstName: yup
    .string()
    .label('First Name')
    .required(),
  lastName: yup
    .string()
    .label('Last Name')
    .required(),
  email: yup
    .string()
    .label('Email')
    .email()
    .required(),
  birthdate: yup
    .string()
    .label('Birthdate')
    .required()
});

export const Hook: React.FC<ExampleProps> = ({ onSubmit }) => {
  const { handleChange, handleSubmit, values, errors, isSubmitting } = useForm<
    SignupRequest
  >({
    onSubmit,
    schema,
    initialValues: defaultState
  });

  return (
    <form onSubmit={handleSubmit} noValidate>
      <TextField
        required
        id="first-name"
        label="First Name"
        name="firstName"
        value={values.firstName}
        error={errors.firstName}
        onChange={handleChange}
      />
      <TextField
        required
        id="last-name"
        label="Last Name"
        name="lastName"
        error={errors.lastName}
        value={values.lastName}
        onChange={handleChange}
      />
      <TextField
        required
        id="email"
        label="Email"
        type="email"
        name="email"
        value={values.email}
        error={errors.email}
        onChange={handleChange}
      />
      <TextField
        required
        id="birthdate"
        label="Birthdate"
        type="date"
        name="birthdate"
        value={values.birthdate}
        error={errors.birthdate}
        onChange={handleChange}
      />
      <Button type="submit" disabled={isSubmitting}>
        Sign Up
      </Button>
    </form>
  );
};
