import React, { useCallback } from 'react';
import { SignupRequest, signupSchema } from '../../api';
import { TextField, TextFieldProps } from '../../components/TextField';
import { Button } from '../../components/Button';
import { ExampleProps } from '../../types';
import { useField, Formik, Form } from 'formik';

type Values = SignupRequest;

const initialValues: Values = {
  firstName: '',
  lastName: '',
  email: '',
  birthdate: ''
};

type FormTextFieldProps = Pick<TextFieldProps, 'label' | 'type' | 'id'> & {
  name: keyof Values;
};

const FormTextField: React.FC<FormTextFieldProps> = props => {
  const [field, meta] = useField(props.name);
  return (
    <TextField {...field} {...props} error={!!meta.touched && meta.error} />
  );
};

export const FormikElements: React.FC<ExampleProps> = props => {
  const onSubmit = useCallback(
    (values: Values) => {
      props.onSubmit(signupSchema.cast(values));
    },
    [props.onSubmit]
  );

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={signupSchema}
    >
      {({ isSubmitting }) => (
        <Form noValidate>
          <FormTextField name="firstName" id="first-name" label="First Name" />
          <FormTextField id="last-name" label="Last Name" name="lastName" />
          <FormTextField id="email" label="Email" type="email" name="email" />
          <FormTextField
            id="birthdate"
            label="Birthdate"
            type="date"
            name="birthdate"
          />
          <Button type="submit" disabled={isSubmitting}>
            Sign Up
          </Button>
        </Form>
      )}
    </Formik>
  );
};
