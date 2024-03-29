import { RouteEnum } from '@/router/utils';
import { useGetCalendarQuery } from '@/server/calendarApi';
import { useAppSelector } from '@/store/hooks';
import { hotelSelector } from '@/store/modules/hotel';
import { LeftOutlined, PlusOutlined, RightOutlined } from '@ant-design/icons';
import type { CalendarProps } from 'antd';
import {
  Calendar as AntCalendar,
  Badge,
  Button,
  Checkbox,
  Col,
  FloatButton,
  Popover,
  Row,
  Segmented,
  theme,
} from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { useState } from 'react';
import { Calendar as BigCalendar, dayjsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { useNavigate } from 'react-router-dom';
import PopoverScheduleDetail from './components/PopoverScheduleDetail';
import { getCssCalendar } from './style';

const localizer = dayjsLocalizer(dayjs);

const Calendar = () => {
  const { hotel_id } = useAppSelector(hotelSelector);
  const { token } = theme.useToken();
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState<Dayjs>(dayjs());
  const [owner, setOwner] = useState<boolean>(false);
  const [type, setType] = useState<string[]>(['LIGHT', 'AC', 'PW']);

  const { data } = useGetCalendarQuery({
    hotel_id: hotel_id,
    is_owner: owner ? 1 : 0,
    device_type: type.toString(),
    begin_at: selectedDay.startOf('month').valueOf() / 1000,
    end_at: Math.round(selectedDay.endOf('month').valueOf() / 1000),
  });

  const [mode, setMode] = useState<'Day' | 'Week' | 'Month'>('Month');

  const getListData = (value: Dayjs) => {
    if (value.month() !== selectedDay.month() || !data) {
      return [];
    }
    return data.filter(
      (t) => new Date((t.schedule?.run_time ?? 0) * 1000).getDate() === value.date(),
    );
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return (
      <div css={getCssCalendar(token)}>
        <ul className="events">
          {listData.map((item, index) => {
            if (index > 2) return;
            return (
              <Popover
                key={`${item._id}-${index}`}
                placement="left"
                trigger={'click'}
                content={<PopoverScheduleDetail data={item} />}
              >
                <li className="itemCalendar">
                  <Badge color={item.color} text={item.name} />
                </li>
              </Popover>
            );
          })}
          {listData.length > 3 && (
            <Popover
              placement="right"
              trigger={'click'}
              content={
                <div style={{ padding: 20 }}>
                  <div>
                    <div style={{ textTransform: 'capitalize' }}>
                      <strong>{value.format('dddd')}</strong>
                    </div>
                    <span style={{ fontSize: 40, color: token.colorPrimary }}>
                      {value.format('DD')}
                    </span>
                  </div>
                  {listData.map((item, index) => {
                    if (index < 3) return;
                    return (
                      <div css={getCssCalendar(token)} key={`${item._id}-${index}`}>
                        <Popover
                          placement="left"
                          trigger={'click'}
                          className="itemCalendarOther"
                          content={<PopoverScheduleDetail data={item} />}
                        >
                          <li>
                            <Badge
                              color={item.color}
                              text={`${dayjs((item.schedule?.run_time ?? 0) * 1000).format(
                                'hh:mm A',
                              )}, ${item.name}`}
                            />
                          </li>
                        </Popover>
                      </div>
                    );
                  })}
                </div>
              }
            >
              <a style={{ color: token.colorPrimary }}>{listData.length - 3} thẻ khác</a>
            </Popover>
          )}
        </ul>
      </div>
    );
  };

  const cellRender: CalendarProps<Dayjs>['cellRender'] = (current) => {
    return dateCellRender(current);
  };

  return (
    <Row>
      <Col span={5}>
        <Row style={{ borderBottom: `1px solid ${token.colorBorder}` }}>
          <Col>
            <AntCalendar
              fullscreen={false}
              value={selectedDay}
              onChange={(time) => setSelectedDay(time)}
            />
          </Col>
        </Row>
        <Row>
          <Col className="p-4" span={24}>
            <Checkbox onChange={() => setOwner(!owner)} checked={owner}>
              Lịch của tôi
            </Checkbox>
          </Col>
          <Col className="p-4" span={24}>
            <Checkbox
              checked={type.includes('LIGHT')}
              onChange={(e) => {
                e.target.checked
                  ? setType(type.concat('LIGHT'))
                  : setType(type.filter((t) => t !== 'LIGHT'));
              }}
            >
              Lịch đèn
            </Checkbox>
          </Col>
          <Col className="p-4" span={24}>
            <Checkbox
              checked={type.includes('AC')}
              onChange={(e) => {
                e.target.checked
                  ? setType(type.concat('AC'))
                  : setType(type.filter((t) => t !== 'AC'));
              }}
            >
              Lịch điều hòa
            </Checkbox>
          </Col>
          <Col className="p-4" span={24}>
            <Checkbox
              checked={type.includes('PW')}
              onChange={(e) => {
                e.target.checked
                  ? setType(type.concat('PW'))
                  : setType(type.filter((t) => t !== 'PW'));
              }}
            >
              Lịch bơm nước
            </Checkbox>
          </Col>
        </Row>
      </Col>
      <Col span={19}>
        <Row
          style={{
            height: 71,
            display: 'flex',
            alignItems: 'center',
            paddingLeft: 25,
            borderLeft: `1px solid ${token.colorBorder}`,
          }}
        >
          <Col span={2}>
            <Button onClick={() => setSelectedDay(dayjs())}>Hôm nay</Button>
          </Col>
          <Col span={2}>
            <div
              style={{
                fontSize: 16,
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                gap: 16,
              }}
            >
              <LeftOutlined
                size={24}
                onClick={() => setSelectedDay(selectedDay.subtract(1, 'day'))}
              />
              <RightOutlined size={24} onClick={() => setSelectedDay(selectedDay.add(1, 'day'))} />
            </div>
          </Col>

          <Col span={4}>
            <div>
              {`${
                dayjs(selectedDay).format('dddd').charAt(0).toUpperCase() +
                dayjs(selectedDay).format('dddd').slice(1)
              }, ${dayjs(selectedDay).format('LL')}`}
            </div>
          </Col>

          <Col span={4} offset={12}>
            <Segmented<'Day' | 'Week' | 'Month'>
              options={['Day', 'Week', 'Month']}
              value={mode}
              onChange={(value) => setMode(value)}
            />
          </Col>
        </Row>
        {mode === 'Week' && (
          <div css={getCssCalendar(token)}>
            <BigCalendar
              localizer={localizer}
              events={data?.map((data, id) => ({
                ...data,
                id,
                title: data.name,
                start: dayjs((data.schedule?.run_time ?? 0) * 1000).toDate(),
                end: dayjs((data.schedule?.run_time ?? 0) * 1000 + 3600000).toDate(),
              }))}
              defaultDate={selectedDay.toDate()}
              date={selectedDay.toDate()}
              onNavigate={(date) => {
                setSelectedDay(dayjs(date));
                setMode('Day');
              }}
              toolbar={false}
              startAccessor="start"
              endAccessor="end"
              defaultView="week"
              components={{
                event: (props) => (
                  <Popover content={<PopoverScheduleDetail data={props.event} />} trigger={'click'}>
                    <div style={{ width: '100%', height: '100%', padding: 4 }}>
                      <span>{props.title}</span>
                    </div>
                  </Popover>
                ),
              }}
            />
          </div>
        )}
        {mode === 'Day' && (
          <div css={getCssCalendar(token)}>
            <BigCalendar
              localizer={localizer}
              events={data?.map((data, id) => ({
                ...data,
                id,
                title: data.name,
                start: dayjs((data.schedule?.run_time ?? 0) * 1000).toDate(),
                end: dayjs((data.schedule?.run_time ?? 0) * 1000 + 3600000).toDate(),
              }))}
              defaultDate={selectedDay.toDate()}
              date={selectedDay.toDate()}
              onNavigate={(date) => {
                setSelectedDay(dayjs(date));
              }}
              toolbar={false}
              startAccessor="start"
              endAccessor="end"
              defaultView="day"
              components={{
                event: (props) => (
                  <Popover content={<PopoverScheduleDetail data={props.event} />} trigger={'click'}>
                    <div style={{ width: '100%', height: '100%', padding: 4 }}>
                      <span>{props.title}</span>
                    </div>
                  </Popover>
                ),
              }}
            />
          </div>
        )}
        {mode === 'Month' && (
          <div css={getCssCalendar(token)}>
            <AntCalendar
              cellRender={cellRender}
              value={selectedDay}
              onChange={(day) => {
                console.log('day', day.format('DD/MM/YYYY'));
                console.log('selectedDay', selectedDay.format('DD/MM/YYYY'));
              }}
              onSelect={(date) => {
                setSelectedDay(date);
              }}
            />
          </div>
        )}
      </Col>
      <FloatButton
        tooltip={<div>Tạo lịch</div>}
        shape="circle"
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => navigate(RouteEnum.CalendarAdd)}
      />
    </Row>
  );
};

export default Calendar;
