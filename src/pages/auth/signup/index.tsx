import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import SignUpForm from './SignUpForm';
import { useTranslations } from 'next-intl';
import { GetStaticPropsContext } from 'next/types';
import { avoidSignIn } from '^/utils/avoidSignIn';
import { getStaticPropsUtil } from '^/utils/getStaticPropsUtil';

export const getServerSideProps = avoidSignIn;

export default function Index() {
  const t = useTranslations();

  return (
    <div className="h-screen">
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="border-double border-4 border-blue-900 p-[2rem] w-[35%]">
          <div className="flex flex-col items-center">
            <Image
              src="/sporter-logo.png"
              height={100}
              width={100}
              alt="logo"
            />
          </div>
          <div className="mt-[2rem]">
            <SignUpForm />

            <div className="flex flex-row justify-center items-center text-xs gap-1 mt-[1rem]">
              <p className="flex justify-center">{`${t(
                'Signup.alreadyHaveAcc'
              )} ? `}</p>
              <Link
                className="bg-blue-100 p-1 rounded-[0.5rem]"
                href="/auth/signin"
              >
                {t('Signin.signin')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { getStaticPropsUtil };
