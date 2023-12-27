import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { respBody } from '^/config/serverResponse';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertModalProps } from '@/components/AlertModal/types';
import AlertModal from '@/components/AlertModal';
import { useTranslations } from 'next-intl';
import { capitalizeStr } from '^/utils/capitalizeStr';
import { initAlerModalValue } from '^/config/auth/signup/config';

const SignInForm = () => {
  const router = useRouter();
  const t = useTranslations();

  const formSchema = z.object({
    email: z.string().email({
      message: 'invalid'
    }),
    password: z.string().min(6, {
      message: 'invalid password'
    })
  });

  const loginForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const [rslt, setRslt] = useState<string>('');
  const [alertModal, setAlertModal] =
    useState<AlertModalProps>(initAlerModalValue);
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = async (values: any) => {};

  const onEmailPwdChange = () => {
    setRslt('');
  };

  const onFormSubmit = (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false,
      callbackUrl: '/dashboard'
    })
      .then((res: any) => {
        setLoading(false);
        if (!res.ok && res.status == 401) {
          setAlertModal({
            ...alertModal,
            open: true,
            success: res.success,
            title: 'ERROR !!!',
            content: (
              <div className="flex flex-col py-[1rem]">
                <span>{res.error}</span>
              </div>
            )
          });
        } else if (res.ok) router.push('/dashboard');
      })
      .catch((err: any) => {
        // eslint-disable-next-line no-console
        console.log('err', err);
      });
  };

  return (
    <>
      <AlertModal
        open={alertModal.open}
        title={alertModal.title}
        content={alertModal.content}
        onClose={() => setAlertModal({ ...alertModal, open: false })}
      />

      <Form {...loginForm}>
        <form
          onSubmit={loginForm.handleSubmit(onFormSubmit)}
          className="space-y-8"
        >
          <FormField
            control={loginForm.control}
            name="email"
            render={({ field }) => (
              <>
                <FormItem onChange={onEmailPwdChange}>
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
            control={loginForm.control}
            name="password"
            render={({ field }) => (
              <>
                <FormItem onChange={onEmailPwdChange}>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />
          <div className="flex flex-row gap-3 justify-center">
            <Button className="bg-primary" type="submit">
              {capitalizeStr(t('Signin.signin'))}
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

export default SignInForm;
