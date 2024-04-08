import SvgIcon from '@/components/SvgIcon';
import { useLocale } from '@/locales';
import { mq } from '@/style';
import type { CSSObject } from '@emotion/react';
import { Col, DatePicker, Flex, List, Row, Segmented, Statistic, Typography, theme } from 'antd';
import dayjs from 'dayjs';
import type { ReactEChartsProps } from './ReactECharts';
import { ReactECharts } from './ReactECharts';

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

const StatisticSavings = () => {
  const thme = theme.useToken();
  const { formatMessage } = useLocale();

  return (
    <Row className="h-full w-full">
      <Col span={24}>
        <div
          style={{
            border: `1px solid ${thme.token.colorBorderSecondary}`,
            borderRadius: 8,
            padding: 4,
          }}
        >
          <Flex vertical={false} align="center" justify="space-between">
            <Col
              xs={10}
              md={8}
              lg={10}
              xl={10}
              xxl={8}
              className="flex flex-1 flex-row gap-4 mr-4"
              style={{ borderRight: `2px solid ${thme.token.colorBorderSecondary}` }}
            >
              <div className="flex items-center">
                <SvgIcon name="maintenance" className="text-3xl" />
              </div>
              <Statistic
                title={
                  <Typography.Title level={5}>
                    {formatMessage({ id: 'statistic.summaryConsumption' })}
                  </Typography.Title>
                }
                value={formatMessage({ id: 'statistic.noteSummaryConsumption' })}
                precision={2}
                valueStyle={{ color: thme.token.colorText, fontSize: 14 }}
              />
            </Col>
            <Col
              xs={4}
              md={5}
              lg={4}
              xl={4}
              xxl={8}
              className="flex flex-1 flex-row gap-4 mr-4"
              style={{ borderRight: `2px solid ${thme.token.colorBorderSecondary}` }}
            >
              <div className="flex items-center">
                <SvgIcon name="maintenance" className="text-3xl" />
              </div>
              <Statistic
                title={
                  <Typography.Title level={5}>
                    {formatMessage({ id: 'statistic.billPeriod' })}
                  </Typography.Title>
                }
                value={0.0}
                precision={2}
                valueStyle={{ color: thme.token['blue-5'], fontSize: 16, fontWeight: 'bold' }}
                suffix="$"
              />
            </Col>
            <Col
              xs={6}
              md={6}
              lg={6}
              xl={6}
              xxl={8}
              className="flex flex-1 flex-row gap-4 mr-4"
              style={{ borderRight: `2px solid ${thme.token.colorBorderSecondary}` }}
            >
              <div className="flex items-center">
                <SvgIcon name="maintenance" className="text-3xl" />
              </div>
              <Statistic
                title={
                  <Typography.Title level={5}>
                    {formatMessage({ id: 'statistic.averagePeriod' })}
                  </Typography.Title>
                }
                value={0.08}
                precision={2}
                valueStyle={{ color: thme.token['blue-5'], fontSize: 16, fontWeight: 'bold' }}
                suffix="$"
              />
            </Col>
            <Col xs={4} md={5} lg={4} xl={4} xxl={8} className="flex flex-1 flex-row gap-4">
              <div className="flex items-center">
                <SvgIcon name="maintenance" className="text-3xl" />
              </div>
              <Statistic
                title={
                  <Typography.Title level={5}>
                    {formatMessage({ id: 'statistic.yearConsumption' })}
                  </Typography.Title>
                }
                value={253.53}
                precision={2}
                valueStyle={{ color: thme.token['blue-5'], fontSize: 16, fontWeight: 'bold' }}
                suffix="$"
              />
            </Col>
          </Flex>
        </div>
      </Col>
      <Row
        className="w-full h-full mt-2 p-4"
        style={{ border: `1px solid ${thme.token.colorBorderSecondary}`, borderRadius: 8 }}
      >
        <Col {...colLayout2}>
          <Row style={{ height: 500 }}>
            <div className="chartContainer" css={getCss()}>
              <ReactECharts option={option} settings={{ notMerge: false, lazyUpdate: false }} />
            </div>
          </Row>
        </Col>
        <Col {...colLayout3} className="pl-2">
          <Row>
            <Col span={12}>
              <div className="flex justify-end pr-8">
                <Segmented<string>
                  options={[
                    formatMessage({ id: 'statistic.day' }),
                    formatMessage({ id: 'statistic.week' }),
                  ]}
                  onChange={(value) => {
                    console.log(value);
                  }}
                />
              </div>
            </Col>
            <Col span={12}>
              <DatePicker defaultValue={dayjs()} format={'DD/MM/YYYY'} />
            </Col>
          </Row>
          <Row className="pt-8">
            <Col span={24}>
              <Row>
                <Col span={12}>
                  <Typography.Title level={5} style={{ color: `${thme.token.green6}` }}>
                    {formatMessage({ id: 'statistic.production' })}: 0.00 $
                  </Typography.Title>
                </Col>
                <Col span={12} className="flex justify-end">
                  <Typography.Title level={5} style={{ color: `${thme.token['red-6']}` }}>
                    {formatMessage({ id: 'statistic.consumption' })}: 1.61 $
                  </Typography.Title>
                </Col>
              </Row>
              <Row
                className="mt-4 pt-2"
                style={{
                  borderTop: `1px solid ${thme.token.colorBorderSecondary}`,
                  borderBottom: `1px solid ${thme.token.colorBorderSecondary}`,
                }}
              >
                <Col span={12}>
                  <Typography.Title level={5}>
                    {formatMessage({ id: 'common.devices' }).toUpperCase()}
                  </Typography.Title>
                </Col>
                <Col span={12} className="flex justify-end">
                  <Typography.Title level={5}>
                    {formatMessage({ id: 'statistic.consumption' }).toUpperCase()}
                  </Typography.Title>
                </Col>
              </Row>
              <List
                dataSource={[
                  {
                    device: '113.0 Dehumidifier',
                    section: '1st Floor/Fammily room',
                    energyUsed: '73.7%',
                    consumption: 1.18,
                  },
                  {
                    device: 'Family Room Bed',
                    section: '1st Floor/Fammily room',
                    energyUsed: '23.6%',
                    consumption: 0.38,
                  },
                  {
                    device: '54.0 Air Purifier',
                    section: '2nd Floor/Fammily room',
                    energyUsed: '1.2%',
                    consumption: 0.08,
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
                      <div className="flex flex-col items-end">
                        <Typography.Title level={5} style={{ color: `${thme.token['red-6']}` }}>
                          {item.energyUsed} of use
                        </Typography.Title>
                        <Typography.Text style={{ color: `${thme.token['red-6']}` }}>
                          {item.consumption} $
                        </Typography.Text>
                      </div>
                    </div>
                  </List.Item>
                )}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Row>
  );
};

export default StatisticSavings;
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
