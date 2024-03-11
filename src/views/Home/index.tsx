import TreeAnchor from '@/layout/components/PageAnchor/TreeAnchor';
import type { IAnchorItem } from '@/utils/constant';
import { FAKE_DATA, generateAnchorList, generateTreeNode } from '@/utils/constant';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import type { CollapseProps } from 'antd';
import { Avatar, Card, Collapse, Space } from 'antd';
import type { CSSProperties } from 'react';
import { memo } from 'react';

const onChange = (key: string | string[]) => {
  console.log(key);
};

const Home = memo(() => {
  const anchorItems = generateAnchorList(FAKE_DATA.devicesList.items, FAKE_DATA.sectionList.items);
  const treeData = generateTreeNode(FAKE_DATA.devicesList.items, FAKE_DATA.sectionList.items);
  console.log('anchorItems', anchorItems);

  return (
    <TreeAnchor treeProps={{ treeData }}>
      <Collapse
        ghost
        size="small"
        bordered={false}
        onChange={onChange}
        defaultActiveKey={anchorItems.map((item) => `collapse${item.key}`)}
        items={generateCollapseItems(anchorItems)}
      />
    </TreeAnchor>
  );
});

export default Home;

const generateCollapseItems = (list: IAnchorItem[], panelStyle?: CSSProperties) => {
  const getChild = (list: IAnchorItem[]): CollapseProps['items'] => {
    const render: CollapseProps['items'] = [];
    list.forEach((item) => {
      if (item.children && item.children.length) {
        return render.push({
          key: `collapse${item.key}`,
          label: (
            <span style={item.level === 1 ? { color: 'red' } : {}} id={item.key}>
              <strong>{item.title}</strong>
            </span>
          ),
          children: (
            <Collapse
              ghost
              size="small"
              bordered={false}
              onChange={onChange}
              defaultActiveKey={item.children.map((child) => `collapse${child.key}`)}
              items={generateCollapseItems(item.children, panelStyle)}
            />
          ),
          style: panelStyle,
        });
      }
      if (item.renderDevice && item.renderDevice.length) {
        return render.push({
          key: `collapse${item.key}`,
          label: (
            <span style={item.level === 1 ? { color: 'red' } : {}} id={item.key}>
              <strong>{item.title}</strong>
            </span>
          ),
          children: (
            <Space>
              {item.renderDevice.map((device) => {
                return (
                  <div key={device.id}>
                    <Card
                      style={{ width: 300 }}
                      cover={
                        <img
                          alt="example"
                          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                        />
                      }
                      actions={[
                        <SettingOutlined key="setting" />,
                        <EditOutlined key="edit" />,
                        <EllipsisOutlined key="ellipsis" />,
                      ]}
                    >
                      <Card.Meta
                        avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                        title={device.name}
                        description="This is the description"
                      />
                    </Card>
                  </div>
                );
              })}
            </Space>
          ),
          style: panelStyle,
        });
      }
    });
    return render;
  };
  const render = getChild(list);
  return render;
};
