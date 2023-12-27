import axios, { AxiosResponse } from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { SignUpReq } from '^/@types/models/auth';
import { signupAPI } from '^/services/auth';
import { respBody } from '^/config/serverResponse';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  AlarmSmoke,
  AlertCircle,
  AlertOctagon,
  BadgeCheck,
  Loader2,
  User
} from 'lucide-react';
import { formSchema } from './_validation/schema';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import AlertModal from '@/components/AlertModal';
import { AUTH_PAGE_URL } from '@/constants/pageURL';
import { AlertModalProps } from '@/components/AlertModal/types';
import { initAlerModalValue, initSignUpForm } from './verify/_config';
import { API_VERSION, BASE_URL } from '^/config/env';
import { useTranslations } from 'next-intl';

const SignUpForm = () => {
  const t = useTranslations();
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const [alertModal, setAlertModal] =
    useState<AlertModalProps>(initAlerModalValue);
  const [formVal, setFormVal] =
    useState<z.infer<typeof formSchema>>(initSignUpForm);

  const validatePhoneNumber = (_: any, value: string) => {
    // Simple phone number validation example
    // You may want to use a more sophisticated validation library or regex
    if (!value || !/^\d{9,}$/.test(value)) {
      return Promise.reject(
        'Please enter a valid phone number. avoid zero on first number'
      );
    }
    return Promise.resolve();
  };

  const signupForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      phone: '',
      birthDate: '',
      gender: ''
    }
  });

  const onFormSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    setFormVal(values);
    const params: SignUpReq = {
      name: values.name,
      email: values.email,
      password: values.password,
      phone: values.phone,
      birthDate: values.birthDate,
      gender: values.gender
    };

    try {
      await signupAPI(params);
      setAlertModal({
        ...alertModal,
        open: true,
        success: true,
        title: 'Congratulations !!!',
        content: (
          <div className="flex flex-col py-[1rem] capitalize">
            <span>{respBody.SUCCESS.NEW_USER_CREATE.message}</span>
            <span>Please check your email and get the verification code.</span>
            <span>You will be redirected to verification page.</span>
          </div>
        )
      });
    } catch (error: any) {
      if (error.message) {
        setAlertModal({
          ...alertModal,
          open: true,
          success: error.success,
          title: 'ERROR !!!',
          content: (
            <div className="flex flex-col py-[1rem]">
              <span>{error.message}</span>
            </div>
          )
        });
      }
    }

    setLoading(false);
  };

  const goToVerification = () => {
    setAlertModal({
      ...alertModal,
      open: false
    });
    router.push(`${AUTH_PAGE_URL.SIGNUP_VERIF}?e=${encodeURI(formVal.email)}`);
  };

  return (
    <>
      <AlertModal
        open={alertModal.open}
        title={alertModal.title}
        content={alertModal.content}
        onClose={() =>
          alertModal.success
            ? goToVerification()
            : setAlertModal({ ...alertModal, open: false })
        }
      />

      <Form {...signupForm}>
        <form
          onSubmit={signupForm.handleSubmit(onFormSubmit)}
          className="space-y-4"
        >
          <FormField
            control={signupForm.control}
            name="name"
            render={({ field }) => (
              <>
                <FormItem>
                  <FormLabel>{t('Signup.name')}</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />
          <FormField
            control={signupForm.control}
            name="email"
            render={({ field }) => (
              <>
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />
          <FormField
            control={signupForm.control}
            name="password"
            render={({ field }) => (
              <>
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />

          <FormField
            control={signupForm.control}
            name="phone"
            render={({ field }) => (
              <>
                <FormItem>
                  <FormLabel>{t('Signup.phone')}</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Phone" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />

          <FormField
            control={signupForm.control}
            name="birthDate"
            render={({ field }) => (
              <>
                <FormItem>
                  <FormLabel>{t('Signup.birthDate')}</FormLabel>
                  <FormControl>
                    <Input type="date" placeholder="Birth Date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />

          <FormField
            control={signupForm.control}
            name="gender"
            render={({ field }) => (
              <>
                <FormItem>
                  <FormLabel>{t('Signup.gender')}</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="male">male</SelectItem>
                      <SelectItem value="female">female</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />

          <div className="flex flex-row gap-3 justify-center">
            <Button disabled={loading} className="bg-primary" type="submit">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {t('Signup.register')}
            </Button>
            <Button className="bg-error" type="reset">
              Reset
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default SignUpForm;
