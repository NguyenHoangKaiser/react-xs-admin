import useValidateLocale from '@/hooks/useValidateLocale';
import { useAppDispatch } from '@/store/hooks';
import { editSceneActionData } from '@/store/modules/scene';
import { DATE_UTILS, ESceneOperator, ETimeType } from '@/utils/constant';
import { App, Button, Flex, Form, Select, TimePicker } from 'antd';
import dayjs from 'dayjs';
import { FormattedMessage, useIntl } from 'react-intl';
import type { ISceneTimeAction } from '../scene';
import { OperatorSelect } from './ConditionCard';

interface TimeFormType {
  formType: ETimeType;
  formOperator?: ESceneOperator;
  formDuration?: dayjs.Dayjs | null;
}

const TimeAction = ({
  action,
  index,
  mode,
  viewOnly,
}: {
  action: ISceneTimeAction;
  index: number;
  mode: 'add' | 'edit';
  viewOnly?: boolean;
}) => {
  const { formatMessage } = useIntl();
  const timeSelect: {
    label: string;
    value: ETimeType;
  }[] = [
    {
      label: formatMessage({ id: 'common.scene.timeDelay' }),
      value: ETimeType.TimeDelay,
    },
  ];

  const { created, category, editing } = action;
  const { message } = App.useApp();
  const [form] = Form.useForm<TimeFormType>();
  useValidateLocale(form);
  const watchTimeType = Form.useWatch('formType', form);
  const dispatch = useAppDispatch();

  const handleSelectTimeType = (value: ETimeType) => {
    switch (value) {
      case ETimeType.TimeDelay:
        if (action.type === ETimeType.TimeDelay) break;
        form.setFieldsValue({
          // formOperator: ESceneOperator.Equal,
          formDuration: dayjs().startOf('day').add(5, 'm'),
        });
        break;
      default:
        break;
    }
  };

  const handleSubmit = (values: TimeFormType) => {
    const { formType } = values;
    switch (formType) {
      case ETimeType.TimeDelay: {
        const { formOperator, formDuration } = values;
        if (formOperator && formDuration) {
          dispatch(
            editSceneActionData({
              index,
              condition: {
                editing: false,
                created,
                category,
                type: formType,
                operator: formOperator,
                duration: formDuration.diff(dayjs().startOf('day'), 's'),
              },
              for: mode,
            }),
          );
          message.success(formatMessage({ id: 'common.scene.actionSaved' }));
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
        disabled={!editing || viewOnly}
        form={form}
        onFinish={handleSubmit}
        requiredMark={false}
        initialValues={{
          formType: action.type,
          formOperator: ESceneOperator.Equal,
          formDuration: action.duration
            ? dayjs().startOf('day').add(action.duration, 's')
            : undefined,
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
          {watchTimeType === ETimeType.TimeDelay && (
            <Flex justify="space-between" align="center" gap={12}>
              <Form.Item<TimeFormType> name="formOperator" style={{ width: 100, marginBottom: 0 }}>
                <OperatorSelect disabled />
              </Form.Item>
              <Form.Item<TimeFormType>
                name="formDuration"
                style={{ marginBottom: 0 }}
                rules={[
                  {
                    type: 'object' as const,
                    required: true,
                    message: formatMessage({ id: 'common.requireTimeDelay' }),
                  },
                ]}
              >
                <TimePicker
                  format={DATE_UTILS.timeFormat}
                  placeholder={DATE_UTILS.timeFormat}
                  allowClear={false}
                  showNow={false}
                  // changeOnScroll
                  // needConfirm={false}
                  // showTime
                  // renderExtraFooter={() => 'Tip: You can only select time after 12 hours'}
                  // disabledDate={DATE_UTILS.disabledDate}
                  // disabledTime={DATE_UTILS.disabledDateTime}
                />
              </Form.Item>
            </Flex>
          )}
        </div>
      </Form>
      {!viewOnly && (
        <>
          {editing ? (
            <Button
              style={{ marginTop: 14, marginBottom: 8 }}
              block
              type="primary"
              onClick={() => form.submit()}
            >
              <FormattedMessage id="common.save" />
            </Button>
          ) : (
            <Button
              onClick={() => {
                dispatch(
                  editSceneActionData({
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
              <FormattedMessage id="common.edit" />
            </Button>
          )}
        </>
      )}
    </div>
  );
};

export default TimeAction;
