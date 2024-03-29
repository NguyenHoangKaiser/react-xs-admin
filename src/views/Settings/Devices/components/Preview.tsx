import { useLocale } from '@/locales';
import type { DataType } from '@/utils/constant';
import { Col, Row, Slider, Switch, Typography, theme } from 'antd';
import { memo, useState } from 'react';

const Preview = memo(({ record }: { record: DataType | undefined }) => {
  const { token } = theme.useToken();
  const { formatMessage } = useLocale();
  console.log('record', record);
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Row className="px-4 ">
      <Col
        style={{
          borderBottom: `1px solid ${token.colorBorder}`,
        }}
        className="w-full mt-3 pb-3 flex justify-between items-center"
      >
        <Typography.Title level={5} style={{ color: token.colorTextDescription }}>
          {formatMessage({ id: 'common.powerSwitch' })} :
        </Typography.Title>
        <Switch checked={!open} onClick={() => setOpen(!open)} />
      </Col>
      <Col
        style={{
          borderBottom: `1px solid ${token.colorBorder}`,
        }}
        className="w-full mt-3 pb-3 flex justify-between items-center"
      >
        <Typography.Title level={5} style={{ color: token.colorTextDescription }}>
          {formatMessage({ id: 'common.brightness' })} :
        </Typography.Title>
        <Slider
          style={{
            width: '80%',
          }}
          tooltip={{
            formatter(value) {
              return `${value}%`;
            },
          }}
        />
      </Col>
      <Col
        style={{
          borderBottom: `1px solid ${token.colorBorder}`,
        }}
        className="w-full mt-3 pb-3 flex justify-between items-center"
      >
        <Typography.Title level={5} style={{ color: token.colorTextDescription }}>
          {formatMessage({ id: 'common.consumption' })} :
        </Typography.Title>
        <Typography.Title style={{ color: token.colorPrimary }} level={5}>
          0.0 W
        </Typography.Title>
      </Col>
      <Col className="w-full mt-3 pb-3 flex justify-between items-center">
        <Typography.Title level={5} style={{ color: token.colorTextDescription }}>
          {formatMessage({ id: 'common.totalEnergyUse' })} :
        </Typography.Title>
        <Typography.Title level={5} style={{ color: token.colorPrimary }}>
          0.0 kWh
        </Typography.Title>
      </Col>
    </Row>
  );
});

export default Preview;
