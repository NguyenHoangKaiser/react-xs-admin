import { useLocale } from '@/locales';
import { Button } from 'antd';
import { useInfoPageTabs } from './hooks/useInfoPageTabs';

const DetailsPage = () => {
  const intl = useLocale();

  const { navigateTabs } = useInfoPageTabs();
  const queryChange = (pateType: 'query' | 'params', i: number) => {
    let path = `/details-page/details-info?id=${i}`;
    if (pateType === 'params') {
      path = `/details-page/details-params/${i}`;
    }
    // handleTabs(pateType, 'add', i);
    navigateTabs({ path });
  };

  return (
    <div className="p-3">
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

export default DetailsPage;
