import Link from 'next/link';
import Image from 'next/image';

import React from 'react';
import { Button } from '@/components/ui/button';
import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/router';
import { withAuth } from '^/utils/withAuth';
import { getServerSideProps } from '^/utils/protectedPage';

const Dashboard = () => {
  const router = useRouter();
  // const { status } = useSession({
  //   required: true,
  //   onUnauthenticated() {
  //     router.push("auth/signin")
  //   },
  // })

  const handleSignOut = async () => {
    await signOut({
      redirect: true,
      callbackUrl: '/auth/signin'
    });
  };

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
              Dashboard
              <div className="flex flex-row justify-center items-center text-xs gap-1 mt-[2rem]">
                <p className="flex justify-center">{`don't have an account ?`}</p>
                <Link href="/auth/signout">create now</Link>
                <Button className="bg-error" onClick={handleSignOut}>
                  Sign out
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { getServerSideProps };

export default withAuth(Dashboard);
