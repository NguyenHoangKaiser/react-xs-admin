import type { DataType } from '@/utils/constant';
import { Button, Col, Row, Typography, theme } from 'antd';
import { memo } from 'react';

const { Title } = Typography;

const Advance = memo(({ record }: { record: DataType | undefined }) => {
  const { token } = theme.useToken();
  console.log('record', record);

  return (
    <div className="flex-1">
      <Row className="pl-4">
        <Col span={8} style={{ borderRight: `1px solid ${token.colorBorder}` }} className="pr-6">
          <Row>
            <Col span={12}>
              <Typography style={{ color: token.colorTextDescription, paddingBottom: 8 }}>
                NodeID:
              </Typography>
              <Typography style={{ color: token.colorTextDescription, paddingBottom: 8 }}>
                Parameters template:
              </Typography>
              <Typography style={{ color: token.colorTextDescription, paddingBottom: 8 }}>
                Z-Wave type:
              </Typography>
              <Typography style={{ color: token.colorTextDescription, paddingBottom: 8 }}>
                Z-Wave version
              </Typography>
            </Col>
            <Col span={12} className="text-right">
              <Typography style={{ paddingBottom: 8 }}>2</Typography>
              <Typography style={{ paddingBottom: 8 }}>836</Typography>
              <Typography style={{ paddingBottom: 8 }}>3</Typography>
              <Typography style={{ paddingBottom: 8 }}>62</Typography>
            </Col>
          </Row>
        </Col>
        <Col span={16} className="pl-8">
          <Title level={5}>Energy Consumption</Title>
          <Row className="justify-evenly">
            <Col className="items-center justify-center flex-col flex">
              <Title level={1}>8.9</Title>
              <Typography>Current</Typography>
              <Typography style={{ color: token.colorPrimary }}>[W]</Typography>
            </Col>
            <Col className="items-center justify-center flex-col flex">
              <Title level={1}>8.9</Title>
              <Typography>Current</Typography>
              <Typography style={{ color: token.colorPrimary }}>[kWh]</Typography>
            </Col>
            <Col className="items-center justify-center flex-col flex">
              <Title level={1}>8.9</Title>
              <Typography>Current</Typography>
              <Typography style={{ color: token.colorPrimary }}>[kW]h</Typography>
            </Col>
            <Col className="items-center justify-center flex-col flex">
              <Title level={1}>8.9</Title>
              <Typography>Current</Typography>
              <Typography style={{ color: token.colorPrimary }}>[kWh]</Typography>
            </Col>
          </Row>
        </Col>
      </Row>
      <div
        className="h-11 w-full  mt-6  flex items-center justify-end pr-4 "
        style={{ borderTop: `1px solid ${token.colorBorder}`, backgroundColor: token.colorBgBase }}
      >
        <Button type="primary">Save</Button>
      </div>
    </div>
  );
});

export default Advance;
