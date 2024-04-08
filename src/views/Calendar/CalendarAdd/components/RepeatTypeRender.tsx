import { getIntlText, useLocale } from '@/locales';
import { Checkbox, Divider, Flex, Space, Tag, Typography } from 'antd';
import dayjs from 'dayjs';

interface Props {
  repeatType?: number;
  listDayOfMonth: number[];
  setListDayOfMonth: (value: React.SetStateAction<number[]>) => void;
  listWeekdays: number[];
  setListWeekdays: (value: React.SetStateAction<number[]>) => void;
  listMonths: number[];
  setListMonths: (value: React.SetStateAction<number[]>) => void;
}

const RepeatTypeRender = (props: Props) => {
  const { formatMessage } = useLocale();
  const {
    repeatType,
    listDayOfMonth,
    setListDayOfMonth,
    listWeekdays,
    setListWeekdays,
    listMonths,
    setListMonths,
  } = props;

  const getListDayOfMonth = (dayInMonth: number) => {
    const listDay = [];
    for (let index = 1; index <= dayInMonth; index++) {
      listDay.push(index);
    }
    return listDay;
  };

  const getListWeekdays = () => {
    const weekdays: number[] = [];
    dayjs.weekdays(true).map((day, index) => {
      weekdays.push(index + 1);
    });
    return weekdays;
  };

  const getListMonth = () => {
    const months: number[] = [];
    dayjs.months().map((day, index) => {
      months.push(index + 1);
    });
    return months;
  };

  const handleChangeListWeekdays = (day: number, checked: boolean) => {
    const nextSelectedDay: number[] = checked
      ? [...listWeekdays, day]
      : listWeekdays.filter((t) => t !== day);
    setListWeekdays(nextSelectedDay);
  };

  const handleChangeListDayOfMonth = (day: number, checked: boolean) => {
    const nextSelectedDay: number[] = checked
      ? [...listDayOfMonth, day]
      : listDayOfMonth.filter((t) => t !== day);
    setListDayOfMonth(nextSelectedDay);
  };

  const handleChangeListMonth = (month: number, checked: boolean) => {
    const nextSelectedMonth: number[] = checked
      ? [...listMonths, month]
      : listMonths.filter((t) => t !== month);
    setListMonths(nextSelectedMonth);
  };

  //weekly
  if (repeatType === 2) {
    return (
      <Space size={[8, 16]} wrap>
        {getListWeekdays().map((day) => (
          <Checkbox
            key={day}
            style={{ textTransform: 'capitalize' }}
            checked={listWeekdays.includes(day) || listWeekdays.includes(0)}
            onChange={(e) => handleChangeListWeekdays(day, e.target.checked)}
          >
            {dayjs.weekdays(true)[day - 1]}
          </Checkbox>
        ))}
        <Checkbox
          onChange={(e) => {
            console.log(listWeekdays);
            if (e.target.checked) {
              setListWeekdays([0]);
            } else {
              setListWeekdays([]);
            }
          }}
        >
          {formatMessage({ id: 'common.all' })}
        </Checkbox>
      </Space>
    );
  }
  //monthly
  if (repeatType === 3) {
    return (
      <div>
        <Typography.Text>{getIntlText({ id: 'calendar.chooseDate' })}:</Typography.Text>
        <Flex gap="16px" wrap="wrap" align="center" className="pt-2">
          {getListDayOfMonth(dayjs().daysInMonth()).map((day) => (
            <Tag.CheckableTag
              key={day}
              checked={listDayOfMonth.includes(day) || listDayOfMonth.includes(0)}
              onChange={(checked) => handleChangeListDayOfMonth(day, checked)}
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
  //yearly
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
                onChange={(checked) => handleChangeListDayOfMonth(day, checked)}
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
            {getListMonth().map((month) => (
              <Checkbox
                key={month}
                checked={listMonths.includes(month) || listMonths.includes(0)}
                style={{ textTransform: 'capitalize' }}
                onChange={(e) => handleChangeListMonth(month, e.target.checked)}
              >
                {dayjs.months()[month - 1]}
              </Checkbox>
            ))}
            <Checkbox
              onChange={(e) => {
                if (e.target.checked) {
                  setListMonths([0]);
                } else {
                  setListMonths([]);
                }
              }}
            >
              {formatMessage({ id: 'common.all' })}
            </Checkbox>
          </Space>
        </Flex>
      </div>
    );
  }
};

export default RepeatTypeRender;
