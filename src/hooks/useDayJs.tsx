import { useAppSelector } from '@/store/hooks';
import { ELocale } from '@/utils/constant';
import dayjs from 'dayjs';
import { useEffect } from 'react';

/**
 * useDayJs hook to set dayjs locale based on app locale.
 * Don't need to use this hook if you don't format date
 * @returns dayjs instance
 */
export const useDayJs = () => {
  const locale = useAppSelector((state) => state.app.locale);

  useEffect(() => {
    if (locale === ELocale.en) {
      dayjs.locale('en');
      return;
    } else {
      dayjs.locale('vi-VN');
      return;
    }
  }, [locale]);

  const DAYJS = dayjs;

  return { DAYJS };
};
