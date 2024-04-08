import SvgIcon from '@/components/SvgIcon';
import { useLocale } from '@/locales';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Col, Flex, List, Row, Statistic, Typography, theme } from 'antd';

import { mq } from '@/style';
import type { CSSObject } from '@emotion/react';
import { ReactECharts, type ReactEChartsProps } from './ReactECharts';

const colLayout = {
  xs: { span: 24 },
  md: { span: 24 },
  lg: { span: 24 },
  xl: { span: 12 },
  xxl: { span: 12 },
};

const colLayout2 = {
  xs: { span: 24 },
  md: { span: 24 },
  lg: { span: 24 },
  xl: { span: 16 },
  xxl: { span: 16 },
};

const colLayout3 = {
  xs: { span: 24 },
  md: { span: 24 },
  lg: { span: 24 },
  xl: { span: 8 },
  xxl: { span: 8 },
};

const option: ReactEChartsProps['option'] = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      smooth: true,
    },
  ],
};
const StatisticGeneral = () => {
  const thme = theme.useToken();
  const { formatMessage } = useLocale();

  return (
    <div className="h-full w-full">
      <Row gutter={[16, 16]}>
        <Col {...colLayout}>
          <div
            style={{
              border: `1px solid ${thme.token.colorBorderSecondary}`,
              borderRadius: 8,
              padding: 4,
            }}
          >
            <Flex vertical={false} align="center" justify="space-between">
              <div
                className="flex flex-1 flex-row gap-4 mr-4"
                style={{ borderRight: `2px solid ${thme.token.colorBorderSecondary}` }}
              >
                <div className="flex items-center">
                  <SvgIcon name="maintenance" className="text-3xl" />
                </div>
                <Statistic
                  title={
                    <Typography.Title level={5}>
                      {formatMessage({ id: 'statistic.production' })}
                    </Typography.Title>
                  }
                  value={0.01}
                  precision={2}
                  valueStyle={{ color: thme.token.colorSuccess, fontSize: 16, fontWeight: 'bold' }}
                  prefix={<ArrowUpOutlined />}
                  suffix="kWh"
                />
              </div>
              <div
                className="flex flex-1 flex-row gap-4 mr-4"
                style={{ borderRight: `2px solid ${thme.token.colorBorderSecondary}` }}
              >
                <div className="flex items-center">
                  <SvgIcon name="maintenance" className="text-3xl" />
                </div>
                <Statistic
                  title={
                    <Typography.Title level={5}>
                      {formatMessage({ id: 'statistic.consumption' })}
                    </Typography.Title>
                  }
                  value={0.01}
                  precision={2}
                  valueStyle={{ color: thme.token.colorError, fontSize: 16, fontWeight: 'bold' }}
                  prefix={<ArrowDownOutlined />}
                  suffix="kWh"
                />
              </div>
              <div className="flex flex-1 flex-row gap-4">
                <div className="flex items-center">
                  <SvgIcon name="maintenance" className="text-3xl" />
                </div>
                <Statistic
                  title={
                    <Typography.Title level={5}>
                      {formatMessage({ id: 'statistic.balance' })}
                    </Typography.Title>
                  }
                  value={-0.08}
                  precision={2}
                  valueStyle={{ color: thme.token.colorError, fontSize: 16, fontWeight: 'bold' }}
                  prefix={<ArrowDownOutlined />}
                  suffix="kWh"
                />
              </div>
            </Flex>
          </div>
        </Col>
        <Col {...colLayout}>
          <div
            style={{
              border: `1px solid ${thme.token.colorBorderSecondary}`,
              borderRadius: 8,
              padding: 4,
            }}
          >
            <Flex vertical={false} align="center" justify="space-between">
              <div
                className="flex flex-[2] flex-row gap-4 mr-4"
                style={{ borderRight: `2px solid ${thme.token.colorBorderSecondary}` }}
              >
                <div className="flex items-center">
                  <SvgIcon name="maintenance" className="text-3xl" />
                </div>
                <Statistic
                  title={
                    <Typography.Title level={5}>
                      {formatMessage({ id: 'statistic.billComparison' })}
                    </Typography.Title>
                  }
                  value={-0.08}
                  precision={2}
                  valueStyle={{
                    color: `${thme.token.colorPrimary}`,
                    fontSize: 16,
                    fontWeight: 'bold',
                  }}
                  suffix="kWh"
                />
              </div>
              <div
                className="flex flex-1 flex-row gap-4 mr-4"
                style={{ borderRight: `2px solid ${thme.token.colorBorderSecondary}` }}
              >
                <div className="flex items-center">
                  <SvgIcon name="maintenance" className="text-3xl" />
                </div>
                <Statistic
                  title={
                    <Typography.Title level={5}>
                      {formatMessage({ id: 'statistic.currentPeriod' })}
                    </Typography.Title>
                  }
                  value={-0.08}
                  precision={2}
                  valueStyle={{
                    color: `${thme.token.colorPrimary}`,
                    fontSize: 16,
                    fontWeight: 'bold',
                  }}
                  suffix="kWh"
                />
              </div>
              <div className="flex flex-1 flex-row gap-4">
                <div className="flex items-center">
                  <SvgIcon name="maintenance" className="text-3xl" />
                </div>
                <Statistic
                  title={
                    <Typography.Title level={5}>
                      {formatMessage({ id: 'statistic.previousPeriod' })}
                    </Typography.Title>
                  }
                  value={-0.08}
                  precision={2}
                  valueStyle={{
                    color: `${thme.token.colorPrimary}`,
                    fontSize: 16,
                    fontWeight: 'bold',
                  }}
                  suffix="kWh"
                />
              </div>
            </Flex>
          </div>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ marginTop: 16, marginBottom: 16 }}>
        <Col {...colLayout2}>
          <div
            style={{
              border: `1px solid ${thme.token.colorBorderSecondary}`,
              borderRadius: 8,
              padding: 8,
              height: '100%',
            }}
          >
            <Flex gap={16} style={{ paddingBottom: 16 }}>
              <SvgIcon name="maintenance" className="text-3xl" />
              <Typography.Title level={5}>
                {formatMessage({ id: 'statistic.energyBalance' })}
              </Typography.Title>
            </Flex>
            <Row style={{ height: 500 }}>
              <div className="chartContainer" css={getCss()}>
                <ReactECharts option={option} settings={{ notMerge: false, lazyUpdate: false }} />
              </div>
            </Row>
          </div>
        </Col>
        <Col {...colLayout3}>
          <div
            style={{
              border: `1px solid ${thme.token.colorBorderSecondary}`,
              borderRadius: 8,
              padding: 8,
              height: '100%',
            }}
          >
            <Flex gap={16} style={{ paddingBottom: 16 }}>
              <SvgIcon name="maintenance" className="text-3xl" />
              <Row className="flex flex-col">
                <Typography.Title level={5}>
                  {formatMessage({ id: 'statistic.topDeviceConsumption' })}
                </Typography.Title>
                <Typography.Text>Last hour</Typography.Text>
              </Row>
            </Flex>
            <List
              dataSource={[
                {
                  device: '113.0 Dehumidifier',
                  section: '1st Floor/Fammily room',
                  energyUsed: '73.7',
                },
                {
                  device: 'Family Room Bed',
                  section: '1st Floor/Fammily room',
                  energyUsed: '23.6',
                },
                {
                  device: '54.0 Air Purifier',
                  section: '2nd Floor/Fammily room',
                  energyUsed: '1.2',
                },
              ]}
              renderItem={(item, index) => (
                <List.Item key={item.device}>
                  <div className="flex flex-row gap-4 items-center justify-between w-full">
                    <div className="flex flex-row items-center gap-4">
                      <div className="w-[16px] h-[16px] rounded-lg flex items-center justify-center bg-cyan-500">
                        {index + 1}
                      </div>
                      <div className="flex flex-col">
                        <Typography.Title level={5}>{item.device}</Typography.Title>
                        <Typography.Text>{item.section}</Typography.Text>
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-center">
                      <Typography.Title level={5} style={{ color: `${thme.token.colorPrimary}` }}>
                        {item.energyUsed} kWh
                      </Typography.Title>
                    </div>
                  </div>
                </List.Item>
              )}
            />
          </div>
        </Col>
      </Row>
      {/* <Col span={24} className="my-2">
        <div style={{ border: `1px solid ${thme.token.colorBorderSecondary}`, borderRadius: 8 }}>
          <ColumnChart />
        </div>
      </Col> */}
    </div>
  );
};

export default StatisticGeneral;
const getCss = (): CSSObject => {
  return {
    ['&']: {
      width: '100%',

      [mq[0]]: {
        width: 'calc(100vw - 119px)',
      },
      [mq[3]]: {
        width: '100%',
      },
    },
  };
};
