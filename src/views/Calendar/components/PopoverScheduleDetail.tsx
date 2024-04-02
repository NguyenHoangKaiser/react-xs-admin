import { useLocale } from '@/locales';
import type { ICalendarResult } from '@/server/calendarApi';
import { getRepeat } from '@/utils/constant';
import {
  CalendarOutlined,
  DeleteOutlined,
  DeploymentUnitOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import { Col, Flex, Modal, Row, Tag, Typography, theme } from 'antd';
import dayjs from 'dayjs';

const PopoverScheduleDetail = ({ data }: { data: ICalendarResult }) => {
  const { token } = theme.useToken();
  const { formatMessage } = useLocale();
  const confirm = () => {
    Modal.confirm({
      title: formatMessage({ id: 'group.confirm' }),
      icon: <ExclamationCircleOutlined />,
      content: formatMessage({ id: 'calendar.confirmDelete' }),
      okText: formatMessage({ id: 'common.agree' }),
      cancelText: formatMessage({ id: 'group.cancel' }),
    });
  };
  return (
    <div className="pl-3 w-[480px] ">
      {(data.schedule?.run_time ?? 0) >= dayjs().unix() ? (
        <Row>
          <Col span={21}>
            <div
              className="h-[20px] w-full"
              style={{
                position: 'relative',
                top: 10,
                left: -20,
                background: `linear-gradient(135deg, ${token.colorPrimary} , transparent )`,
                filter: 'blur(35px)',
              }}
            />
          </Col>
          <Col span={2}>
            <EditOutlined />
          </Col>
          <Col span={1}>
            <DeleteOutlined onClick={confirm} />
          </Col>
        </Row>
      ) : (
        <Row>
          <Col span={21}>
            <div
              className="h-[20px] w-full"
              style={{
                position: 'relative',
                top: 10,
                left: -20,
                background: `linear-gradient(135deg, ${token.colorPrimary} , transparent )`,
                filter: 'blur(30px)',
              }}
            />
          </Col>
        </Row>
      )}
      <Row>
        <Col span={1}>
          <Flex justify="center">
            <Tag color={data.color}>#{data.order}</Tag>
          </Flex>
        </Col>
        <Col span={22} offset={1}>
          <Typography.Title level={5} style={{ color: token.colorPrimary }}>
            {data.name}
          </Typography.Title>
        </Col>
      </Row>
      <Row align={'middle'}>
        <Col span={1}>
          <Flex justify="center">
            <CalendarOutlined style={{ color: token.colorTextQuaternary }} />
          </Flex>
        </Col>
        <Col span={22} offset={1}>
          <Typography.Text>
            {formatMessage({ id: 'calendar.dateStart' })}:{' '}
            {dayjs((data.schedule?.start_time ?? 0) * 1000).format('dddd, DD/MM/YYYY - hh:mm A')}
          </Typography.Text>
        </Col>
      </Row>
      <Row align={'middle'} className="pt-2">
        <Col span={1}>
          <Flex justify="center">
            <CalendarOutlined style={{ color: token.colorTextQuaternary }} />
          </Flex>
        </Col>
        <Col span={22} offset={1}>
          <Typography.Text>
            {formatMessage({ id: 'calendar.dateEnd' })}:{' '}
            {dayjs((data.schedule?.end_time ?? 0) * 1000).format('dddd, DD/MM/YYYY - hh:mm A')}
          </Typography.Text>
        </Col>
      </Row>
      <Row align={'middle'} className="pt-2">
        <Col span={1}>
          <Flex justify="center">
            <DeploymentUnitOutlined style={{ color: token.colorTextQuaternary }} />
          </Flex>
        </Col>
        <Col span={22} offset={1}>
          <Typography.Text>
            {formatMessage({ id: 'calendar.quantity' })}:{' '}
            {formatMessage({ id: 'calendar.totalDevice' }, { count: data.out?.devices?.length })}
          </Typography.Text>
        </Col>
      </Row>
      <Row align={'middle'} className="pt-2">
        <Col span={1}>
          <Flex justify="center">
            <ReloadOutlined style={{ color: token.colorTextQuaternary }} />
          </Flex>
        </Col>
        <Col span={22} offset={1}>
          <Typography.Text>
            {formatMessage({ id: 'calendar.typeRepeat' })}: {getRepeat(data.schedule?.repeat_type)}
          </Typography.Text>
        </Col>
      </Row>
      {data && data.owner_name && (
        <Row align={'middle'} className="pt-2">
          <Col span={1}>
            <Flex justify="center">
              <CalendarOutlined style={{ color: token.colorTextQuaternary }} />
            </Flex>
          </Col>
          <Col span={22} offset={1}>
            <Typography.Text>
              {formatMessage({ id: 'calendar.creator' })}: {data.owner_name}
            </Typography.Text>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default PopoverScheduleDetail;
