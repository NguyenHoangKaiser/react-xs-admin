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
import { Col, Modal, Row, Tag, Typography } from 'antd';
import dayjs from 'dayjs';

const PopoverScheduleDetail = ({ data }: { data: ICalendarResult }) => {
  const confirm = () => {
    Modal.confirm({
      title: 'Confirm',
      icon: <ExclamationCircleOutlined />,
      content: 'Bla bla ...',
      okText: 'Xóa',
      cancelText: 'Hủy',
    });
  };
  return (
    <div className="py-4 pl-6 w-[480px]">
      {(data.schedule?.run_time ?? 0) >= dayjs().unix() && (
        <Row>
          <Col span={2} offset={20}>
            <EditOutlined />
          </Col>
          <Col span={2}>
            <DeleteOutlined onClick={confirm} />
          </Col>
        </Row>
      )}
      <Row>
        <Col span={2}>
          <Tag color={data.color}>#{data.order}</Tag>
        </Col>
        <Col span={21} offset={1}>
          <Typography.Title level={5}>{data.name}</Typography.Title>
        </Col>
      </Row>
      <Row>
        <Col span={2}>
          <CalendarOutlined />
        </Col>
        <Col span={21} offset={1}>
          <Typography.Text>
            Ngày bắt đầu:{' '}
            {dayjs((data.schedule?.start_time ?? 0) * 1000).format('dddd, DD/MM/YYYY - hh:mm A')}
          </Typography.Text>
        </Col>
      </Row>
      <Row>
        <Col span={2}>
          <CalendarOutlined />
        </Col>
        <Col span={21} offset={1}>
          <Typography.Text>
            Ngày kết thúc:{' '}
            {dayjs((data.schedule?.end_time ?? 0) * 1000).format('dddd, DD/MM/YYYY - hh:mm A')}
          </Typography.Text>
        </Col>
      </Row>
      <Row>
        <Col span={2}>
          <DeploymentUnitOutlined />
        </Col>
        <Col span={21} offset={1}>
          <Typography.Text>Số lượng: {data.out?.devices?.length} thiết bị</Typography.Text>
        </Col>
      </Row>
      <Row>
        <Col span={2}>
          <ReloadOutlined />
        </Col>
        <Col span={21} offset={1}>
          <Typography.Text>Kiểu lặp: {getRepeat(data)}</Typography.Text>
        </Col>
      </Row>
      {data && data.owner_name && (
        <Row>
          <Col span={2}>
            <CalendarOutlined />
          </Col>

          <Col span={21} offset={1}>
            <Typography.Text>Người tạo: {data.owner_name}</Typography.Text>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default PopoverScheduleDetail;
