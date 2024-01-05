import { useMemo, useState } from 'react';
import { useAppSelector } from '@/store/hooks';
import { getIntlText } from '@/locales';

export interface RightClickTags {
  text: string;
  disabled: boolean;
  code: 'refresh' | 'close' | 'closeOther' | 'closeLeftOther' | 'closeRightOther';
}

export const useTabsState = (pathKey: string, openDropdown: boolean) => {
  const multiTabs = useAppSelector((state) => state.route.multiTabs);

  const [rightClickTags] = useState<RightClickTags[]>([
    {
      text: getIntlText('tab.refresh'),
      disabled: false,
      code: 'refresh',
    },
    {
      text: getIntlText('tab.close'),
      disabled: false,
      code: 'close',
    },
    {
      text: getIntlText('tab.closeOther'),
      disabled: false,
      code: 'closeOther',
    },
    {
      text: getIntlText('tab.closeLeft'),
      disabled: false,
      code: 'closeLeftOther',
    },
    {
      text: getIntlText('tab.closeRight'),
      disabled: false,
      code: 'closeRightOther',
    },
  ]);

  const getDisabledStatus = (code: string, multiFindIndex: number, multiLength: number) => {
    const isFirstTab = multiFindIndex === 0 && multiLength > 1;
    const isLastTab = multiFindIndex === multiLength - 1 && multiLength > 1;
    const isOnlyTab = multiLength === 1;

    const disableCodesForOnlyTab = ['close', 'closeOther', 'closeLeftOther', 'closeRightOther'];

    if (isFirstTab && code === 'closeLeftOther') return true;
    if (isLastTab && code === 'closeRightOther') return true;
    if (isOnlyTab && disableCodesForOnlyTab.includes(code)) return true;

    return false;
  };

  const rightClickTagsList = useMemo(() => {
    const multiFindIndex = multiTabs.findIndex((i) => i.key === pathKey);
    const multiLength = multiTabs.length;

    return rightClickTags.map((item) => ({
      ...item,
      disabled: getDisabledStatus(item.code, multiFindIndex, multiLength),
    }));
  }, [openDropdown]);

  const menuItems = useMemo(() => {
    return rightClickTagsList.map((i) => {
      return {
        label: i.text,
        key: i.code,
        disabled: i.disabled,
      };
    });
  }, [rightClickTagsList]);

  return { menuItems, rightClickTagsList };
};
