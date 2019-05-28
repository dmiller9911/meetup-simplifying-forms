import { ValidationError } from 'yup';

export const reduceYupErrors = <Errors>(error: ValidationError) => {
  return error.inner.reduce<Errors>(
    (prev, innerError) => {
      (prev as any)[innerError.path] = innerError.message;
      return prev;
    },
    {} as any
  );
};
