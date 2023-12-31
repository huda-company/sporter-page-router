import Head from 'next/head';
import { useTranslations } from 'next-intl';
import { ReactNode } from 'react';
import { getStaticPropsUtil } from '^/utils/getStaticPropsUtil';
import Topbar from '../Topbar/Topbar';
import Footer from '../Footer/Footer';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '../ui/carousel';
import { Card, CardContent } from '../ui/card';

type Props = {
  children?: ReactNode;
  title: string;
};

export default function PageLayout({ children, title }: Props) {
  const t = useTranslations('Index');

  return (
    <>
      <Head>
        <title>SPORTER</title>
      </Head>
      <div
        className="px-[0.5rem]"
        style={{
          fontFamily: 'system-ui, sans-serif',
          lineHeight: 1.5
        }}
      >
        <div>
          <Topbar />

          {children}

          <Footer />
        </div>
      </div>
    </>
  );
}
export { getStaticPropsUtil };
