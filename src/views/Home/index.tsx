import TreeAnchor from '@/layout/components/PageAnchor/TreeAnchor';
import type { IAnchorItem, IDevicesListItem, IListIconItem } from '@/utils/constant';
import { FAKE_DATA, ListIconImage, generateAnchorList, generateTreeNode } from '@/utils/constant';
import { RightOutlined } from '@ant-design/icons';
import type { CollapseProps } from 'antd';
import { Collapse, List, Typography } from 'antd';
import { memo, useCallback, useState } from 'react';
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

const Home = memo(() => {
  // const { hotel_id, idx_Floor } = useAppSelector(hotelSelector);
  // const { data, isFetching } = useGetDevicesQuery({
  //   hotel_id: hotel_id?.toString() || '',
  //   floor_id: idx_Floor?.toString() || '',
  // });
  // console.log(data, isFetching);
  const anchorItems = generateAnchorList(FAKE_DATA.devicesList.items, FAKE_DATA.sectionList.items);
  const treeData = generateTreeNode(FAKE_DATA.devicesList.items, FAKE_DATA.sectionList.items);

  const [selectedDevice, setSelectedDevice] = useState<IDevicesListItem | null>(null);

  const [selectedIcon, setSelectedIcon] = useState<IListIconItem>();

  const onClose = () => {
    setSelectedDevice(null);
  };

  // useCallback to memoize the function generateCollapseItems
  const generateCollapseItems = useCallback((list: IAnchorItem[]) => {
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
                grid={{
                  gutter: 16,
                  xs: 1,
                  sm: 2,
                  md: 4,
                  lg: 6,
                  xl: 8,
                  xxl: 10,
                }}
                dataSource={item.renderDevice}
                renderItem={(device) => {
                  const icon = ListIconImage[device.id % ListIconImage.length] || ListIconImage[0];
                  return (
                    <List.Item>
                      <DeviceCard
                        onClick={() => {
                          setSelectedIcon(icon);
                          setSelectedDevice(device);
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
  }, []);

  return (
    <TreeAnchor treeProps={{ treeData }}>
      <div css={getCollapseCss()}>
        <Collapse
          {...CollapseProp}
          defaultActiveKey={anchorItems.map((item) => `collapse${item.key}`)}
          items={generateCollapseItems(anchorItems)}
        />
        <ControlDrawer icon={selectedIcon} device={selectedDevice} onClose={onClose} />
      </div>
    </TreeAnchor>
  );
});

export default Home;
