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
  const [selectedIcon, setSelectedIcon] = useState(initialValues.image);
  useEffect(() => {
    onFormInstanceReady(form);
  }, []);
  return (
    <Form layout="vertical" form={form} name="form_in_modal" initialValues={initialValues}>
      <Form.Item label="Tên thiết bị" name="name" rules={[{ required: true }]}>
        <Input placeholder="Tên thiết bị" />
      </Form.Item>
      <Form.Item label="Khu vực" name="roomId" rules={[{ required: true }]}>
        <Select placeholder="Chọn vị trí" allowClear>
          <Select.Option value={1}>Living Room</Select.Option>
          <Select.Option value={2}>Bed Room</Select.Option>
          <Select.Option value={3}>Kitchen</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Loại thiết bị" name="role" rules={[{ required: true }]}>
        <Select placeholder="Chọn loại thiết bị">
          <Select.Option value={1}>Other</Select.Option>
          <Select.Option value={2}>Light</Select.Option>
          <Select.Option value={3}>Temperature sensor</Select.Option>
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
