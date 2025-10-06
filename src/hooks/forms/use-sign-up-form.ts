import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  signUpRequestSchema,
  SignUpRequest,
} from '@/schemas/sign-up-request-schema';
import { useSignUpMutation } from '@/hooks/mutations/use-sign-up-mutation';

export const useSignUpForm = () => {
  const form = useForm<SignUpRequest>({
    resolver: zodResolver(signUpRequestSchema),
    defaultValues: {
      name: '',
      username: '',
      password: '',
    },
  });

  const signUp = useSignUpMutation();

  const handleSubmit = form.handleSubmit((data) => {
    signUp.mutate(data);
  });

  return { form, handleSubmit };
};
