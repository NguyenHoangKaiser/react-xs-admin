import TreeAnchor from '@/layout/components/PageAnchor/TreeAnchor';
import type { IAnchorItem, IDevicesListItem } from '@/utils/constant';
import { FAKE_DATA, generateAnchorList, generateTreeNode } from '@/utils/constant';
import { RightOutlined, SettingOutlined } from '@ant-design/icons';
import { InfoCircledIcon, LightningBoltIcon } from '@radix-ui/react-icons';
import type { CollapseProps } from 'antd';
import {
  Button,
  Card,
  Collapse,
  Drawer,
  Flex,
  List,
  Slider,
  Switch,
  Typography,
  theme,
} from 'antd';
import { memo, useCallback, useState } from 'react';
import { getCollapseCss } from './style';

const CollapseProp: CollapseProps = {
  bordered: true,
  ghost: true,
  size: 'small',
  expandIcon({ isActive }) {
    return <RightOutlined style={{ fontSize: 16 }} rotate={isActive ? 90 : 0} />;
  },
};

const Home = memo(() => {
  const anchorItems = generateAnchorList(FAKE_DATA.devicesList.items, FAKE_DATA.sectionList.items);
  const treeData = generateTreeNode(FAKE_DATA.devicesList.items, FAKE_DATA.sectionList.items);
  const { token } = theme.useToken();

  const [selectedDevice, setSelectedDevice] = useState<IDevicesListItem | null>(null);
  const onClose = () => {
    setSelectedDevice(null);
  };

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
                  grid={{
                    gutter: 8,
                    xs: 1,
                    sm: 2,
                    md: 4,
                    lg: 4,
                    xl: 6,
                    xxl: 10,
                  }}
                  dataSource={item.renderDevice}
                  renderItem={(device) => (
                    <List.Item>
                      <Card
                        hoverable
                        onClick={() => {
                          setSelectedDevice(device);
                        }}
                        styles={{
                          body: {
                            padding: 8,
                          },
                        }}
                      >
                        <Flex vertical justify="center" align="center">
                          <div
                            style={{
                              color: device.status ? token.colorPrimary : token.colorError,
                            }}
                            className="flex justify-between items-center w-full"
                          >
                            <LightningBoltIcon width={20} height={20} />
                            <InfoCircledIcon width={20} height={20} />
                          </div>
                          <div className="h-[68px]">
                            {device.status ? (
                              <SettingOutlined style={{ fontSize: 60, marginBottom: 8 }} />
                            ) : (
                              <Typography.Text ellipsis style={{ fontSize: 28, marginTop: 5 }}>
                                {device.name || 'Name'}
                              </Typography.Text>
                            )}
                          </div>
                          <Typography.Title level={5}>{device.name || 'Name'}</Typography.Title>
                          <Typography.Text>{device.description || 'Description'}</Typography.Text>
                        </Flex>
                      </Card>
                    </List.Item>
                  )}
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
    [
      // no dependencies
    ],
  );

  return (
    <TreeAnchor treeProps={{ treeData }}>
      <Collapse
        {...CollapseProp}
        css={getCollapseCss(token)}
        defaultActiveKey={anchorItems.map((item) => `collapse${item.key}`)}
        items={generateCollapseItems(anchorItems)}
      />
      <Drawer
        title="Control Panel"
        placement="right"
        onClose={onClose}
        open={!!selectedDevice}
        getContainer={false}
        extra={<Button type="text" shape="circle" icon={<SettingOutlined />} />}
      >
        <Flex vertical justify="center" align="center">
          <SettingOutlined style={{ fontSize: 60, marginBottom: 16 }} />
          <Typography.Title level={3}>{selectedDevice?.name}</Typography.Title>
          <Typography.Text>{selectedDevice?.description || 'Description'}</Typography.Text>
          <div
            style={{
              borderBottom: `1px solid ${token.colorBorder}`,
            }}
            className="w-full mt-3 pb-3 flex justify-between items-center"
          >
            <Typography.Title level={5}>Power switch :</Typography.Title>
            <Switch checked={!!selectedDevice?.status} />
          </div>
          <div className="w-full mt-3 flex justify-between items-center">
            <Typography.Title level={5}>Brightness :</Typography.Title>
          </div>
          <Slider
            style={{
              width: '100%',
              borderBottom: `1px solid ${token.colorBorder}`,
              paddingBottom: 22,
            }}
            tooltip={{
              formatter(value) {
                return `${value}%`;
              },
            }}
          />
          <div
            style={{
              borderBottom: `1px solid ${token.colorBorder}`,
            }}
            className="w-full mt-3 pb-3 flex justify-between items-center"
          >
            <Typography.Title level={5}>Current consumption :</Typography.Title>
            <Typography.Text>0.0 W</Typography.Text>
          </div>
          <div
            style={{
              borderBottom: `1px solid ${token.colorBorder}`,
            }}
            className="w-full mt-3 pb-3 flex justify-between items-center"
          >
            <Typography.Title level={5}>Total energy use :</Typography.Title>
            <Typography.Text>0.0 kWh</Typography.Text>
          </div>
        </Flex>
      </Drawer>
    </TreeAnchor>
  );
});

export default Home;
