import { useLocale } from '@/locales';
import { Button, Result } from 'antd';
import { memo } from 'react';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';

export default memo(() => {
  const init = useLocale();

  const navigate = useNavigate();

  return (
    <Result
      status="403"
      title="403"
      subTitle={init.formatMessage({ id: 'layout.error.403' })}
      extra={
        <Button
          type="primary"
          onClick={() => {
            navigate('/');
          }}
        >
          <FormattedMessage id="layout.backHome" />
        </Button>
      }
    />
  );
});
