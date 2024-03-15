import SvgIcon from '@/components/SvgIcon';
import type { DataType, FieldType } from '@/utils/constant';
import { Button, Col, Row, Typography, theme } from 'antd';
import { memo, useState } from 'react';

import { convertProtocol, convertRole, convertRoom } from '..';
import DeviceEditFormModal from './EditDeviceModal';

const { Title } = Typography;

const DeviceDetail = memo(({ record }: { record: DataType | undefined }) => {
  const { token } = theme.useToken();
  const [open, setOpen] = useState<boolean>(false);

  const onCreate = (values: FieldType) => {
    console.log('Received values of form: ', values);
    setOpen(false);
  };

  return (
    <div className="flex-1">
      <Row className="pl-4">
        <Col span={10}>
          <Title level={4}>Basic Parameters</Title>
          <Row>
            <Col span={12}>
              <Typography style={{ color: '#00012345' }}>Name:</Typography>
              <Typography style={{ color: '#00012345' }}>Room:</Typography>
              <Typography style={{ color: '#00012345' }}>Role:</Typography>
              <Typography style={{ color: '#00012345' }}>Category</Typography>
            </Col>
            <Col span={12} className="text-right">
              <Typography>{record?.name ?? ''}</Typography>
              <Typography>{convertRoom(record?.roomId ?? 0)}</Typography>
              <Typography>{convertProtocol(record?.protocol ?? 0)}</Typography>
              <Typography>{convertRole(record?.role ?? 0)}</Typography>
            </Col>
          </Row>
        </Col>
        <Col span={14} className="pl-8">
          <Title level={4}>Icon</Title>
          <span style={{ fontSize: 32 }}>
            <SvgIcon name={record?.image ?? 'trophy'} />
          </span>
        </Col>
      </Row>
      <div
        className="h-11 w-full bg-white mt-6  flex items-center justify-end pr-4"
        style={{ borderTop: `1px solid ${token.colorBorder}` }}
      >
        <Button type="primary" onClick={() => setOpen(true)}>
          Save
        </Button>
      </div>
      <DeviceEditFormModal
        open={open}
        onCreate={onCreate}
        onCancel={() => setOpen(false)}
        initialValues={record!}
      />
    </div>
  );
});

export default DeviceDetail;
