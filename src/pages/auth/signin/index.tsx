import Link from 'next/link';
import SignInForm from './SigninForm';
import Image from 'next/image';

import React from 'react';
import { avoidSignIn } from '^/utils/avoidSignIn';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import { capitalizeStr } from '^/utils/capitalizeStr';

export const getServerSideProps = avoidSignIn;

const Signin = () => {
  const t = useTranslations();

  return (
    <div className="App">
      <div className="h-screen">
        <div className="flex flex-col items-center justify-center h-screen ">
          <div className="border-double border-4 border-blue-900 p-[2rem]">
            <div className="flex flex-col items-center">
              <Image
                src="/sporter-logo.png"
                height={100}
                width={100}
                alt="logo"
              />
            </div>
            <div className="mt-[2rem]">
              <SignInForm />

              <div className="flex flex-row justify-center items-center text-xs gap-1 mt-[1rem]">
                <p className="flex justify-center">{`${capitalizeStr(
                  t('Signin.dontHaveAcc')
                )}`}</p>
                <Link
                  className="bg-blue-100 p-1 rounded-[0.5rem]"
                  href="/auth/signup"
                >
                  {t('Signin.createNow')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
