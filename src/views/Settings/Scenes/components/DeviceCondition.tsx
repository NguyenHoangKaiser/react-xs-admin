import useValidateLocale from '@/hooks/useValidateLocale';
import { useGetDevicesQuery } from '@/server/devicesApi';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { hotelSelector } from '@/store/modules/hotel';
import {
  addSceneConditionsSelector,
  editSceneConditionData,
  editSceneConditionsSelector,
} from '@/store/modules/scene';
import { EConditionsTypeName } from '@/utils/constant';
import type { CSSObject } from '@emotion/react';
import type { SelectProps } from 'antd';
import { App, Button, Checkbox, Flex, Form, InputNumber, Select, Switch, Tag } from 'antd';
import { useEffect } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import type { ILightTrait, ISceneConditionType, ISceneDeviceCondition, IStates } from '../scene';
import { OperatorSelect } from './ConditionCard';

interface DeviceFormType {
  deviceId: string;
  traitSelect: ILightTrait[];
  states: IStates;
  trigger?: boolean;
}

const DeviceCondition = ({
  condition,
  index,
  mode,
  viewOnly,
  type: conditionType,
}: {
  condition: ISceneDeviceCondition;
  index: number;
  mode: 'add' | 'edit';
  viewOnly?: boolean;
  type: ISceneConditionType;
}) => {
  const { message } = App.useApp();
  const { formatMessage } = useIntl();
  const [form] = Form.useForm<DeviceFormType>();
  useValidateLocale(form);
  const watchDeviceId = Form.useWatch('deviceId', form);
  const watchTraitSelect = Form.useWatch('traitSelect', form);
  const { states, deviceId, editing } = condition;
  const dispatch = useAppDispatch();
  const { hotel_id, idx_Floor } = useAppSelector(hotelSelector);
  const { type: addType } = useAppSelector(addSceneConditionsSelector);
  const { type: editType } = useAppSelector(editSceneConditionsSelector);
  const conditionsType: ISceneConditionType = viewOnly
    ? conditionType
    : mode === 'add'
    ? addType
    : editType;
  const { data, isFetching } = useGetDevicesQuery(
    {
      hotel_id: hotel_id?.toString() || '',
      floor_id: idx_Floor?.toString() || '',
    },
    {
      skip: !hotel_id || !idx_Floor || !condition,
    },
  );
  // const [canSelectMultiple, setCanSelectMultiple] = useState(true);
  const deviceSelect = data?.items?.map((item) => ({
    value: item.devid,
    label: item.name,
  }));
  const selectedDevice = data?.items?.find((item) => item.devid === (watchDeviceId || deviceId));
  const traitsSelect: SelectProps['options'] = selectedDevice?.traits?.map((item) => ({
    value: item.name,
    label: formatMessage({ id: `common.scene.traits.${item.name}` }),
  }));

  const handleSubmit = (values: DeviceFormType) => {
    const { deviceId, states, trigger } = values;
    dispatch(
      editSceneConditionData({
        index,
        condition: {
          ...condition,
          editing: false,
          deviceId,
          states,
          type: selectedDevice ? selectedDevice.type : null,
        },
        trigger: trigger || false,
        for: mode,
      }),
    );
    message.success(formatMessage({ id: 'common.scene.conditionSaved' }));
  };

  // useEffect to watch watchTraitSelect and update value of OnOff, Brightness, ColdWarmColor
  useEffect(() => {
    if (!editing) {
      return;
    }
    const stateKey = Object.keys(states || {});
    if (watchTraitSelect) {
      if (!stateKey.includes('OnOff')) {
        if (watchTraitSelect.includes('OnOff')) {
          form.setFieldsValue({
            states: {
              OnOff: {
                on: true,
                operator: 1,
              },
            },
          });
        } else {
          form.setFieldsValue({
            states: {
              OnOff: undefined,
            },
          });
        }
      }
      if (!stateKey.includes('Brightness')) {
        if (watchTraitSelect.includes('Brightness')) {
          form.setFieldsValue({
            states: {
              ...form.getFieldValue('states'),
              Brightness: {
                brightness: 50,
                operator: 1,
              },
            },
          });
        } else {
          form.setFieldsValue({
            states: {
              ...form.getFieldValue('states'),
              Brightness: undefined,
            },
          });
        }
      }
      if (!stateKey.includes('ColdWarmColor')) {
        if (watchTraitSelect.includes('ColdWarmColor')) {
          form.setFieldsValue({
            states: {
              ...form.getFieldValue('states'),
              ColdWarmColor: {
                coldWarmColor: 50,
                operator: 1,
              },
            },
          });
        } else {
          form.setFieldsValue({
            states: {
              ...form.getFieldValue('states'),
              ColdWarmColor: undefined,
            },
          });
        }
      }
    }
  }, [watchTraitSelect, states, editing]);

  useEffect(() => {
    if (conditionsType.name === EConditionsTypeName.All) {
      form.setFieldsValue({
        trigger: undefined,
      });
    }
  }, [conditionsType.name]);

  return (
    <div css={getDivCss()} className="mx-6">
      <Form
        disabled={!editing || viewOnly}
        form={form}
        requiredMark={false}
        onFinish={handleSubmit}
        initialValues={{
          deviceId: deviceId,
          traitSelect: Object.keys(states || {}) as ILightTrait[],
          states,
          trigger:
            conditionsType.name === EConditionsTypeName.Any &&
            conditionsType.trigger.some((item) => item.created === condition.created),
        }}
      >
        <Form.Item<DeviceFormType>
          name="deviceId"
          rules={[
            {
              required: true,
              message: formatMessage({ id: 'common.requireDevice' }),
            },
          ]}
          style={{ marginBottom: 4, marginTop: 8 }}
        >
          <Select
            loading={isFetching}
            style={{
              width: '100%',
            }}
            placeholder={formatMessage({ id: 'common.selectDevice' })}
            options={deviceSelect}
            onChange={(_deviceId) => {
              form.setFieldsValue({
                traitSelect: undefined,
              });
            }}
          />
        </Form.Item>
        {watchDeviceId && (
          <Form.Item<DeviceFormType>
            name="traitSelect"
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  const traits = getFieldValue('traitSelect');
                  if (value.length > 0) {
                    if (traits.includes('OnOff')) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error(formatMessage({ id: 'common.requireOnOff' })));
                  }
                  return Promise.reject(new Error(formatMessage({ id: 'common.requireTraits' })));
                },
              }),
            ]}
          >
            <Select
              loading={isFetching}
              style={{
                width: '100%',
                marginTop: 8,
              }}
              mode="multiple"
              allowClear
              placeholder={formatMessage({ id: 'common.selectTrait' })}
              options={traitsSelect}
              // mode={canSelectMultiple ? 'multiple' : undefined}
              // allowClear={canSelectMultiple}
              // dropdownRender={(menu) => (
              //   <>
              //     {menu}
              //     <Divider style={{ margin: '8px 0' }} />
              //     <Flex className="px-2" justify="space-between">
              //       <Typography.Text>Can select multiple:</Typography.Text>
              //       <Switch disabled checked={canSelectMultiple} />
              //     </Flex>
              //   </>
              // )}
            />
          </Form.Item>
        )}

        <div className="mt-4 flex flex-col gap-3">
          {watchTraitSelect?.includes('OnOff') && (
            <>
              <Tag className="tag-title" color="blue">
                <FormattedMessage id="common.switchOnOff" />
              </Tag>
              <Flex justify="space-between" align="center" gap={12}>
                <Form.Item<DeviceFormType>
                  name={['states', 'OnOff', 'operator']}
                  style={{ width: 100, marginBottom: 4 }}
                >
                  <OperatorSelect disabled />
                </Form.Item>
                <Form.Item<DeviceFormType>
                  name={['states', 'OnOff', 'on']}
                  style={{ marginBottom: 4 }}
                  rules={[
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value) {
                          const traits = getFieldValue('traitSelect');
                          if (traits.includes('ColdWarmColor') || traits.includes('Brightness')) {
                            return Promise.reject(
                              new Error(formatMessage({ id: 'common.requireOnOff' })),
                            );
                          }
                          return Promise.resolve();
                        }
                        return Promise.resolve();
                      },
                    }),
                  ]}
                >
                  <Switch />
                </Form.Item>
              </Flex>
            </>
          )}
          {watchTraitSelect?.includes('Brightness') && (
            <>
              <Tag className="tag-title" color="blue">
                <FormattedMessage id="common.brightness" />
              </Tag>
              <Flex justify="space-between" align="center" gap={12}>
                <Form.Item<DeviceFormType>
                  name={['states', 'Brightness', 'operator']}
                  style={{ width: 100, marginBottom: 4 }}
                  rules={[
                    {
                      required: true,
                      message: formatMessage({ id: 'common.requireOperator' }),
                    },
                  ]}
                >
                  <OperatorSelect />
                </Form.Item>
                <Form.Item<DeviceFormType>
                  name={['states', 'Brightness', 'brightness']}
                  style={{ marginBottom: 4 }}
                  rules={[
                    {
                      required: true,
                      message: formatMessage({ id: 'common.requireBrightness' }),
                    },
                  ]}
                >
                  <InputNumber
                    min={0}
                    max={100}
                    changeOnWheel
                    addonAfter="%"
                    parser={(value) => {
                      return Math.round(Number(value));
                    }}
                  />
                </Form.Item>
              </Flex>
            </>
          )}
          {watchTraitSelect?.includes('ColdWarmColor') && (
            <>
              <Tag className="tag-title" color="blue">
                <FormattedMessage id="common.colorTemp" />
              </Tag>
              <Flex justify="space-between" align="center" gap={12}>
                <Form.Item<DeviceFormType>
                  name={['states', 'ColdWarmColor', 'operator']}
                  style={{ width: 100, marginBottom: 4 }}
                  rules={[
                    {
                      required: true,
                      message: formatMessage({ id: 'common.requireOperator' }),
                    },
                  ]}
                >
                  <OperatorSelect />
                </Form.Item>
                <Form.Item<DeviceFormType>
                  name={['states', 'ColdWarmColor', 'coldWarmColor']}
                  style={{ marginBottom: 4 }}
                  rules={[
                    {
                      required: true,
                      message: formatMessage({ id: 'common.requireColorTemp' }),
                    },
                  ]}
                >
                  <InputNumber
                    min={0}
                    max={100}
                    changeOnWheel
                    addonAfter="˚C"
                    parser={(value) => {
                      return Math.round(Number(value));
                    }}
                  />
                </Form.Item>
              </Flex>
            </>
          )}
          {conditionsType.name === EConditionsTypeName.Any && (
            <Form.Item<DeviceFormType>
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
              disabled={isFetching || !watchDeviceId || !watchTraitSelect}
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

export default DeviceCondition;

const getDivCss = (): CSSObject => {
  return {
    // '&': {},
    '& .tag-title': {
      fontSize: 16,
      // fontWeight: 'bold',
      lineHeight: '22px',
    },
    '& button[id="states_OnOff_on"]': {
      float: 'right',
    },
  };
};
