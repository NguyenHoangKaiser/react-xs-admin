import SvgIcon from '@/components/SvgIcon';
import { type IconVariant } from '@/utils/constant';
import { PlusCircleFilled } from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  Collapse,
  Drawer,
  Flex,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Typography,
  theme,
  type CollapseProps,
} from 'antd';
import { useState } from 'react';

interface IGroupDevices {
  group_name?: string;
  category?: string;
  section?: string;
  icon?: IconVariant;
  devices?: { device_type?: number; type?: string; device_id?: string; icon?: string }[];
}

interface IGroupType {
  group_normal?: IGroupDevices[];
  group_lighting?: IGroupDevices[];
}

interface FieldType {
  type?: string;
  group_name?: string;
  category?: string;
  section?: string;
  icon?: IconVariant;
  devices?: { device_type?: number; type?: string; device_id?: string; icon?: string }[];
}

const FAKE_GROUP_CHILD: IGroupType = {
  group_lighting: [
    {
      group_name: 'group 1',
      category: 'Dimmer',
      icon: 'bulb',
      section: 'Khu A1',
      devices: [{ device_id: '1', icon: 'light', device_type: 2, type: 'LIGHT' }],
    },
    {
      group_name: 'group 2',
      category: 'RGB',
      icon: 'gift',
      section: 'Khu A2',
      devices: [{ device_id: '2', icon: 'light', device_type: 2, type: 'LIGHT' }],
    },
    {
      group_name: 'group 3',
      category: 'RGB',
      icon: 'moon',
      section: 'Khu A2',
      devices: [{ device_id: '3', icon: 'light', device_type: 2, type: 'LIGHT' }],
    },
    {
      group_name: 'group 4',
      category: 'WW',
      icon: 'rocket',
      section: 'Khu A3',
      devices: [{ device_id: '4', icon: 'light', device_type: 2, type: 'LIGHT' }],
    },
    {
      group_name: 'group 5',
      category: 'WW',
      icon: 'rocket',
      section: 'Khu A3',
      devices: [{ device_id: '5', icon: 'light', device_type: 2, type: 'LIGHT' }],
    },
    {
      group_name: 'group 6',
      category: 'WW',
      icon: 'rocket',
      section: 'Khu A3',
      devices: [{ device_id: '6', icon: 'light', device_type: 2, type: 'LIGHT' }],
    },
  ],
  group_normal: [
    {
      group_name: 'group 1',
      devices: [{ device_id: '1', icon: 'AC', device_type: 4, type: 'AC' }],
    },
    {
      group_name: 'group 2',
      devices: [{ device_id: '2', icon: 'AC', device_type: 4, type: 'AC' }],
    },
    {
      group_name: 'group 3',
      devices: [{ device_id: '3', icon: 'AC', device_type: 4, type: 'AC' }],
    },
    {
      group_name: 'group 4',
      devices: [{ device_id: '4', icon: 'AC', device_type: 4, type: 'AC' }],
    },
    {
      group_name: 'group 5',
      devices: [{ device_id: '5', icon: 'AC', device_type: 4, type: 'AC' }],
    },
    {
      group_name: 'group 6',
      devices: [{ device_id: '6', icon: 'AC', device_type: 4, type: 'AC' }],
    },
  ],
};

export default () => {
  const [modal1Open, setModal1Open] = useState<boolean>(false);
  const [modal2Open, setModal2Open] = useState<boolean>(false);
  const [fakeGroupChild, setfakeGroupChild] = useState<IGroupType>(FAKE_GROUP_CHILD);
  const [selectedGroup, setSelectedGroup] = useState<IGroupDevices>(); // State to track the selected icon

  const [open, setOpen] = useState(false);
  const thme = theme.useToken();

  const showDrawer = (e: IGroupDevices) => {
    setOpen(true);
    setSelectedGroup(e);
  };

  const onClose = () => {
    setOpen(false);
  };

  const listIcon: IconVariant[] = [
    'bulb',
    'calendar',
    'gift',
    'medal',
    'moon',
    'rocket',
    'star',
    'sun',
    'trophy',
    'umbrella',
  ];

  const generateCollapseItems = (list: IGroupType) => {
    const listLighting: React.ReactNode[] = [];
    const listNormal: React.ReactNode[] = [];
    if (list.group_normal?.length === 0) {
      listNormal.push(
        <Card
          style={{
            width: 150,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Flex vertical gap="middle" align="center">
            <PlusCircleFilled style={{ fontSize: 21, color: thme.token.colorPrimary }} />
            <Button type="primary" onClick={() => setModal1Open(true)}>
              Add Group
            </Button>
          </Flex>
        </Card>,
      );
    } else {
      list.group_normal?.map((e, index) => {
        listNormal.push(
          <Card
            hoverable
            style={{
              width: 150,
              cursor: 'pointer',
            }}
            onClick={() => showDrawer(e)}
          >
            <Flex vertical gap="middle" align="center">
              <SvgIcon name={e.icon ?? 'bulb'} className="text-4xl" />
              <Card.Meta title={e.group_name} />
            </Flex>
          </Card>,
        );
        if (index === (list.group_normal?.length ?? 0) - 1) {
          listNormal.push(
            <Card
              style={{
                width: 150,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Flex vertical gap="middle" align="center">
                <PlusCircleFilled style={{ fontSize: 21, color: thme.token.colorPrimary }} />
                <Button type="primary" onClick={() => setModal1Open(true)}>
                  Add Group
                </Button>
              </Flex>
            </Card>,
          );
        }
      });
    }

    if (list.group_lighting?.length === 0) {
      listLighting.push(
        <Card
          style={{
            width: 150,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Flex vertical gap="middle" align="center">
            <PlusCircleFilled style={{ fontSize: 21, color: thme.token.colorPrimary }} />
            <Button type="primary" onClick={() => setModal2Open(true)}>
              Add Group
            </Button>
          </Flex>
        </Card>,
      );
    } else {
      list.group_lighting?.map((e, index) => {
        listLighting.push(
          <Card
            hoverable
            style={{
              width: 150,
              cursor: 'pointer',
            }}
            onClick={() => showDrawer(e)}
          >
            <Flex vertical gap="middle" align="center">
              <SvgIcon name={e.icon ?? 'bulb'} className="text-4xl" />
              <Card.Meta title={e.group_name} />
            </Flex>
          </Card>,
        );
        if (index === (list.group_lighting?.length ?? 0) - 1) {
          listLighting.push(
            <Card
              style={{
                width: 150,
              }}
            >
              <Flex vertical gap="middle" align="center">
                <PlusCircleFilled style={{ fontSize: 21, color: thme.token.colorPrimary }} />
                <Button type="primary" onClick={() => setModal2Open(true)}>
                  Add Group
                </Button>
              </Flex>
            </Card>,
          );
        }
      });
    }

    return { listLighting, listNormal };
  };

  const { listLighting, listNormal } = generateCollapseItems(fakeGroupChild);

  const FAKE_GROUP: CollapseProps['items'] = [
    {
      key: 'normal',
      label: <strong>Nhóm thường</strong>,
      children: (
        <Space size={'middle'} wrap>
          {listNormal}
        </Space>
      ),
    },
    {
      key: 'lighting',
      label: <strong>Nhóm lighting</strong>,
      children: (
        <Space size={'middle'} wrap>
          {listLighting}
        </Space>
      ),
    },
  ];

  const [form] = Form.useForm();

  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  const onFinish = (values: FieldType) => {
    fakeGroupChild.group_lighting?.push({
      category: values.category,
      group_name: values.group_name,
      icon: values.icon,
      section: values.section,
      devices: [],
    });
    setfakeGroupChild(fakeGroupChild);
    setModal2Open(false);
  };

  const [selectedIcon, setSelectedIcon] = useState<IconVariant>('bulb'); // State to track the selected icon

  // Function to handle icon selection
  const handleIconSelection = (icon: IconVariant) => {
    setSelectedIcon(icon);
    form.setFieldValue('icon', icon);
  };

  return (
    <div className="relative h-full">
      <Collapse
        ghost
        size="small"
        bordered={false}
        onChange={onChange}
        defaultActiveKey={['normal', 'lighting']}
        items={FAKE_GROUP}
      />
      <Drawer placement="right" closable={true} onClose={onClose} open={open} getContainer={false}>
        <Row>
          <Col span={24} className="flex flex-col items-center justify-center">
            <SvgIcon name={selectedGroup?.icon ?? 'bulb'} className="text-8xl" />
            <Typography.Title level={3}>{selectedGroup?.group_name}</Typography.Title>
            <Typography.Text>ON</Typography.Text>
            <Typography.Text>{selectedGroup?.category}</Typography.Text>
            <Typography.Text>{selectedGroup?.section}</Typography.Text>
          </Col>
        </Row>
      </Drawer>
      <Modal
        title="Vertically centered modal 1 dialog"
        closable
        centered
        open={modal1Open}
        onOk={() => setModal1Open(false)}
        onCancel={() => setModal1Open(false)}
      >
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal>
      <Modal
        title="Thêm nhóm lighting"
        centered
        open={modal2Open}
        onOk={() => {
          form.submit();
        }}
        onCancel={() => setModal2Open(false)}
      >
        <Form<FieldType> form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item<FieldType> label="Tên nhóm" name="group_name" rules={[{ required: true }]}>
            <Input placeholder="Tên nhóm" />
          </Form.Item>
          <Form.Item<FieldType> label="Loại thiết bị" name="category" rules={[{ required: true }]}>
            <Select placeholder="Chọn loại thiết bị">
              <Select.Option value="dimmer">Dimmer</Select.Option>
              <Select.Option value="rgb">RGB</Select.Option>
              <Select.Option value="ww">WW</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item<FieldType> label="Thiết bị" name="devices" rules={[{ required: true }]}>
            <Select placeholder="Chọn thiết bị" allowClear mode="multiple">
              <Select.Option value="dimmer">Dimmer</Select.Option>
              <Select.Option value="rgb">RGB</Select.Option>
              <Select.Option value="ww">WW</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item<FieldType> label="Khu vực" name="section" rules={[{ required: true }]}>
            <Select placeholder="Chọn khu vực" allowClear>
              <Select.Option value="dimmer">Dimmer</Select.Option>
              <Select.Option value="rgb">RGB</Select.Option>
              <Select.Option value="ww">WW</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item<FieldType> label="Icon" name="icon">
            <Space wrap>
              {listIcon.map((icon) => (
                <Button
                  key={icon}
                  onClick={() => handleIconSelection(icon)}
                  style={{
                    border:
                      selectedIcon === icon
                        ? `1px solid ${thme.token.colorPrimary}`
                        : `1px solid transparent`,
                    background: 'transparent',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <SvgIcon name={icon} className="text-2xl mb-1" />
                </Button>
              ))}
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
