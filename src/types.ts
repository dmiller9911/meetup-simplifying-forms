import { SignupRequest } from './api';

export interface ExampleProps {
  onSubmit(request: SignupRequest): void;
}
