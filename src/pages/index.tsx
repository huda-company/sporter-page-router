import LocaleSwitcher from '@/components/LocalSwitcher';
import PageLayout from '@/components/PageLayout';
import { getStaticPropsUtil } from '^/utils/getStaticPropsUtil';
import { GetStaticPropsContext } from 'next';
import { useTranslations } from 'next-intl';

export default function Index() {
  const t = useTranslations('Index');

  return (
    <PageLayout title={t('title')}>
      <p>{t('description')}</p>
      <LocaleSwitcher />
    </PageLayout>
  );
}

export { getStaticPropsUtil };
