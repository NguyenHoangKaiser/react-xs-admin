import { Form, Input, Modal, type FormInstance } from 'antd';
import React, { useEffect, useState } from 'react';

interface EditAreaFormProps {
  initialValues: DataT;
  onFormInstanceReady: (instance: FormInstance) => void;
}
interface DataT {
  titleWithNoIcon?: string;
  location: string;
}
interface EditAreaFormModalProps {
  open: boolean;
  onCreate: () => void;
  onCancel: () => void;
  initialValues: DataT;
}
const EditAreaForm: React.FC<EditAreaFormProps> = ({ initialValues, onFormInstanceReady }) => {
  const [form] = Form.useForm();
  useEffect(() => {
    onFormInstanceReady(form);
  }, []);
  return (
    <Form layout="vertical" form={form} name="form_in_modal" initialValues={initialValues}>
      <Form.Item label="Tên khu vực" name="titleWithNoIcon" rules={[{ required: true }]}>
        <Input placeholder="Tên khu vực" />
      </Form.Item>
      <Form.Item label="Thuộc khu vực" name="location">
        <Input placeholder="Thuộc khu vực" disabled />
      </Form.Item>
    </Form>
  );
};

const EditAreaFormModal: React.FC<EditAreaFormModalProps> = ({
  open,
  onCreate,
  onCancel,
  initialValues,
}) => {
  const [formInstance, setFormInstance] = useState<FormInstance>();
  return (
    <Modal
      open={open}
      title="Chỉnh sửa thiết bị"
      okText="Đồng ý"
      cancelText="Hủy"
      okButtonProps={{ autoFocus: true }}
      onCancel={onCancel}
      destroyOnClose
      onOk={async () => {
        try {
          //  const values = await formInstance?.validateFields();
          formInstance?.resetFields();
          onCreate();
        } catch (error) {
          console.log('Failed:', error);
        }
      }}
    >
      <EditAreaForm
        initialValues={initialValues}
        onFormInstanceReady={(instance) => {
          setFormInstance(instance);
        }}
      />
    </Modal>
  );
};

export default EditAreaFormModal;
