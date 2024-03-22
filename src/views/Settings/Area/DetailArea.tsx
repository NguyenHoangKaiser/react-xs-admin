import type { IDevicesListItem1, IListIconItem } from '@/utils/constant';
import { FAKE_DATA, ListIconImage } from '@/utils/constant';
import { getCollapseCss } from '@/views/Home/style';
import { RightOutlined } from '@ant-design/icons';
import type { CollapseProps } from 'antd';
import { Button, Collapse, List, Popconfirm, Typography, message } from 'antd';
import type { DataNode } from 'antd/es/tree';
import { useCallback, useState } from 'react';
import CardDev from './components/Card';
import DrawerControl from './components/DrawerControl';
import EditAreaFormModal from './components/EditAreaModal';
import type { IAnchorItem2 } from './utils/utils';
import { findNodesWithTitle, generateAnchorList2 } from './utils/utils';

interface ExtendedDataNode extends DataNode {
  titleWithNoIcon?: string; // Extending TreeProps and adding the children property
}
interface DataT {
  titleWithNoIcon?: string;
  location: string;
}
const CollapseProp: CollapseProps = {
  bordered: true,
  ghost: true,
  size: 'small',
  expandIcon({ isActive }) {
    return <RightOutlined style={{ fontSize: 16 }} rotate={isActive ? 90 : 0} />;
  },
};

const DetailArea = ({
  data,
  keyChose,
  location,
}: {
  data: ExtendedDataNode;
  keyChose: React.Key;
  location: string;
}) => {
  const anchorItems2 = generateAnchorList2(
    FAKE_DATA.devicesList.items,
    FAKE_DATA.sectionList.items,
  );
  const abc: DataT = {
    titleWithNoIcon: data && data.titleWithNoIcon,
    location: location && location,
  };
  // useCallback to memoize the function generateCollapseItems
  const generateCollapseItems = useCallback((list: IAnchorItem2[]) => {
    const getChild = (list: IAnchorItem2[]): CollapseProps['items'] => {
      const render: CollapseProps['items'] = [];
      list.forEach((item) => {
        if (item.children && item.children.length) {
          console.log(`collapse${item.key}`);
          return render.push({
            key: `collapse${item.key}`,
            label: (
              <Typography.Title style={{ marginBottom: 0 }} level={4} id={item.key}>
                {item.title}
              </Typography.Title>
            ),
            // children: (
            //   <Collapse
            //     {...CollapseProp}
            //     defaultActiveKey={item.children.map((child) => `collapse${child.key}`)}
            //     items={generateCollapseItems(item.children)}
            //   />
            // ),
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
                      <CardDev
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
  const confirm = (e?: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    message.success('Click on Yes');
  };
  const cancel = (e?: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    message.error('Click on No');
  };
  const [open, setOpen] = useState<boolean>(false);

  const [selectedDevice, setSelectedDevice] = useState<IDevicesListItem1 | null>(null);
  const [selectedIcon, setSelectedIcon] = useState<IListIconItem>();
  const onClose = () => {
    setSelectedDevice(null);
  };
  const collapseArray = [];
  for (let i = 1; i <= 20; i++) {
    collapseArray.push(i);
  }
  const onCreate = () => {
    setOpen(false);
  };

  return (
    data && (
      <div css={getCollapseCss()}>
        <Collapse
          {...CollapseProp}
          defaultActiveKey={collapseArray.map((item) => `collapseanchor${item}`)}
          ghost
          items={generateCollapseItems(
            findNodesWithTitle(anchorItems2, data?.titleWithNoIcon ?? '', keyChose, []),
          )}
        />
        <DrawerControl icon={selectedIcon} device={selectedDevice} onClose={onClose} />
        <Popconfirm
          title="Delete the area"
          description="Are you sure to delete this area?"
          onConfirm={confirm}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <Button danger className="absolute top-4 right-4">
            Xóa
          </Button>
        </Popconfirm>
        <Button type="primary" className="absolute top-4 right-24" onClick={() => setOpen(true)}>
          Chỉnh sửa
        </Button>

        <EditAreaFormModal
          open={open}
          onCreate={onCreate}
          onCancel={() => setOpen(false)}
          initialValues={abc}
        />
      </div>
    )
  );
};

export default DetailArea;
