import TreeAnchor from '@/layout/components/PageAnchor/TreeAnchor';
import { useGetDevicesQuery } from '@/server/devicesApi';
import { useAppSelector } from '@/store/hooks';
import { hotelSelector } from '@/store/modules/hotel';
import type { IAnchorItem, IDevicesListItem, IListIconItem } from '@/utils/constant';
import { FAKE_DATA, ListIconImage, generateAnchorList, generateTreeNode } from '@/utils/constant';
import { RightOutlined } from '@ant-design/icons';
import type { CollapseProps } from 'antd';
import { Collapse, List, Typography } from 'antd';
import { memo, useCallback, useMemo, useState } from 'react';
import ControlDrawer from './components/ControlDrawer';
import DeviceCard from './components/DeviceCard';
import { getCollapseCss } from './style';

export const CollapseProp: CollapseProps = {
  bordered: true,
  ghost: true,
  size: 'small',
  expandIcon({ isActive }) {
    return <RightOutlined style={{ fontSize: 16 }} rotate={isActive ? 90 : 0} />;
  },
};

export const collapseListLayout = {
  gutter: 16,
  xs: 1,
  sm: 2,
  md: 4,
  lg: 6,
  xl: 8,
  xxl: 10,
};

const Home = memo(() => {
  const { hotel_id, idx_Floor } = useAppSelector(hotelSelector);
  const { data, isFetching } = useGetDevicesQuery({
    hotel_id: hotel_id?.toString() || '',
    floor_id: idx_Floor?.toString() || '',
  });

  const items = useMemo(
    () =>
      data?.items?.map((item): IDevicesListItem => {
        const id = Math.floor(Math.random() * 18) + 1;
        return {
          ...item,
          building_area: {
            // random id from 1 to 18
            id,
            name: `Building ${id}`,
          },
        };
      }) || [],
    [data],
  );

  const anchorItems = useMemo(
    () => generateAnchorList(items, FAKE_DATA.sectionList.items),
    [items],
  );

  const treeData = useMemo(() => generateTreeNode(items, FAKE_DATA.sectionList.items), [items]);

  console.log('anchorItems', anchorItems);
  console.log('treeData', treeData);

  const [selectedDevice, setSelectedDevice] = useState<IDevicesListItem | null>(null);

  const [selectedIcon, setSelectedIcon] = useState<IListIconItem>();
  const [open, setOpen] = useState(false);

  const onClose = useCallback(() => {
    setOpen(false);
    setTimeout(() => {
      setSelectedDevice(null);
    }, 300);
  }, []);

  const defaultActiveKey = useMemo(
    () => anchorItems.map((item) => `collapse${item.key}`),
    [anchorItems],
  );
  console.log('defaultActiveKey', defaultActiveKey);

  // useCallback to memoize the function generateCollapseItems
  const generateCollapseItems = useCallback(
    (list: IAnchorItem[]) => {
      const getChild = (list: IAnchorItem[]): CollapseProps['items'] => {
        const render: CollapseProps['items'] = [];
        list.forEach((item) => {
          if (item.children && item.children.length) {
            return render.push({
              key: `collapse${item.key}`,
              label: (
                <Typography.Title style={{ marginBottom: 0 }} level={4} id={item.key}>
                  {item.title}
                </Typography.Title>
              ),
              children: (
                <Collapse
                  {...CollapseProp}
                  defaultActiveKey={item.children.map((child) => `collapse${child.key}`)}
                  items={generateCollapseItems(item.children)}
                />
              ),
            });
          }
          if (item.renderDevice && item.renderDevice.length) {
            return render.push({
              key: `collapse${item.key}`,
              label: (
                <Typography.Title style={{ marginBottom: 0 }} level={4} id={item.key}>
                  {item.title}
                </Typography.Title>
              ),
              children: (
                <List
                  grid={collapseListLayout}
                  loading={isFetching}
                  dataSource={item.renderDevice}
                  renderItem={(device) => {
                    const icon =
                      ListIconImage[Number(device._id) % ListIconImage.length] || ListIconImage[0];
                    return (
                      <List.Item>
                        <DeviceCard
                          onClick={() => {
                            setSelectedIcon(icon);
                            setSelectedDevice(device);
                            setOpen(true);
                          }}
                          device={device}
                          icon={icon}
                        />
                      </List.Item>
                    );
                  }}
                />
              ),
            });
          }
        });
        return render;
      };
      const render = getChild(list);
      return render;
    },
    [isFetching],
  );

  return (
    <TreeAnchor treeProps={{ treeData }}>
      <div css={getCollapseCss()}>
        {defaultActiveKey.length > 0 && (
          <Collapse
            {...CollapseProp}
            defaultActiveKey={defaultActiveKey}
            items={generateCollapseItems(anchorItems)}
          />
        )}
        <ControlDrawer open={open} icon={selectedIcon} device={selectedDevice} onClose={onClose} />
      </div>
    </TreeAnchor>
  );
});

export default Home;
