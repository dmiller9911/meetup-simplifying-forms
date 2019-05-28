import React from 'react';
import styled from 'styled-components';

export interface TextFieldProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  id: string;
  name: string;
  label: string;
  error?: React.ReactNode;
}

const Root = styled.div`
  margin-bottom: 1rem;
`;

const errorColor = '#b4393f';

const Label = styled.label<Pick<TextFieldProps, 'error'>>`
  display: block;
  margin-bottom: 0.25rem;
  color: ${props => (props.error ? errorColor : 'rgba(0, 0, 0, 0.54)')};
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
`;

const Input = styled.input<{ error?: string }>`
  display: block;
  width: 100%;
  background-color: transparent;
  box-shadow: none;
  min-width: 0px;
  width: 100%;
  color: rgba(0, 0, 0, 0.84);
  font-size: 1rem;
  padding: 1.125rem 0.875rem;
  border-width: 1px;
  border-style: solid;
  border-color: ${props => (props.error ? errorColor : 'rgba(0, 0, 0, 0.23)')};
  border-radius: 4px;
  outline: 0px;
  :focus {
    border-color: ${props => (props.error ? errorColor : '#3c3c3c')};
  }
`;

const ErrorMessage = styled.p`
  margin: 0.25rem 0 0;
  font-size: 0.75rem;
  color: ${errorColor};
`;

export const TextField: React.FC<TextFieldProps> = ({
  id,
  label,
  error,
  ...inputProps
}) => {
  const helperTextId = `${id}-helper-text`;
  console.log(error);

  return (
    <Root>
      <Label htmlFor={id} error={error}>
        {label}
      </Label>
      <Input
        id={id}
        error={error}
        {...inputProps as any}
        aria-describedby={helperTextId}
        aria-invalid={!!error}
      />
      {!!error && <ErrorMessage id={helperTextId}>{error}</ErrorMessage>}
    </Root>
  );
};
