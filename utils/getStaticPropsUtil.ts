// utils/getStaticProps.ts
import { GetStaticPropsContext } from 'next';

export async function getStaticPropsUtil({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`^/dictionaries/${locale}.json`)).default
    }
  };
}
