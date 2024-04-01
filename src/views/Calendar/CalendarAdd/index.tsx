import SvgIcon from '@/components/SvgIcon';
import type { ISchedule, Out } from '@/server/calendarApi';
import { useAppSelector } from '@/store/hooks';
import { hotelSelector } from '@/store/modules/hotel';
import { FAKE_DATA, ListIconImage } from '@/utils/constant';
import { CloseOutlined, DownOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import type { MenuProps } from 'antd';
import {
  Button,
  Col,
  DatePicker,
  Dropdown,
  Form,
  Input,
  Row,
  Select,
  Space,
  Switch,
  Tabs,
  Typography,
  theme,
} from 'antd';
import dayjs from 'dayjs';
import * as duration from 'dayjs/plugin/duration';
import * as LocalData from 'dayjs/plugin/localeData';
import { useState } from 'react';
import ControlACModal from './components/ControlACModal';
import RepeatTypeRender from './components/RepeatTypeRender';
import SelectDeviceModal from './components/SelectDeviceModal';
dayjs.extend(LocalData);
dayjs.extend(duration);

export interface FormCalendar {
  color?: string;
  name?: string;
  start_time?: number;
  end_time?: number;
  repeat_type?: number; // kiểu lặp sự kiện
}

export interface FormCalendarParams {
  hotel_id?: number;
  out?: Out;
  schedule?: ISchedule;
  type?: number;
  color?: string;
  name?: string;
}

const TabPane = Tabs.TabPane;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const colLayout1 = {
  md: { span: 24 },
  lg: { span: 5 },
  xl: { span: 4 },
  xxl: { span: 3 },
};

const colLayout2 = {
  md: { span: 24 },
  lg: { span: 12 },
  xl: { span: 12 },
  xxl: { span: 6 },
};
const colLayout3 = {
  md: { span: 4 },
  lg: { span: 4 },
  xl: { span: 4 },
  xxl: { span: 2 },
};

const CalendarAdd = () => {
  const [form] = Form.useForm();
  const { token } = theme.useToken();
  const { hotel_id } = useAppSelector(hotelSelector);

  const [color, setColor] = useState<string>('D50000');
  const [selectDeviceModal, setSelectedDeviceModal] = useState<boolean>(false);
  const [controlACModal, setControlACModal] = useState<boolean>(false);
  const [listDevicesId, setListDevicesId] = useState<number[]>([]);
  const [deviceType, setDeviceType] = useState<string>();
  const [repeatType, setRepeatType] = useState<number>(0);

  const [listDayOfMonth, setListDayOfMonth] = useState<number[]>([]);

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    setColor(e.key);
    form.setFieldValue('color', e.key);
  };

  const items: MenuProps['items'] = [
    {
      key: 'D50000',
      label: <div style={{ height: 20, backgroundColor: `#D50000`, width: '100%' }} />,
    },
    {
      key: 'E67C73',
      label: <div style={{ height: 20, backgroundColor: `#E67C73`, width: '100%' }} />,
    },
    {
      key: 'F4511E',
      label: <div style={{ height: 20, backgroundColor: `#F4511E`, width: '100%' }} />,
    },
    {
      key: 'F6BF26',
      label: <div style={{ height: 20, backgroundColor: `#F6BF26`, width: '100%' }} />,
    },
    {
      key: '33B679',
      label: <div style={{ height: 20, backgroundColor: `#33B679`, width: '100%' }} />,
    },
    {
      key: '0B8043',
      label: <div style={{ height: 20, backgroundColor: `#0B8043`, width: '100%' }} />,
    },
    {
      key: '039BE5',
      label: <div style={{ height: 20, backgroundColor: `#039BE5`, width: '100%' }} />,
    },
    {
      key: '3F51B5',
      label: <div style={{ height: 20, backgroundColor: `#3F51B5`, width: '100%' }} />,
    },
    {
      key: '7986CB',
      label: <div style={{ height: 20, backgroundColor: `#7986CB`, width: '100%' }} />,
    },
    {
      key: '8E24AA',
      label: <div style={{ height: 20, backgroundColor: `#8E24AA`, width: '100%' }} />,
    },
    {
      key: '616161',
      label: <div style={{ height: 20, backgroundColor: `#616161`, width: '100%' }} />,
    },
  ];
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  const initValues: FormCalendar = {
    color: color,
    repeat_type: 0,
  };

  console.log(repeatType);

  return (
    <Form<FormCalendar>
      {...layout}
      form={form}
      initialValues={initValues}
      className="pb-4"
      onFinish={(values) => {
        const data: FormCalendarParams = {
          hotel_id: hotel_id,
          color: values.color,
          name: values.name?.trim(),
          out: {
            execution: [],
            devices: listDevicesId,
            device_type: deviceType,
          },
          schedule: {
            end_time: values.end_time,
            start_time: values.start_time,
            repeat_type: repeatType,
            run_time: values.start_time,
            month_chosen: [],
            monthdays: [],
            weekdays: [],
          },
          type: 0,
        };
        console.log('data', data);
      }}
      labelWrap
    >
      <Row className="pt-6 pl-4">
        <Col span={24}>
          <Row>
            <Col {...colLayout1}>
              <Form.Item name={'color'}>
                <Dropdown menu={menuProps}>
                  <Button>
                    <Space>
                      <div
                        style={{
                          height: 12,
                          width: 12,
                          borderRadius: 6,
                          backgroundColor: `#${color}`,
                        }}
                      />
                      Chọn màu
                      <DownOutlined />
                    </Space>
                  </Button>
                </Dropdown>
              </Form.Item>
            </Col>
            <Col {...colLayout2}>
              <Form.Item name={'name'} wrapperCol={{ span: 22 }}>
                <Input placeholder="Tên lịch" />
              </Form.Item>
            </Col>
            <Col {...colLayout3}>
              <Form.Item wrapperCol={{ span: 24 }}>
                <Button className="w-full" type="primary" htmlType="submit">
                  Lưu
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="px-4">
        {/* //TODO: Tab detail device */}
        <Col xl={10} lg={12} md={24}>
          <div
            css={css`
              .ant-tabs-ink-bar.ant-tabs-ink-bar-animated {
                display: none;
              }
            `}
          >
            <Tabs defaultActiveKey="1" size="large">
              <TabPane key={'1'} tab="Chi tiết thiết bị">
                <Row className="pb-4 gap-4">
                  <Col xl={6} lg={8}>
                    <Select
                      className="w-full"
                      placeholder="Chọn loại thiết bị"
                      defaultValue={deviceType}
                      onChange={(value) => {
                        setDeviceType(value);
                        setListDevicesId([]);
                      }}
                    >
                      <Select.Option value="LIGHT">Đèn</Select.Option>
                      <Select.Option value="AC">Điều hòa</Select.Option>
                      <Select.Option value="PW">Bơm</Select.Option>
                    </Select>
                  </Col>
                  <Col span={4}>
                    <Button disabled={!deviceType} onClick={() => setSelectedDeviceModal(true)}>
                      Thêm thiết bị
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Space size={[8, 16]} wrap>
                      {listDevicesId.map((id) => {
                        const icon = ListIconImage[id % ListIconImage.length] || ListIconImage[0];
                        return (
                          <div
                            key={id}
                            style={{
                              padding: 16,
                              border: `1px solid ${token.colorBorder}`,
                              flexDirection: 'row',
                              display: 'flex',
                              alignItems: 'center',
                            }}
                          >
                            <span style={{ fontSize: '20px', paddingRight: 16 }}>
                              <SvgIcon name={icon.type} />
                            </span>
                            {FAKE_DATA.devicesList.items.find((item) => item.id === id)?.name}
                            <CloseOutlined
                              className="pl-4 text-1xl"
                              onClick={() =>
                                setListDevicesId(listDevicesId.filter((item) => item !== id))
                              }
                            />
                          </div>
                        );
                      })}
                    </Space>
                  </Col>
                </Row>
              </TabPane>
            </Tabs>
          </div>
        </Col>
        {/* //TODO: Tab status device */}
        <Col xl={7} lg={12} md={24}>
          <div
            css={css`
              .ant-tabs-ink-bar.ant-tabs-ink-bar-animated {
                display: none;
              }
            `}
          >
            <Tabs defaultActiveKey="2" size="large">
              <TabPane key={'2'} tab="Trạng thái thiết bị" className="mx-2">
                <Row>
                  <Col span={24}>
                    <Form.Item
                      label={'Ngày bắt đầu'}
                      labelCol={{ xxl: 6, xl: 8, md: 5 }}
                      wrapperCol={{ xxl: 18, xl: 16 }}
                      labelAlign="left"
                      name={'start_time'}
                    >
                      <DatePicker showTime={{ format: 'HH:mm' }} format="DD/MM/YYYY HH:mm" />
                    </Form.Item>
                    <Form.Item
                      label="Trạng thái"
                      labelCol={{ xxl: 6, xl: 8, md: 5 }}
                      wrapperCol={{ xxl: 18, xl: 16 }}
                      labelAlign="left"
                    >
                      <Switch />
                    </Form.Item>
                    {deviceType === 'AC' && (
                      <Row>
                        <Col span={24}>
                          <Row>
                            <Col span={6}>NHIỆT ĐỘ</Col>
                            <Col span={6} offset={3}>
                              TỐC ĐỘ
                            </Col>
                            <Col span={6} offset={2}>
                              CHẾ ĐỘ
                            </Col>
                          </Row>
                        </Col>
                        <Col span={24} className="mt-2">
                          <Row>
                            <Col span={6}>
                              <Typography.Text strong style={{ fontSize: 24 }}>
                                16°C
                              </Typography.Text>
                            </Col>
                            <Col span={6} offset={3}>
                              <SvgIcon name="bar-chart-3" className="text-[40px]" />
                            </Col>
                            <Col span={6} offset={3}>
                              <Typography.Text strong style={{ fontSize: 24 }}>
                                A
                              </Typography.Text>
                            </Col>
                          </Row>
                        </Col>
                        <Col span={22} className="mt-4">
                          <Button
                            type="primary"
                            className="w-full"
                            onClick={() => setControlACModal(true)}
                          >
                            Tùy chỉnh thiết bị
                          </Button>
                        </Col>
                      </Row>
                    )}
                  </Col>
                </Row>
              </TabPane>
            </Tabs>
          </div>
        </Col>
        {/* //TODO: Tab repeat event */}
        <Col xl={7} md={24}>
          <div
            css={css`
              .ant-tabs-ink-bar.ant-tabs-ink-bar-animated {
                display: none;
              }
            `}
          >
            <Tabs defaultActiveKey="3" size="large">
              <TabPane key={'3'} tab="Lặp lại sự kiện">
                <Row>
                  <Col span={24}>
                    <Form.Item
                      label={'Lặp lại'}
                      labelCol={{ xxl: 6, xl: 8, md: 3 }}
                      wrapperCol={{ xxl: 10, xl: 14, md: 6 }}
                      labelAlign="left"
                      name={'repeat_type'}
                    >
                      <Select onChange={(value) => setRepeatType(value)}>
                        <Select.Option value={0}>Không lặp</Select.Option>
                        <Select.Option value={1}>Hàng ngày</Select.Option>
                        <Select.Option value={2}>Hàng tuần</Select.Option>
                        <Select.Option value={3}>Hàng tháng</Select.Option>
                        <Select.Option value={4}>Hàng năm</Select.Option>
                      </Select>
                    </Form.Item>
                    {/* component repeat type */}
                    {repeatType !== 0 && (
                      <Form.Item wrapperCol={{ span: 24 }}>
                        <RepeatTypeRender
                          repeatType={repeatType}
                          listDayOfMonth={listDayOfMonth}
                          setListDayOfMonth={setListDayOfMonth}
                        />
                      </Form.Item>
                    )}
                    <Form.Item
                      label={'Ngày kết thúc'}
                      labelCol={{ xxl: 6, xl: 8, md: 3 }}
                      wrapperCol={{ xxl: 18, xl: 16 }}
                      labelAlign="left"
                      name={'end_time'}
                    >
                      <DatePicker showTime={{ format: 'HH:mm' }} format="DD/MM/YYYY HH:mm" />
                    </Form.Item>
                  </Col>
                </Row>
              </TabPane>
            </Tabs>
          </div>
        </Col>
        <SelectDeviceModal
          open={selectDeviceModal}
          onCancel={() => setSelectedDeviceModal(false)}
          setListDevices={setListDevicesId}
          listDevices={listDevicesId}
        />
        <ControlACModal
          open={controlACModal}
          onOk={() => {
            setControlACModal(false);
          }}
          onCancel={() => {
            setControlACModal(false);
          }}
        />
      </Row>
    </Form>
  );
};

export default CalendarAdd;
