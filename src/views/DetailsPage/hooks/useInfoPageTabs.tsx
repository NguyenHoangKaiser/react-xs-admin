import type { LocaleId } from '@/locales';
import type { MultiTabsType } from '@/store/modules/route';
import { setStoreMultiTabs } from '@/store/modules/route';
import { useDispatch } from 'react-redux';
import type { NavigateOptions } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export const useInfoPageTabs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleTabs = (pateType: 'query' | 'params', type: 'add' | 'update', id: number) => {
    let tabs: MultiTabsType;

    if (pateType === 'params') {
      tabs = {
        key: `/details-page/details-params/${id}`,
        label: `Params-${id}`,
        localeLabel: `layout.menu.detailsPage`,
      };
    } else {
      tabs = {
        key: `/details-page/details-info?id=${id}`,
        label: `-${id}`,
        localeLabel: `layout.menu.detailsPage`,
      };
    }
    dispatch(setStoreMultiTabs({ type, tabs }));
  };

  const navigateTabs = ({
    path,
    label,
    localeLabel,
    option,
  }: {
    path: string;
    label?: string;
    localeLabel?: LocaleId;
    option?: NavigateOptions;
  }) => {
    // const route = path.split('/');
    let tab: MultiTabsType = {
      key: path,
    };
    if (label) {
      tab = {
        ...tab,
        label,
      };
    }
    if (localeLabel) {
      tab = {
        ...tab,
        localeLabel,
      };
    }
    dispatch(
      setStoreMultiTabs({
        type: 'add',
        tabs: tab,
      }),
    );
    navigate(path, option);
  };

  return { handleTabs, navigateTabs };
};
