import { useAppDispatch } from '@/store/hooks';
import { editSceneActionData, editSceneConditionData } from '@/store/modules/scene';
import { DATE_UTILS, ESceneOperator, ETimeType } from '@/utils/constant';
import { App, Button, DatePicker, Flex, Form, Select, TimePicker } from 'antd';
import dayjs from 'dayjs';
import type { ISceneTimeAction } from '../scene';
import { OperatorSelect } from './ConditionCard';

const { RangePicker } = DatePicker;

const timeSelect: {
  label: string;
  value: ETimeType;
}[] = [
  {
    label: 'Exact time',
    value: ETimeType.TimeExact,
  },
  {
    label: 'Date range',
    value: ETimeType.DateRange,
  },
  {
    label: 'Time range',
    value: ETimeType.TimeRange,
  },
  // {
  //   label: 'Set',
  //   value: ETimeType.TimeSet,
  // },
  // {
  //   label: 'Schedule',
  //   value: ETimeType.TimeSchedule,
  // },
  // {
  //   label: 'Repeat',
  //   value: ETimeType.TimeRepeat,
  // },
  // {
  //   label: 'Delay',
  //   value: ETimeType.TimeDelay,
  // },
];

interface TimeFormType {
  formType: ETimeType;
  formOperator?: ESceneOperator;
  formValue?: dayjs.Dayjs | null;
  formDateRange?: [dayjs.Dayjs | null, dayjs.Dayjs | null];
  formTimeRange?: [dayjs.Dayjs | null, dayjs.Dayjs | null];
}

const TimeAction = ({
  action,
  index,
  mode,
}: {
  action: ISceneTimeAction;
  index: number;
  mode: 'add' | 'edit';
}) => {
  const { created, category, editing } = action;
  const { message } = App.useApp();
  const [form] = Form.useForm<TimeFormType>();
  const watchTimeType = Form.useWatch('formType', form);
  const dispatch = useAppDispatch();

  const handleSelectTimeType = (value: ETimeType) => {
    switch (value) {
      case ETimeType.TimeExact:
        if (action.type === ETimeType.TimeExact) break;
        form.setFieldsValue({
          formOperator: ESceneOperator.Equal,
          formValue: dayjs().add(12, 'h'),
        });
        break;
      case ETimeType.DateRange:
        if (action.type === ETimeType.DateRange) break;
        form.setFieldsValue({
          formDateRange: [dayjs().add(12, 'h'), dayjs().add(12, 'h').add(7, 'd')],
        });
        break;
      case ETimeType.TimeRange:
        if (action.type === ETimeType.TimeRange) break;
        form.setFieldsValue({
          formTimeRange: [dayjs().add(12, 'h'), dayjs().add(12, 'h').add(6, 'h')],
        });
        break;
      default:
        break;
    }
  };

  const handleSubmit = (values: TimeFormType) => {
    const { formType } = values;
    switch (formType) {
      case ETimeType.TimeExact: {
        const { formOperator, formValue } = values;
        if (formOperator && formValue) {
          dispatch(
            editSceneActionData({
              index,
              condition: {
                editing: false,
                created,
                category,
                type: formType,
                operator: formOperator,
                value: formValue?.unix(),
              },
              for: mode,
            }),
          );
          message.success('Time action saved');
        }
        break;
      }
      case ETimeType.DateRange: {
        const { formDateRange } = values;
        if (formDateRange && formDateRange[0] && formDateRange[1]) {
          dispatch(
            editSceneActionData({
              index,
              condition: {
                editing: false,
                created,
                category,
                type: formType,
                startDate: formDateRange[0]?.unix(),
                endDate: formDateRange[1]?.unix(),
              },
              for: mode,
            }),
          );
          message.success('Time action saved');
        }
        break;
      }
      case ETimeType.TimeRange: {
        const { formTimeRange } = values;
        if (formTimeRange && formTimeRange[0] && formTimeRange[1]) {
          dispatch(
            editSceneActionData({
              index,
              condition: {
                editing: false,
                created,
                category,
                type: formType,
                startTime: formTimeRange[0]?.format(DATE_UTILS.timeFormat),
                endTime: formTimeRange[1]?.format(DATE_UTILS.timeFormat),
              },
              for: mode,
            }),
          );
          message.success('Time action saved');
        }
        break;
      }
      default:
        break;
    }
  };

  return (
    <div className="mx-6">
      <Form
        disabled={!editing}
        form={form}
        onFinish={handleSubmit}
        requiredMark={false}
        initialValues={{
          formType: action.type,
          formOperator: action.operator,
          formValue: action.value ? dayjs.unix(action.value) : undefined,
          formDateRange:
            action.startDate && action.endDate
              ? [dayjs.unix(action.startDate), dayjs.unix(action.endDate)]
              : [undefined, undefined],
          formTimeRange:
            action.startTime && action.endTime
              ? [
                  dayjs(action.startTime, DATE_UTILS.timeFormat),
                  dayjs(action.endTime, DATE_UTILS.timeFormat),
                ]
              : [undefined, undefined],
        }}
      >
        <Form.Item<TimeFormType>
          name="formType"
          rules={[{ required: true, message: 'Please select a time type' }]}
          style={{
            marginBottom: 4,
            marginTop: 8,
          }}
        >
          <Select
            style={{
              width: '100%',
            }}
            options={timeSelect}
            placeholder="Select a time type"
            onChange={handleSelectTimeType}
          />
        </Form.Item>
        <div className="mt-4 flex flex-col gap-3">
          {watchTimeType === ETimeType.TimeExact && (
            <Flex justify="space-between" align="center" gap={12}>
              <Form.Item<TimeFormType> name="formOperator" style={{ width: 100, marginBottom: 0 }}>
                <OperatorSelect />
              </Form.Item>
              <Form.Item<TimeFormType>
                name="formValue"
                style={{ marginBottom: 0 }}
                rules={[
                  { type: 'object' as const, required: true, message: 'Please select time!' },
                ]}
              >
                <DatePicker
                  format={DATE_UTILS.dateFormat}
                  placeholder={DATE_UTILS.dateFormat}
                  allowClear={false}
                  // changeOnScroll
                  // needConfirm={false}
                  showTime
                  showNow={false}
                  renderExtraFooter={() => 'Tip: You can only select time after 12 hours'}
                  disabledDate={DATE_UTILS.disabledDate}
                  disabledTime={DATE_UTILS.disabledDateTime}
                />
              </Form.Item>
            </Flex>
          )}
          {watchTimeType === ETimeType.DateRange && (
            <Form.Item<TimeFormType>
              name="formDateRange"
              style={{ marginBottom: 0 }}
              rules={[{ type: 'array' as const, required: true, message: 'Please select time!' }]}
            >
              <RangePicker
                format={DATE_UTILS.dateFormat}
                disabledDate={DATE_UTILS.disabledDate}
                disabledTime={DATE_UTILS.disabledDateTime}
                presets={DATE_UTILS.timeRangePickerRangePresets}
                allowClear={false}
                showTime
                // changeOnScroll
                // needConfirm={false}
              />
            </Form.Item>
          )}
          {watchTimeType === ETimeType.TimeRange && (
            <Form.Item<TimeFormType>
              name="formTimeRange"
              style={{ marginBottom: 0 }}
              rules={[{ type: 'array' as const, required: true, message: 'Please select time!' }]}
            >
              <TimePicker.RangePicker
                format={DATE_UTILS.timeFormat}
                style={{ width: '100%' }}
                // changeOnScroll
                // needConfirm={false}
              />
            </Form.Item>
          )}
        </div>
      </Form>

      {editing ? (
        <Button
          style={{ marginTop: 14, marginBottom: 8 }}
          block
          type="primary"
          onClick={() => form.submit()}
        >
          Save
        </Button>
      ) : (
        <Button
          onClick={() => {
            dispatch(
              editSceneConditionData({
                index,
                condition: {
                  ...action,
                  editing: true,
                },
                for: mode,
              }),
            );
          }}
          style={{ marginTop: 14, marginBottom: 8 }}
          block
          type="default"
        >
          Edit
        </Button>
      )}
    </div>
  );
};

export default TimeAction;
