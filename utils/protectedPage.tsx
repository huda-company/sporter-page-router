// utils/protectedPage.tsx
import { AUTH_PAGE_URL } from '@/constants/pageURL';
import { getSession } from 'next-auth/react';

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: AUTH_PAGE_URL.SIGNIN, // Redirect to the login page
        permanent: false
      }
    };
  }

  return {
    props: {} // Page data will be passed here
  };
}
