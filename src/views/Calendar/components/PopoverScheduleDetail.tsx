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
  const confirm = () => {
    Modal.confirm({
      title: 'Xác nhận',
      icon: <ExclamationCircleOutlined />,
      content: 'Bạn có chắc chắn muốn xóa lịch này?',
      okText: 'Xóa',
      cancelText: 'Hủy',
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
                filter: 'blur(30px)',
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
            Ngày bắt đầu:{' '}
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
            Ngày kết thúc:{' '}
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
          <Typography.Text>Số lượng: {data.out?.devices?.length} thiết bị</Typography.Text>
        </Col>
      </Row>
      <Row align={'middle'} className="pt-2">
        <Col span={1}>
          <Flex justify="center">
            <ReloadOutlined style={{ color: token.colorTextQuaternary }} />
          </Flex>
        </Col>
        <Col span={22} offset={1}>
          <Typography.Text>Kiểu lặp: {getRepeat(data)}</Typography.Text>
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
            <Typography.Text>Người tạo: {data.owner_name}</Typography.Text>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default PopoverScheduleDetail;
