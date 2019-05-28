import * as yup from 'yup';

export interface SignupRequest {
  firstName: string;
  lastName: string;
  email: string;
  birthdate: string;
}

export const signupSchema = yup.object<SignupRequest>({
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
    .transform(v => new Date(v).toISOString())
});

export const signup = (data: SignupRequest) => {
  return new Promise(resolve => {
    alert(`Welcome ${data.firstName} ${data.lastName}!`);
    resolve();
  });
};
