import { setStoreMultiTabs, type MultiTabsType } from '@/store/modules/route';
import { useDispatch } from 'react-redux';

export const useManageAccountTabs = () => {
  const dispatch = useDispatch();
  const handleTabs = (type: 'add' | 'update') => {
    const tabs: MultiTabsType = {
      key: '/manage-account',
      localeLabel: 'common.manageAccount',
    };

    dispatch(setStoreMultiTabs({ type, tabs }));
  };
  return { handleTabs };
};
