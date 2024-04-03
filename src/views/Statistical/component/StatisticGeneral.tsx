import SvgIcon from '@/components/SvgIcon';
import { useLocale } from '@/locales';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Col, Flex, List, Row, Statistic, Typography, theme } from 'antd';

import { AppDefault } from '@/utils/constant';
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
const datasetWithFilters: echarts.DatasetComponentOption[] = [
  {
    id: 'Finland',
    fromDatasetId: 'dataset_raw',
    transform: {
      type: 'filter',
      config: {
        and: [
          { dimension: 'Year', gte: 1800 },
          { dimension: 'Country', '=': 'Finland' },
        ],
      },
    },
  },
];
const seriesList: echarts.SeriesOption[] = [
  {
    type: 'line',
    datasetId: 'Finland',
    showSymbol: false,
    name: 'Finland',
    endLabel: {
      show: true,
      formatter: function (params: any) {
        return params.value[1] + ': ' + params.value[0];
      },
      color: '#f2f',
    },
    labelLayout: {
      moveOverlap: 'shiftY',
    },
    emphasis: {
      focus: 'series',
    },
    encode: {
      x: 'Year',
      y: 'Income',
      label: ['Country', 'Income'],
      itemName: 'Year',
      tooltip: ['Income'],
    },
  },
];
const option: ReactEChartsProps['option'] = {
  animationDuration: 5000,
  textStyle: {
    fontFamily: AppDefault.font,
  },
  dataset: [
    {
      id: 'dataset_raw',
      source: [
        ['Income', 'Country', 'Year'],

        [1244, 'Finland', 1800],

        [1267, 'Finland', 1810],

        [1290, 'Finland', 1820],

        [1360, 'Finland', 1830],

        [1434, 'Finland', 1840],

        [1512, 'Finland', 1850],

        [1594, 'Finland', 1860],

        [1897, 'Finland', 1870],

        [1925, 'Finland', 1880],

        [2305, 'Finland', 1890],

        [2789, 'Finland', 1900],

        [3192, 'Finland', 1910],

        [3097, 'Finland', 1920],

        [4489, 'Finland', 1930],

        [5439, 'Finland', 1940],
        [5449, 'Finland', 1950],
        [5479, 'Finland', 1960],
        [5489, 'Finland', 1970],
        [5499, 'Finland', 1980],
        [5509, 'Finland', 1990],
      ],
    },
    ...datasetWithFilters,
  ],
  xAxis: {
    type: 'category',
    nameLocation: 'middle',
  },
  yAxis: {
    name: 'Income',
  },
  tooltip: {
    order: 'valueAsc',
    trigger: 'axis',
  },
  series: seriesList,
  grid: {
    right: 70,
  },
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
              <ReactECharts option={option} settings={{ notMerge: false, lazyUpdate: false }} />
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
