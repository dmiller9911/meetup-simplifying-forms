import React, { useCallback } from 'react';
import { SignupRequest, signupSchema } from '../../api';
import { TextField } from '../../components/TextField';
import { Button } from '../../components/Button';
import { ExampleProps } from '../../types';
import { useFormik } from 'formik';

type Values = SignupRequest;

const initialValues: Values = {
  firstName: '',
  lastName: '',
  email: '',
  birthdate: ''
};

export const FormikHooks: React.FC<ExampleProps> = props => {
  const onSubmit = useCallback(
    (values: Values) => {
      props.onSubmit(signupSchema.cast(values));
    },
    [props.onSubmit]
  );

  const {
    handleChange,
    isSubmitting,
    handleSubmit,
    submitCount,
    values,
    errors
  } = useFormik({
    onSubmit,
    initialValues,
    validationSchema: signupSchema
  });

  return (
    <form onSubmit={handleSubmit} noValidate>
      <TextField
        required
        id="first-name"
        label="First Name"
        name="firstName"
        value={values.firstName}
        error={!!submitCount && errors.firstName}
        onChange={handleChange}
      />
      <TextField
        required
        id="last-name"
        label="Last Name"
        name="lastName"
        error={!!submitCount && errors.lastName}
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
        error={!!submitCount && errors.email}
        onChange={handleChange}
      />
      <TextField
        required
        id="birthdate"
        label="Birthdate"
        type="date"
        name="birthdate"
        value={values.birthdate}
        error={!!submitCount && errors.birthdate}
        onChange={handleChange}
      />
      <Button type="submit" disabled={isSubmitting}>
        Sign Up
      </Button>
    </form>
  );
};
