import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import clsxm from '^/utils/clsxm';

export default function LocaleSwitcher() {
  const t = useTranslations('LocaleSwitcher');

  const { locale, locales, route } = useRouter();
  const otherLocale = locales?.find(cur => cur !== locale);

  return (
    <div className="flex justify-between items-center gap-[0.3rem] w-fit">
      <Link href={route} locale={'id'}>
        <Avatar
          className={clsxm(locale == 'id' && 'border-2 border-indigo-500')}
        >
          <AvatarImage src="/id_flag.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </Link>

      <div className="border-r-2 border-indigo-500 h-[1rem]"></div>
      <Link href={route} locale={'en'}>
        <Avatar
          className={clsxm(locale == 'en' && 'border-2 border-indigo-500')}
        >
          <AvatarImage src="/en_flag.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </Link>
    </div>
  );
}
