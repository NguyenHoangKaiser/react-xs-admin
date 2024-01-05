import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useInfoPageTabs } from './hooks/useInfoPageTabs';
import { useLocale } from '@/locales';

const DateilsPage = () => {
  const navigate = useNavigate();
  const intl = useLocale();

  const { handleTabs } = useInfoPageTabs();
  const queryChange = (pateType: 'query' | 'params', i: number) => {
    let path = `/details-page/details-info?id=${i}`;
    if (pateType === 'params') {
      path = `/details-page/details-params/${i}`;
    }
    handleTabs(pateType, 'add', i);
    navigate(path);
  };

  return (
    <div>
      <div>
        {[1, 2, 3, 4, 5].map((i) => {
          return (
            <Button key={i} style={{ marginRight: 12 }} onClick={() => queryChange('query', i)}>
              {intl.formatMessage({ id: 'layout.menu.detailsPage' })}-{i}
            </Button>
          );
        })}
      </div>
      <div style={{ marginTop: 12 }}>
        {[1, 2, 3, 4, 5].map((i) => {
          return (
            <Button key={i} style={{ marginRight: 12 }} onClick={() => queryChange('params', i)}>
              {intl.formatMessage({ id: 'layout.menu.detailsPage' })}Params-{i}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default DateilsPage;
