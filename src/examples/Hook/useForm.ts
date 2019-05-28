import { useState, useMemo, useRef, useCallback } from 'react';
import * as yup from 'yup';
import { reduceYupErrors } from '../../utils';

type FormErrors<Values> = { [K in keyof Values]?: string };

interface FormState<Values> {
  values: Values;
  errors: FormErrors<Values>;
  handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void>;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  isSubmitting: boolean;
}

interface FormConfig<Values extends object> {
  initialValues: Values;
  onSubmit(values: Values): void;
  schema: yup.ObjectSchema<Values>;
}

export const useForm = <Values extends object>(
  config: FormConfig<Values>
): FormState<Values> => {
  const initialValues = useRef(config.initialValues);
  const [values, setValues] = useState<Values>({ ...initialValues.current });
  const [errors, setErrors] = useState<FormErrors<Values>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (isSubmitting) {
        return;
      }
      setIsSubmitting(true);

      try {
        await config.schema.validate(values, { abortEarly: false });
        config.onSubmit(values);
        setValues({ ...initialValues.current });
        setErrors({});
      } catch (err) {
        const innerErrors = (err as yup.ValidationError).inner;
        const submitErrors = reduceYupErrors<FormErrors<Values>>(err);
        setErrors(submitErrors);
      } finally {
        setIsSubmitting(false);
      }
    },
    [values, config.onSubmit, isSubmitting, config.schema]
  );

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    e => {
      e.persist();
      const key = e.target.name as keyof Values;
      setValues(currentValues => ({
        ...currentValues,
        [key]: e.target.value
      }));
    },
    [values]
  );

  const formState: FormState<Values> = useMemo(
    () => ({
      values,
      handleSubmit,
      handleChange,
      errors,
      isSubmitting
    }),
    [values, errors, handleSubmit, handleChange, isSubmitting]
  );

  return formState;
};
