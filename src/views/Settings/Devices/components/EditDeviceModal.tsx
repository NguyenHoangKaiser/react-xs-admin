import SvgIcon from '@/components/SvgIcon';
import { useLocale } from '@/locales';
import { AppDefault, ListIconImage, type DataType, type FieldType } from '@/utils/constant';
import { Button, Form, Input, Modal, Select, Space, theme, type FormInstance } from 'antd';
import React, { useEffect, useState } from 'react';

interface DeviceEditFormProps {
  initialValues: DataType;
  onFormInstanceReady: (instance: FormInstance<FieldType>) => void;
}

const DeviceEditForm: React.FC<DeviceEditFormProps> = ({ initialValues, onFormInstanceReady }) => {
  const [form] = Form.useForm();
  const { token } = theme.useToken();
  const { formatMessage } = useLocale();
  const [selectedIcon, setSelectedIcon] = useState(initialValues.image);
  useEffect(() => {
    onFormInstanceReady(form);
  }, []);
  return (
    <Form layout="vertical" form={form} name="form_in_modal" initialValues={initialValues}>
      <Form.Item
        label={formatMessage({ id: 'common.deviceName' })}
        name="name"
        rules={[{ required: true }]}
      >
        <Input placeholder={formatMessage({ id: 'common.deviceName' })} />
      </Form.Item>
      <Form.Item
        label={formatMessage({ id: 'common.area' })}
        name="roomId"
        rules={[{ required: true }]}
      >
        <Select placeholder={formatMessage({ id: 'common.choseLocation' })} allowClear>
          <Select.Option value={1}>{formatMessage({ id: 'common.room' })}</Select.Option>
          <Select.Option value={2}>{formatMessage({ id: 'common.bedRoom' })}</Select.Option>
          <Select.Option value={3}>{formatMessage({ id: 'common.kitchen' })}</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        label={formatMessage({ id: 'common.deviceType' })}
        name="role"
        rules={[{ required: true }]}
      >
        <Select placeholder={formatMessage({ id: 'common.choseDevice' })}>
          <Select.Option value={1}>{formatMessage({ id: 'common.other' })}</Select.Option>
          <Select.Option value={2}>{formatMessage({ id: 'common.light' })}</Select.Option>
          <Select.Option value={3}>
            {formatMessage({ id: 'common.temperatureSensor' })}
          </Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Icon" name="image">
        <Space wrap>
          {ListIconImage.map((icon) => (
            <Button
              onClick={() => setSelectedIcon(icon.type)}
              key={icon.id}
              style={{
                border:
                  selectedIcon === icon.type
                    ? `1px solid ${token.colorPrimary}`
                    : `1px solid transparent`,
                background: 'transparent',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <SvgIcon name={icon.type} className="text-2xl mb-1" />
            </Button>
          ))}
        </Space>
      </Form.Item>
    </Form>
  );
};

interface DeviceEditFormModalProps {
  open: boolean;
  onCreate: (values: FieldType) => void;
  onCancel: () => void;
  initialValues: DataType;
}

const DeviceEditFormModal: React.FC<DeviceEditFormModalProps> = ({
  open,
  onCreate,
  onCancel,
  initialValues,
}) => {
  const [formInstance, setFormInstance] = useState<FormInstance>();
  const { formatMessage } = useLocale();

  return (
    <Modal
      open={open}
      title={formatMessage({ id: 'common.editDevice' })}
      okText={formatMessage({ id: 'common.agree' })}
      cancelText={formatMessage({ id: 'common.cancel' })}
      okButtonProps={{ autoFocus: true }}
      onCancel={onCancel}
      destroyOnClose
      onOk={async () => {
        try {
          const values = await formInstance?.validateFields();
          formInstance?.resetFields();
          onCreate(values);
        } catch (error) {
          console.log('Failed:', error);
        }
      }}
      width={AppDefault.modalWidth}
    >
      <DeviceEditForm
        initialValues={initialValues}
        onFormInstanceReady={(instance) => {
          setFormInstance(instance);
        }}
      />
    </Modal>
  );
};

export default DeviceEditFormModal;
