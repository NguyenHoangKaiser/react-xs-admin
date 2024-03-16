import type { DataType } from '@/utils/constant';
import { Col, Row, Slider, Switch, Typography, theme } from 'antd';
import { memo, useState } from 'react';

const Preview = memo(({ record }: { record: DataType | undefined }) => {
  const { token } = theme.useToken();
  const [open, setOpen] = useState<boolean>(false);
  console.log('record', record);

  // const onCreate = (values: FieldType) => {
  //   console.log('Received values of form: ', values);
  //   setOpen(false);
  // };
  const colLayout = {
    lg: 20,
    xl: 14,
  };
  return (
    <Row className="px-4 ">
      <Col
        {...colLayout}
        style={{
          borderBottom: `1px solid ${token.colorBorder}`,
        }}
        className="w-full mt-3 pb-3 flex justify-between items-center"
      >
        <Typography.Title level={5} style={{ color: token.colorTextDescription }}>
          Power switch :
        </Typography.Title>
        <Switch checked={!open} onClick={() => setOpen(!open)} />
      </Col>
      <Col {...colLayout}>
        <div className="mt-3 flex justify-between items-center">
          <Typography.Title level={5} style={{ color: token.colorTextDescription }}>
            Brightness :
          </Typography.Title>
        </div>
        <Slider
          style={{
            width: '100%',
            borderBottom: `1px solid ${token.colorBorder}`,
            paddingBottom: 32,
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
          className="w-full mt-3 py-3 flex justify-between items-center"
        >
          <Typography.Title level={5} style={{ color: token.colorTextDescription }}>
            Current consumption :
          </Typography.Title>
          <Typography.Title style={{ color: token.colorPrimary }} level={5}>
            0.0 W
          </Typography.Title>
        </div>
        <div className="w-full mt-3 pt-3 pb-8 flex justify-between items-center">
          <Typography.Title level={5} style={{ color: token.colorTextDescription }}>
            Total energy use :
          </Typography.Title>
          <Typography.Title level={5} style={{ color: token.colorPrimary }}>
            0.0 kWh
          </Typography.Title>
        </div>
      </Col>
    </Row>
  );
});

export default Preview;
