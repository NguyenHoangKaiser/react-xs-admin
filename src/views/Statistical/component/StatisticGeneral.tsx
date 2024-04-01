import SvgIcon from '@/components/SvgIcon';
import { useLocale } from '@/locales';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Col, Flex, List, Row, Statistic, Typography, theme } from 'antd';
import ColumnChart from './ColumnChart';
import LineChart from './LineChart';

const StatisticGeneral = () => {
  const thme = theme.useToken();
  const { formatMessage } = useLocale();

  return (
    <Row className="h-full w-full">
      <Col span={12}>
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
      <Col span={12}>
        <div
          style={{
            border: `1px solid ${thme.token.colorBorderSecondary}`,
            borderRadius: 8,
            marginLeft: 8,
            padding: 4,
            height: '100%',
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
                    {formatMessage({ id: 'statistic..currentPeriod' })}
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
      <Row className="w-full mt-2">
        <Col span={16}>
          <div
            style={{
              border: `1px solid ${thme.token.colorBorderSecondary}`,
              borderRadius: 8,
              padding: 8,
            }}
          >
            <div className="flex flex-row gap-4 pb-4">
              <SvgIcon name="maintenance" className="text-3xl" />
              <Typography.Title level={5}>
                {formatMessage({ id: 'statistic.energyBalance' })}
              </Typography.Title>
            </div>
            <LineChart />
          </div>
        </Col>
        <Col span={8}>
          <div
            style={{
              border: `1px solid ${thme.token.colorBorderSecondary}`,
              borderRadius: 8,
              marginLeft: 8,
              padding: 8,
              height: '100%',
            }}
          >
            <div className="flex flex-row gap-4 items-center">
              <SvgIcon name="maintenance" className="text-3xl" />
              <div className="flex flex-col">
                <Typography.Title level={5}>
                  {formatMessage({ id: 'statistic.topDeviceConsumption' })}
                </Typography.Title>
                <Typography.Text>Last hour</Typography.Text>
              </div>
            </div>
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
      <Col span={24} className="my-2">
        <div style={{ border: `1px solid ${thme.token.colorBorderSecondary}`, borderRadius: 8 }}>
          <ColumnChart />
        </div>
      </Col>
    </Row>
  );
};

export default StatisticGeneral;
