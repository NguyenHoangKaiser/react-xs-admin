import { useGetDevicesQuery } from '@/server/devicesApi';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { hotelSelector } from '@/store/modules/hotel';
import { editSceneActionData } from '@/store/modules/scene';
import type { CSSObject } from '@emotion/react';
import { App, Button, Flex, Form, InputNumber, Select, Switch, Tag } from 'antd';
import { useEffect } from 'react';
import type { ILightTrait, ISceneDeviceAction, IStates } from '../scene';
import { OperatorSelect } from './ConditionCard';

interface DeviceFormType {
  deviceId: string;
  traitSelect: ILightTrait[];
  states: IStates;
}

const DeviceAction = ({ action, index }: { action: ISceneDeviceAction; index: number }) => {
  const { message } = App.useApp();
  const [form] = Form.useForm<DeviceFormType>();
  const watchDeviceId = Form.useWatch('deviceId', form);
  const watchTraitSelect = Form.useWatch('traitSelect', form);
  const { states, deviceId, editing } = action;
  const dispatch = useAppDispatch();
  const { hotel_id, idx_Floor } = useAppSelector(hotelSelector);

  const { data, isFetching } = useGetDevicesQuery(
    {
      hotel_id: hotel_id?.toString() || '',
      floor_id: idx_Floor?.toString() || '',
    },
    {
      skip: !hotel_id || !idx_Floor || !action,
    },
  );
  // const [canSelectMultiple, setCanSelectMultiple] = useState(true);
  const deviceSelect = data?.items?.map((item) => ({
    value: item.devid,
    label: item.name,
  }));
  const selectedDevice = data?.items?.find((item) => item.devid === (deviceId || watchDeviceId));
  const traitsSelect = selectedDevice?.traits?.map((item) => ({
    value: item.name,
    label: item.name,
  }));

  const handleSubmit = (values: DeviceFormType) => {
    const { deviceId, states } = values;
    dispatch(
      editSceneActionData({
        index,
        condition: {
          ...action,
          editing: false,
          deviceId,
          states,
        },
      }),
    );
    message.success('Device action saved');
  };

  // useEffect to watch watchTraitSelect and update value of OnOff, Brightness, ColdWarmColor
  useEffect(() => {
    if (states || !editing) {
      return;
    }
    if (watchTraitSelect) {
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
  }, [watchTraitSelect, states, editing]);

  return (
    <div css={getDivCss()} className="mx-6">
      <Form
        disabled={!editing}
        form={form}
        requiredMark={false}
        onFinish={handleSubmit}
        initialValues={{
          deviceId: deviceId,
          traitSelect: Object.keys(states || {}) as ILightTrait[],
          states,
        }}
      >
        <Form.Item<DeviceFormType>
          name="deviceId"
          rules={[
            {
              required: true,
              message: 'Please select a device',
            },
          ]}
          style={{ marginBottom: 4, marginTop: 8 }}
        >
          <Select
            loading={isFetching}
            style={{
              width: '100%',
            }}
            placeholder="Select a device"
            options={deviceSelect}
          />
        </Form.Item>
        {watchDeviceId && (
          <Form.Item<DeviceFormType>
            name="traitSelect"
            rules={[
              // {
              //   required: true,
              //   message: 'Please select a trait',
              //   type: 'array',
              // },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  const traits = getFieldValue('traitSelect');
                  if (value.length > 0) {
                    if (traits.includes('OnOff')) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Please select OnOFf trait'));
                  }
                  return Promise.reject(new Error('Please select a trait'));
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
              // mode={canSelectMultiple ? 'multiple' : undefined}
              // allowClear={canSelectMultiple}
              placeholder="Select a trait"
              options={traitsSelect}
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
                On-Off Switch
              </Tag>
              <Flex justify="space-between" align="center">
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
                            return Promise.reject(new Error('Please switch OnOff on'));
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
                Brightness
              </Tag>
              <Flex justify="space-between" align="center">
                <Form.Item<DeviceFormType>
                  name={['states', 'Brightness', 'operator']}
                  style={{ width: 100, marginBottom: 4 }}
                >
                  <OperatorSelect />
                </Form.Item>
                <Form.Item<DeviceFormType>
                  name={['states', 'Brightness', 'brightness']}
                  style={{ marginBottom: 4 }}
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
                Cold-Warm Color
              </Tag>
              <Flex justify="space-between" align="center">
                <Form.Item<DeviceFormType>
                  name={['states', 'ColdWarmColor', 'operator']}
                  style={{ width: 100, marginBottom: 4 }}
                >
                  <OperatorSelect />
                </Form.Item>
                <Form.Item<DeviceFormType>
                  name={['states', 'ColdWarmColor', 'coldWarmColor']}
                  style={{ marginBottom: 4 }}
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
        </div>
      </Form>
      {editing ? (
        <Button
          style={{ marginTop: 14, marginBottom: 8 }}
          block
          disabled={isFetching || !watchDeviceId || !watchTraitSelect}
          type="primary"
          onClick={() => form.submit()}
        >
          Save
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

export default DeviceAction;

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
