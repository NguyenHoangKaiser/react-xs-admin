import { getIntlText, useLocale } from '@/locales';
import { Checkbox, Divider, Flex, Space, Tag, Typography } from 'antd';
import dayjs from 'dayjs';
import * as duration from 'dayjs/plugin/duration';
import * as LocalData from 'dayjs/plugin/localeData';
dayjs.extend(LocalData);
dayjs.extend(duration);

interface Props {
  repeatType?: number;
  listDayOfMonth: number[];
  setListDayOfMonth: (value: React.SetStateAction<number[]>) => void;
}

const RepeatTypeRender = ({ repeatType, listDayOfMonth, setListDayOfMonth }: Props) => {
  const { formatMessage } = useLocale();

  const getListDayOfMonth = (dayInMonth: number) => {
    const listDay = [];
    for (let index = 1; index <= dayInMonth; index++) {
      listDay.push(index);
    }
    return listDay;
  };

  const handleChange = (day: number, checked: boolean) => {
    const nextSelectedDay: number[] = checked
      ? [...listDayOfMonth, day]
      : listDayOfMonth.filter((t) => t !== day);
    setListDayOfMonth(nextSelectedDay);
  };

  if (repeatType === 2) {
    return (
      <Space size={[8, 16]} wrap>
        {dayjs.weekdays(true).map((day) => (
          <Checkbox key={day} style={{ textTransform: 'capitalize' }}>
            {day}
          </Checkbox>
        ))}
        <Checkbox>{formatMessage({ id: 'common.all' })}</Checkbox>
      </Space>
    );
  }
  if (repeatType === 3) {
    return (
      <div>
        <Typography.Text>{getIntlText({ id: 'calendar.chooseDate' })}:</Typography.Text>
        <Flex gap="16px" wrap="wrap" align="center" className="pt-2">
          {getListDayOfMonth(dayjs().daysInMonth()).map((day) => (
            <Tag.CheckableTag
              key={day}
              checked={listDayOfMonth.includes(day) || listDayOfMonth.includes(0)}
              onChange={(checked) => handleChange(day, checked)}
            >
              {day < 10 ? `0${day}` : day}
            </Tag.CheckableTag>
          ))}
          <Tag.CheckableTag
            checked={listDayOfMonth.includes(0)}
            onChange={(checked) => {
              if (checked) {
                setListDayOfMonth([0]);
              } else {
                setListDayOfMonth([]);
              }
            }}
          >
            {formatMessage({ id: 'common.all' })}
          </Tag.CheckableTag>
        </Flex>
      </div>
    );
  }
  if (repeatType === 4) {
    return (
      <div>
        <div>
          <Typography.Text>{getIntlText({ id: 'calendar.chooseDate' })}:</Typography.Text>
          <Flex gap="16px" wrap="wrap" align="center" className="pt-2">
            {getListDayOfMonth(dayjs().daysInMonth()).map((day) => (
              <Tag.CheckableTag
                key={day}
                checked={listDayOfMonth.includes(day) || listDayOfMonth.includes(0)}
                onChange={(checked) => handleChange(day, checked)}
              >
                {day < 10 ? `0${day}` : day}
              </Tag.CheckableTag>
            ))}
            <Tag.CheckableTag
              checked={listDayOfMonth.includes(0)}
              onChange={(checked) => {
                if (checked) {
                  setListDayOfMonth([0]);
                } else {
                  setListDayOfMonth([]);
                }
              }}
            >
              {formatMessage({ id: 'common.all' })}
            </Tag.CheckableTag>
          </Flex>
        </div>
        <Divider />
        <Flex gap="16px" wrap="wrap" align="center">
          <Space size={[8, 16]} wrap>
            {dayjs.months().map((month) => (
              <Checkbox key={month}>{month}</Checkbox>
            ))}
          </Space>
        </Flex>
      </div>
    );
  }
};

export default RepeatTypeRender;
