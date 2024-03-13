import { Button, Card, Collapse, Form, Input, Modal, Space, type CollapseProps } from 'antd';
import { useState } from 'react';
import type { IGroupItems } from '.';

export default () => {
  const [modal1Open, setModal1Open] = useState<boolean>(false);
  const [modal2Open, setModal2Open] = useState<boolean>(false);

  const FAKE_GROUP_CHILD: IGroupItems = {
    group_lighting: [
      {
        group_name: 'group 1',
        devices: { device_id: '1', icon: 'light', device_type: 2, type: 'LIGHT' },
      },
      {
        group_name: 'group 1',
        devices: { device_id: '2', icon: 'light', device_type: 2, type: 'LIGHT' },
      },
      {
        group_name: 'group 1',
        devices: { device_id: '3', icon: 'light', device_type: 2, type: 'LIGHT' },
      },
      {
        group_name: 'group 1',
        devices: { device_id: '4', icon: 'light', device_type: 2, type: 'LIGHT' },
      },
      {
        group_name: 'group 1',
        devices: { device_id: '5', icon: 'light', device_type: 2, type: 'LIGHT' },
      },
      {
        group_name: 'group 1',
        devices: { device_id: '6', icon: 'light', device_type: 2, type: 'LIGHT' },
      },
    ],
    group_normal: [
      {
        group_name: 'group 1',
        devices: { device_id: '1', icon: 'AC', device_type: 4, type: 'AC' },
      },
      {
        group_name: 'group 1',
        devices: { device_id: '2', icon: 'AC', device_type: 4, type: 'AC' },
      },
      {
        group_name: 'group 1',
        devices: { device_id: '3', icon: 'AC', device_type: 4, type: 'AC' },
      },
      {
        group_name: 'group 1',
        devices: { device_id: '4', icon: 'AC', device_type: 4, type: 'AC' },
      },
      {
        group_name: 'group 1',
        devices: { device_id: '5', icon: 'AC', device_type: 4, type: 'AC' },
      },
      {
        group_name: 'group 1',
        devices: { device_id: '6', icon: 'AC', device_type: 4, type: 'AC' },
      },
    ],
  };

  const generateCollapseItems = (list: IGroupItems) => {
    const listLighting: React.ReactNode[] = [];
    const listNormal: React.ReactNode[] = [];
    list.group_lighting?.map((e, index) => {
      if (index < (list.group_lighting?.length ?? 0) - 1) {
        listLighting.push(
          <Card
            key={`${e.devices.device_id}`}
            style={{ width: 150 }}
            cover={
              <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              />
            }
          >
            <Card.Meta title={e.group_name} />
          </Card>,
        );
      } else {
        listLighting.push(
          <div className="flex flex-row gap-4" key={`${e.devices.device_id}`}>
            <Card
              style={{ width: 150 }}
              cover={
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
              }
            >
              <Card.Meta title={e.group_name} />
            </Card>
            <Card
              style={{
                width: 150,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Button type="primary" onClick={() => setModal1Open(true)}>
                Add Group
              </Button>
            </Card>
          </div>,
        );
      }
    });
    list.group_normal?.map((e, index) => {
      if (index < (list.group_lighting?.length ?? 0) - 1) {
        listNormal.push(
          <Card
            key={`${e.devices.device_id}`}
            style={{ width: 150 }}
            cover={
              <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              />
            }
          >
            <Card.Meta title={e.group_name} />
          </Card>,
        );
      } else {
        listNormal.push(
          <div className="flex flex-row gap-4" key={`${e.devices.device_id}`}>
            <Card
              style={{ width: 150 }}
              cover={
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
              }
            >
              <Card.Meta title={e.group_name} />
            </Card>
            <Card
              style={{
                width: 150,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Button type="primary" onClick={() => setModal2Open(true)}>
                Add Group
              </Button>
            </Card>
          </div>,
        );
      }
    });
    return { listLighting, listNormal };
  };

  const { listLighting, listNormal } = generateCollapseItems(FAKE_GROUP_CHILD);

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

  const onChange = (key: string | string[]) => {
    console.log(key);
  };
  return (
    <>
      <Collapse
        ghost
        size="small"
        bordered={false}
        onChange={onChange}
        defaultActiveKey={['normal', 'lighting']}
        items={FAKE_GROUP}
      />
      <Modal
        title="Vertically centered modal dialog"
        centered
        open={modal1Open}
        onOk={() => setModal1Open(false)}
        onCancel={() => setModal1Open(false)}
      >
        <Form>
          <Form.Item label="Field A">
            <Input placeholder="input placeholder" />
          </Form.Item>
          <Form.Item label="Field B">
            <Input placeholder="input placeholder" />
          </Form.Item>
          <Form.Item {...buttonItemLayout}>
            <Button type="primary">Submit</Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Vertically centered modal dialog"
        closable
        centered
        open={modal2Open}
        onOk={() => setModal2Open(false)}
        onCancel={() => setModal2Open(false)}
      >
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal>
    </>
  );
};
