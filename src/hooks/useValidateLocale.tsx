import type { FormInstance } from 'antd';
import { useEffect } from 'react';
import { useIntl } from 'react-intl';

const useValidateLocale = (form: FormInstance<any>) => {
  const { locale } = useIntl();
  useEffect(() => {
    const errors = form.getFieldsError();
    const names = errors.filter((err) => err.errors.length > 0).map((err) => err.name[0]);
    if (names.length) {
      form.validateFields(names);
    }
    return;
  }, [locale]);
  return null;
};

export default useValidateLocale;
