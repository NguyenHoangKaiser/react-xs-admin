import { RouteEnum } from '@/router/utils';
import { useAppSelector } from '@/store/hooks';
import { sceneSelector } from '@/store/modules/scene';
import type { Interpolation, Theme } from '@emotion/react';
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';
import type { CSSProperties, ReactNode } from 'react';
import { useMemo, useState } from 'react';
import { useTabsChange } from '../hooks/useTabsChange';
import type { RightClickTags } from '../hooks/useTabsState';
import { useTabsState } from '../hooks/useTabsState';

interface TabsItemLabelProps {
  pathKey: string;
  children: ReactNode;
  eventType?: 'click' | 'ContextMenu';
  className?: string;
  style?: CSSProperties;
  css?: Interpolation<Theme>;
}

const TabsItemLabel = (props: TabsItemLabelProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const { menuItems } = useTabsState(props.pathKey, open);
  const { onTabsDropdownChange } = useTabsChange();
  const { addingScene } = useAppSelector(sceneSelector);

  const menuClick: MenuProps['onClick'] = (e) => {
    e.domEvent.stopPropagation();
    onTabsDropdownChange(e.key as RightClickTags['code'], props.pathKey, {
      route: [RouteEnum.SettingsScenesAdd],
      title: 'Are you sure you want to leave? Any unsaved changes will be lost.',
      trigger: addingScene,
    });
  };

  const contentProps: React.DOMAttributes<HTMLDivElement> = useMemo(() => {
    if (props.eventType === 'click') {
      return {
        onClick: (e) => {
          e.preventDefault();
          setOpen(!open);
        },
      };
    } else {
      return {
        onContextMenu: (e) => {
          e.preventDefault();
          setOpen(!open);
        },
      };
    }
  }, [props.eventType]);

  return (
    <Dropdown
      open={open}
      menu={{
        items: menuItems,
        onClick: menuClick,
      }}
      onOpenChange={(visible) => !visible && setOpen(visible)}
    >
      <div className={props.className} style={props.style} {...contentProps} css={props.css}>
        {props.children}
      </div>
    </Dropdown>
  );
};

export default TabsItemLabel;
