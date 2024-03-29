import TreeAnchor from '@/layout/components/PageAnchor/TreeAnchor';
import { useGetDevicesQuery } from '@/server/devicesApi';
import { useAppSelector } from '@/store/hooks';
import { hotelSelector } from '@/store/modules/hotel';
import type { IAnchorItem, IDevicesListItem } from '@/utils/constant';
import { FAKE_DATA, generateAnchorList, generateTreeNode } from '@/utils/constant';
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
  const { data, isFetching } = useGetDevicesQuery(
    {
      hotel_id: hotel_id?.toString() || '',
      floor_id: idx_Floor?.toString() || '',
    },
    // {
    //   refetchOnFocus: true,
    // },
  );

  const items = useMemo(
    () =>
      data?.items?.map((item, index): IDevicesListItem => {
        if (index) {
          const id = 12 + (index % 3);
          return {
            ...item,
            building_area: {
              id,
              name: `Building ${id}`,
            },
          };
        }
        return {
          ...item,
          building_area: {
            id: 9,
            name: 'Building 9',
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

  const [selectedDevice, setSelectedDevice] = useState<string | undefined>(undefined);
  const [open, setOpen] = useState(false);

  const onClose = useCallback(() => {
    setOpen(false);
    setTimeout(() => {
      setSelectedDevice(undefined);
    }, 300);
  }, []);

  const defaultActiveKey = useMemo(
    () => anchorItems.map((item) => `collapse${item.key}`),
    [anchorItems],
  );

  // useCallback to memoize the function generateCollapseItems
  const generateCollapseItems = useCallback(
    (list: IAnchorItem[]) => {
      const getChild = (list: IAnchorItem[]): CollapseProps['items'] => {
        const render: CollapseProps['items'] = [];
        list.forEach((item) => {
          const haveChildren = item.children && item.children.length;
          const haveRenderDevice = item.renderDevice && item.renderDevice.length;
          if (haveChildren && !haveRenderDevice) {
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
                  defaultActiveKey={item.children?.map((child) => `collapse${child.key}`)}
                  items={generateCollapseItems(item.children!)}
                />
              ),
            });
          }
          if (haveRenderDevice && !haveChildren) {
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
                    return (
                      <List.Item>
                        <DeviceCard
                          onClick={() => {
                            setSelectedDevice(device._id);
                            setOpen(true);
                          }}
                          device={device}
                        />
                      </List.Item>
                    );
                  }}
                />
              ),
            });
          }
          if (haveChildren && haveRenderDevice) {
            return render.push({
              key: `collapse${item.key}`,
              label: (
                <Typography.Title style={{ marginBottom: 0 }} level={4} id={item.key}>
                  {item.title}
                </Typography.Title>
              ),
              children: (
                <>
                  <List
                    grid={collapseListLayout}
                    loading={isFetching}
                    dataSource={item.renderDevice}
                    renderItem={(device) => {
                      return (
                        <List.Item>
                          <DeviceCard
                            onClick={() => {
                              setSelectedDevice(device._id);
                              setOpen(true);
                            }}
                            device={device}
                          />
                        </List.Item>
                      );
                    }}
                  />
                  <Collapse
                    {...CollapseProp}
                    defaultActiveKey={item.children?.map((child) => `collapse${child.key}`)}
                    items={generateCollapseItems(item.children!)}
                  />
                </>
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
    <TreeAnchor loading={{ tree: isFetching }} treeProps={{ treeData }}>
      <div css={getCollapseCss()}>
        {defaultActiveKey.length > 0 && (
          <Collapse
            {...CollapseProp}
            defaultActiveKey={defaultActiveKey}
            items={generateCollapseItems(anchorItems)}
          />
        )}
        <ControlDrawer open={open} id={selectedDevice} onClose={onClose} />
      </div>
    </TreeAnchor>
  );
});

export default Home;
