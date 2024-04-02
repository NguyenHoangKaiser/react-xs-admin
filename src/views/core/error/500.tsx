import { useLocale } from '@/locales';
import { Button, Result } from 'antd';
import { memo } from 'react';
import { FormattedMessage } from 'react-intl';

export default memo(() => {
  const init = useLocale();
  return (
    <Result
      status="500"
      title="500"
      subTitle={init.formatMessage({ id: 'layout.error.500' })}
      extra={
        <Button type="primary">
          <FormattedMessage id="layout.backHome" />
        </Button>
      }
    />
  );
});
