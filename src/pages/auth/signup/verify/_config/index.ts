import { AlertModalProps } from '@/components/AlertModal/types';
import { z } from 'zod';
import { formSchema } from '../../_validation/schema';

export const initAlerModalValue: AlertModalProps = {
  content: '',
  open: false,
  title: ''
};

export const initSignUpForm: z.infer<typeof formSchema> = {
  name: '',
  email: '',
  password: '',
  birthDate: '',
  gender: '',
  phone: ''
};
