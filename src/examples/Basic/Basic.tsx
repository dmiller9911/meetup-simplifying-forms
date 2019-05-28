import React, { useState, useCallback } from 'react';
import { SignupRequest, signupSchema } from '../../api';
import { TextField } from '../../components/TextField';
import { Button } from '../../components/Button';
import { ExampleProps } from '../../types';

type Values = SignupRequest;
type Errors = { [K in keyof Values]?: string };

const defaultState: Values = {
  firstName: '',
  lastName: '',
  email: '',
  birthdate: ''
};

const getErrors = async (values: Values) => {
  const errors: Errors = {};
  if (!values.firstName.trim()) {
    errors.firstName = 'First Name is required.';
  }

  if (!values.lastName.trim()) {
    errors.lastName = 'Last Name is required.';
  }

  if (!values.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!/.*@.*/.test(values.email)) {
    errors.email = 'Invalid Email.';
  }

  if (!values.birthdate) {
    errors.birthdate = 'Birthdate is required.';
  }

  return errors;
};

export const Basic: React.FC<ExampleProps> = ({ onSubmit }) => {
  const [values, setValues] = useState<Values>({ ...defaultState });
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (isSubmitting) {
        return;
      }
      setIsSubmitting(true);
      const submitErrors = await getErrors(values);
      const hasErrors = Object.keys(submitErrors).length;
      if (hasErrors) {
        setErrors(submitErrors);
      } else {
        onSubmit(values);
        setValues({ ...defaultState });
        setErrors({});
      }
      setIsSubmitting(false);
    },
    [values, onSubmit, isSubmitting]
  );

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    e => {
      e.persist();
      const key = e.target.name as keyof SignupRequest;
      setValues(currentValues => ({
        ...currentValues,
        [key]: e.target.value
      }));
    },
    [values]
  );

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
