import SvgIcon from '@/components/SvgIcon';
import TreeAnchor from '@/layout/components/PageAnchor/TreeAnchor';
import type { IAnchorItem, IDevicesListItem, IListIconItem } from '@/utils/constant';
import { FAKE_DATA, ListIconImage, generateAnchorList, generateTreeNode } from '@/utils/constant';
import { RightOutlined, SettingOutlined } from '@ant-design/icons';
import type { CollapseProps } from 'antd';
import { Button, Collapse, Drawer, Flex, List, Slider, Switch, Typography, theme } from 'antd';
import { memo, useCallback, useState } from 'react';
import { useIntl } from 'react-intl';
import DeviceCard from './components/DeviceCard';
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
  const { locale } = useIntl();
  const anchorItems = generateAnchorList(FAKE_DATA.devicesList.items, FAKE_DATA.sectionList.items);
  const treeData = generateTreeNode(FAKE_DATA.devicesList.items, FAKE_DATA.sectionList.items);
  const { token } = theme.useToken();

  const [selectedDevice, setSelectedDevice] = useState<IDevicesListItem | null>(null);

  const [selectedIcon, setSelectedIcon] = useState<IListIconItem>();

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
                    const icon =
                      ListIconImage[device.id % ListIconImage.length] || ListIconImage[0];
                    return (
                      <List.Item>
                        {/* <Badge.Ribbon placement="start" text="28 °C"> */}
                        <DeviceCard
                          onClick={() => {
                            setSelectedIcon(icon);
                            setSelectedDevice(device);
                          }}
                          device={device}
                          icon={icon}
                        />
                        {/* </Badge.Ribbon> */}
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
    [locale, token.colorError, token.colorPrimary],
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
          <div className="mb-4">
            {selectedIcon && (
              <span style={{ fontSize: '60px' }}>
                <SvgIcon name={selectedIcon.type} />
              </span>
            )}
            {/* {selectedDevice?.status ? (
              <Image
                width={60}
                src={selectedIcon.on}
                fallback={selectedIcon.name}
                preview={false}
              />
            ) : (
              <Typography.Text ellipsis style={{ fontSize: 28, marginTop: 5 }}>
                {locale === 'en-US' ? selectedIcon.name_en : selectedIcon.name}
              </Typography.Text>
            )} */}
          </div>
          <Typography.Title level={3}>{selectedDevice?.name}</Typography.Title>
          <Typography.Text>
            Description: {locale === 'en-US' ? selectedIcon?.name_en : selectedIcon?.name}
          </Typography.Text>
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
