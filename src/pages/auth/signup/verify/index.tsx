import AlertModal from '@/components/AlertModal';
import { AlertModalProps } from '@/components/AlertModal/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AUTH_PAGE_URL, USER_PAGE } from '@/constants/pageURL';
import { signupVerifAPI } from '^/services/auth';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ChangeEvent, useState } from 'react';
import { respBody } from '^/config/serverResponse';
import { initAlerModalValue } from '^/config/auth/signup/config';

const SignupVerif = () => {
  const router = useRouter();
  const { e } = router.query;
  const [email, setEmail] = useState<string>(String(e));
  const [code, setCode] = useState<string>('');
  const [alertModal, setAlertModal] =
    useState<AlertModalProps>(initAlerModalValue);

  const handleVerifCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmitVerifCode = async () => {
    try {
      await signupVerifAPI({
        type: 'email',
        code: code,
        email: email
      });
      setAlertModal({
        ...alertModal,
        open: true,
        success: true,
        title: 'Congratulations !!!',
        content: (
          <div className="flex flex-col py-[1rem] capitalize">
            <span>{respBody.SUCCESS.EMAIL_VERIF_SUCCESS.message}</span>
            <span>You will be redirected to signin page.</span>
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
  };

  const goToDashboard = () => {
    setTimeout(() => {
      setAlertModal({
        ...alertModal,
        open: false
      });
      router.push(AUTH_PAGE_URL.SIGNIN);
    }, 2000);
  };

  return (
    <>
      <AlertModal
        open={alertModal.open}
        title={alertModal.title}
        content={alertModal.content}
        onClose={() =>
          alertModal.success
            ? goToDashboard()
            : setAlertModal({ ...alertModal, open: false })
        }
      />

      <div className="h-screen">
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="border-double border-4 border-blue-900 p-[2rem] w-[40%]">
            <div className="flex flex-col items-center">
              <Image
                src="/sporter-logo.png"
                height={100}
                width={100}
                alt="logo"
              />
            </div>
            <div className="mt-[2rem] flex flex-col justify-center align-center gap-y-[1rem]">
              <p className="text-2xl text-center">
                <u>Email Verification</u>
              </p>
              <Input
                value={e}
                readOnly
                onChange={handleEmailChange}
                name="email"
                placeholder="email"
              />
              <Input
                onChange={handleVerifCodeChange}
                name="verifCode"
                placeholder="verification code"
              />
              <Button onClick={handleSubmitVerifCode}>Submit</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupVerif;
