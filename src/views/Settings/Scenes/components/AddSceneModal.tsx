import SvgIcon from '@/components/SvgIcon';
import { ListIconImage } from '@/utils/constant';
import { Button, Form, Input, Modal, Select, Space, type FormInstance } from 'antd';
import React, { useEffect, useState } from 'react';

export interface AddSceneFormType {
  scene_name?: string;
  section?: string;
  run_scene: 'auto' | 'manual';
  category?: string;
  allow_restart: boolean;
  icon?: string;
}

interface AddSceneFormProps {
  initialValues: AddSceneFormType;
  onFormInstanceReady: (instance: FormInstance<AddSceneFormType>) => void;
}

const AddSceneForm: React.FC<AddSceneFormProps> = ({ initialValues, onFormInstanceReady }) => {
  const [form] = Form.useForm();
  useEffect(() => {
    onFormInstanceReady(form);
  }, []);
  return (
    <Form layout="vertical" form={form} name="form_in_modal" initialValues={initialValues}>
      <Form.Item label="Tên cảnh" name="scene_name" rules={[{ required: true }]}>
        <Input placeholder="Tên cảnh" />
      </Form.Item>
      <Form.Item label="Khu vực" name="section" rules={[{ required: true }]}>
        <Select placeholder="Chọn khu vực" allowClear>
          <Select.Option value="dimmer">Dimmer</Select.Option>
          <Select.Option value="rgb">RGB</Select.Option>
          <Select.Option value="ww">WW</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Chế độ chạy" name="run_scene" rules={[{ required: true }]}>
        <Select>
          <Select.Option value="auto">Auto</Select.Option>
          <Select.Option value="manual">Manual</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Loại cảnh" name="category" rules={[{ required: true }]}>
        <Select placeholder="Chọn loại cảnh">
          <Select.Option value="dimmer">Dimmer</Select.Option>
          <Select.Option value="rgb">RGB</Select.Option>
          <Select.Option value="ww">WW</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Cho phép restart ?" name="allow_restart" rules={[{ required: true }]}>
        <Select>
          <Select.Option value={true}>Có</Select.Option>
          <Select.Option value={false}>Không</Select.Option>
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

interface AddSceneFormModalProps {
  open: boolean;
  onCreate: (values: AddSceneFormType) => void;
  onCancel: () => void;
  initialValues: AddSceneFormType;
}

const AddSceneFormModal: React.FC<AddSceneFormModalProps> = ({
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
      <AddSceneForm
        initialValues={initialValues}
        onFormInstanceReady={(instance) => {
          setFormInstance(instance);
        }}
      />
    </Modal>
  );
};

export default AddSceneFormModal;
