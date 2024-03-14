import SvgIcon from '@/components/SvgIcon';
import type { FieldType } from '@/utils/constant';
import { ListIconImage } from '@/utils/constant';
import { Button, Form, Input, Modal, Select, Space, type FormInstance } from 'antd';
import React, { useEffect, useState } from 'react';

interface CollectionCreateFormProps {
  initialValues: FieldType;
  onFormInstanceReady: (instance: FormInstance<FieldType>) => void;
}

const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
  initialValues,
  onFormInstanceReady,
}) => {
  const [form] = Form.useForm();
  useEffect(() => {
    onFormInstanceReady(form);
  }, []);
  return (
    <Form layout="vertical" form={form} name="form_in_modal" initialValues={initialValues}>
      <Form.Item label="Tên nhóm" name="group_name" rules={[{ required: true }]}>
        <Input placeholder="Tên nhóm" />
      </Form.Item>
      <Form.Item label="Khu vực" name="section" rules={[{ required: true }]}>
        <Select placeholder="Chọn khu vực" allowClear>
          <Select.Option value="dimmer">Dimmer</Select.Option>
          <Select.Option value="rgb">RGB</Select.Option>
          <Select.Option value="ww">WW</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Loại thiết bị" name="category" rules={[{ required: true }]}>
        <Select placeholder="Chọn loại thiết bị">
          <Select.Option value="dimmer">Dimmer</Select.Option>
          <Select.Option value="rgb">RGB</Select.Option>
          <Select.Option value="ww">WW</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Thiết bị" name="devices" rules={[{ required: true }]}>
        <Select placeholder="Chọn thiết bị" allowClear mode="multiple">
          <Select.Option value="dimmer">Dimmer</Select.Option>
          <Select.Option value="rgb">RGB</Select.Option>
          <Select.Option value="ww">WW</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Icon" name="icon">
        <Space wrap>
          {ListIconImage.map((icon) => (
            <Button
              key={icon.id}
              style={{
                // border:
                //   selectedIcon === icon
                //     ? `1px solid ${thme.token.colorPrimary}`
                //     : `1px solid transparent`,
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

interface CollectionCreateFormModalProps {
  open: boolean;
  onCreate: (values: FieldType) => void;
  onCancel: () => void;
  initialValues: FieldType;
}

const CollectionCreateFormModal: React.FC<CollectionCreateFormModalProps> = ({
  open,
  onCreate,
  onCancel,
  initialValues,
}) => {
  const [formInstance, setFormInstance] = useState<FormInstance>();
  return (
    <Modal
      open={open}
      title="Create a new collection"
      okText="Create"
      cancelText="Cancel"
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
    >
      <CollectionCreateForm
        initialValues={initialValues}
        onFormInstanceReady={(instance) => {
          setFormInstance(instance);
        }}
      />
    </Modal>
  );
};

export default CollectionCreateFormModal;
