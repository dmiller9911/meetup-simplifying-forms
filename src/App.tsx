import React, { useState } from 'react';
import { SignupRequest } from './api';
import { Layout } from './components/Layout';
import { Card } from './components/Card';
import styled from 'styled-components';
import { Basic } from './examples/Basic';
import { Hook } from './examples/Hook';
import { FormikHooks, FormikElements } from './examples/Formik';

// const Example = Basic;
// const Example = Hook;
// const Example = FormikHooks;
const Example = FormikElements;

const Values = styled.pre`
  padding: 0;
  margin: 0;
  background: transparent;
`;

export const App: React.FC = () => {
  const [formValues, setFormValues] = useState<SignupRequest | null>(null);

  return (
    <Layout>
      <Card>
        <Example onSubmit={setFormValues} />
      </Card>
      <Card>
        <header>Submitted Values</header>
        <Values>{!!formValues && JSON.stringify(formValues, null, 2)}</Values>
      </Card>
    </Layout>
  );
};
