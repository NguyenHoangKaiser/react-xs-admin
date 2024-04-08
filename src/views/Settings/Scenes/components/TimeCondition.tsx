import useValidateLocale from '@/hooks/useValidateLocale';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  addSceneConditionsSelector,
  editSceneConditionData,
  editSceneConditionsSelector,
} from '@/store/modules/scene';
import { DATE_UTILS, EConditionsTypeName, ESceneOperator, ETimeType } from '@/utils/constant';
import { App, Button, Checkbox, DatePicker, Flex, Form, Select, TimePicker } from 'antd';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import type { ISceneConditionType, ISceneTimeCondition } from '../scene';
import { OperatorSelect } from './ConditionCard';

const { RangePicker } = DatePicker;

interface TimeFormType {
  formType: ETimeType;
  formOperator?: ESceneOperator;
  formValue?: dayjs.Dayjs | null;
  formDateRange?: [dayjs.Dayjs | null, dayjs.Dayjs | null];
  formTimeRange?: [dayjs.Dayjs | null, dayjs.Dayjs | null];
  trigger?: boolean;
}

const TimeCondition = ({
  condition,
  index,
  mode,
  viewOnly,
  type: conditionType,
}: {
  condition: ISceneTimeCondition;
  index: number;
  mode: 'add' | 'edit';
  viewOnly?: boolean;
  type: ISceneConditionType;
}) => {
  const { formatMessage } = useIntl();
  const timeSelect: {
    label: string;
    value: ETimeType;
  }[] = [
    {
      label: formatMessage({ id: 'common.scene.exactTime' }),
      value: ETimeType.TimeExact,
    },
    {
      label: formatMessage({ id: 'common.scene.dateRange' }),
      value: ETimeType.DateRange,
    },
    {
      label: formatMessage({ id: 'common.scene.timeRange' }),
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

  const { created, category, editing } = condition;
  const { message } = App.useApp();
  const [form] = Form.useForm<TimeFormType>();
  useValidateLocale(form);
  const watchTimeType = Form.useWatch('formType', form);
  const dispatch = useAppDispatch();
  const { type: addType } = useAppSelector(addSceneConditionsSelector);
  const { type: editType } = useAppSelector(editSceneConditionsSelector);
  const conditionsType: ISceneConditionType = viewOnly
    ? conditionType
    : mode === 'add'
    ? addType
    : editType;

  const handleSelectTimeType = (value: ETimeType) => {
    switch (value) {
      case ETimeType.TimeExact:
        if (condition.type === ETimeType.TimeExact) break;
        form.setFieldsValue({
          formOperator: ESceneOperator.Equal,
          formValue: dayjs().add(12, 'h'),
        });
        break;
      case ETimeType.DateRange:
        if (condition.type === ETimeType.DateRange) break;
        form.setFieldsValue({
          formDateRange: [dayjs().add(12, 'h'), dayjs().add(12, 'h').add(7, 'd')],
        });
        break;
      case ETimeType.TimeRange:
        if (condition.type === ETimeType.TimeRange) break;
        form.setFieldsValue({
          formTimeRange: [dayjs().add(12, 'h'), dayjs().add(12, 'h').add(6, 'h')],
        });
        break;
      default:
        break;
    }
  };

  const handleSubmit = (values: TimeFormType) => {
    const { formType, trigger } = values;
    switch (formType) {
      case ETimeType.TimeExact: {
        const { formOperator, formValue } = values;
        if (formOperator && formValue) {
          dispatch(
            editSceneConditionData({
              index,
              condition: {
                editing: false,
                created,
                category,
                type: formType,
                operator: formOperator,
                value: formValue?.unix(),
              },
              trigger: trigger || false,
              for: mode,
            }),
          );
          message.success(formatMessage({ id: 'common.scene.conditionSaved' }));
        }
        break;
      }
      case ETimeType.DateRange: {
        const { formDateRange } = values;
        if (formDateRange && formDateRange[0] && formDateRange[1]) {
          dispatch(
            editSceneConditionData({
              index,
              condition: {
                editing: false,
                created,
                category,
                type: formType,
                startDate: formDateRange[0]?.unix(),
                endDate: formDateRange[1]?.unix(),
              },
              trigger: trigger || false,
              for: mode,
            }),
          );
          message.success(formatMessage({ id: 'common.scene.conditionSaved' }));
        }
        break;
      }
      case ETimeType.TimeRange: {
        const { formTimeRange } = values;
        if (formTimeRange && formTimeRange[0] && formTimeRange[1]) {
          dispatch(
            editSceneConditionData({
              index,
              condition: {
                editing: false,
                created,
                category,
                type: formType,
                startTime: formTimeRange[0]?.format(DATE_UTILS.timeFormat),
                endTime: formTimeRange[1]?.format(DATE_UTILS.timeFormat),
              },
              trigger: trigger || false,
              for: mode,
            }),
          );
          message.success(formatMessage({ id: 'common.scene.conditionSaved' }));
        }
        break;
      }
      default:
        break;
    }
  };

  useEffect(() => {
    if (conditionsType.name === EConditionsTypeName.All) {
      form.setFieldsValue({
        trigger: undefined,
      });
    }
  }, [conditionsType.name]);

  return (
    <div className="mx-6">
      <Form
        disabled={!editing || viewOnly}
        form={form}
        onFinish={handleSubmit}
        requiredMark={false}
        initialValues={{
          formType: condition.type,
          formOperator: condition.operator,
          formValue: condition.value ? dayjs.unix(condition.value) : undefined,
          formDateRange:
            condition.startDate && condition.endDate
              ? [dayjs.unix(condition.startDate), dayjs.unix(condition.endDate)]
              : [undefined, undefined],
          formTimeRange:
            condition.startTime && condition.endTime
              ? [
                  dayjs(condition.startTime, DATE_UTILS.timeFormat),
                  dayjs(condition.endTime, DATE_UTILS.timeFormat),
                ]
              : [undefined, undefined],
          trigger:
            conditionsType.name === EConditionsTypeName.Any &&
            conditionsType.trigger.some((item) => item.created === condition.created),
        }}
      >
        <Form.Item<TimeFormType>
          name="formType"
          rules={[
            { required: true, message: formatMessage({ id: 'common.scene.requireTimeType' }) },
          ]}
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
            placeholder={formatMessage({ id: 'common.scene.selectTimeType' })}
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
                  {
                    type: 'object' as const,
                    required: true,
                    message: formatMessage({ id: 'common.requireExactTime' }),
                  },
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
                  renderExtraFooter={() => <FormattedMessage id="common.scene.timeAfter12" />}
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
              rules={[
                {
                  type: 'array' as const,
                  required: true,
                  message: formatMessage({ id: 'common.requireDateRange' }),
                },
              ]}
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
              rules={[
                {
                  type: 'array' as const,
                  required: true,
                  message: formatMessage({ id: 'common.requireTimeRange' }),
                },
              ]}
            >
              <TimePicker.RangePicker
                format={DATE_UTILS.timeFormat}
                style={{ width: '100%' }}
                // changeOnScroll
                // needConfirm={false}
              />
            </Form.Item>
          )}
          {conditionsType.name === EConditionsTypeName.Any && (
            <Form.Item<TimeFormType>
              name="trigger"
              label={formatMessage({ id: 'common.scene.asTrigger' })}
              valuePropName="checked"
              style={{ marginBottom: 4 }}
            >
              <Checkbox />
            </Form.Item>
          )}
        </div>
      </Form>
      {!viewOnly && (
        <>
          {editing ? (
            <Button
              style={{ marginTop: 14, marginBottom: 8 }}
              block
              // disabled={isFetching || !watchDeviceId || !watchTraitSelect}
              type="primary"
              onClick={() => form.submit()}
            >
              <FormattedMessage id="common.save" />
            </Button>
          ) : (
            <Button
              onClick={() => {
                dispatch(
                  editSceneConditionData({
                    index,
                    condition: {
                      ...condition,
                      editing: true,
                    },
                    trigger: false,
                    for: mode,
                  }),
                );
              }}
              style={{ marginTop: 14, marginBottom: 8 }}
              block
              type="default"
            >
              <FormattedMessage id="common.edit" />
            </Button>
          )}
        </>
      )}
    </div>
  );
};

export default TimeCondition;
