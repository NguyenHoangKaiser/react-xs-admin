import { useLocale } from '@/locales';
import { Form, Input, Modal, type FormInstance } from 'antd';
import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

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
  const { formatMessage } = useLocale();

  useEffect(() => {
    onFormInstanceReady(form);
  }, []);
  return (
    <Form layout="vertical" form={form} name="form_in_modal" initialValues={initialValues}>
      <Form.Item
        label={formatMessage({ id: 'common.areaName' })}
        name="titleWithNoIcon"
        rules={[
          {
            required: true,
            message: <FormattedMessage id="common.areaNameRequire" />,
          },
        ]}
      >
        <Input placeholder={formatMessage({ id: 'common.areaName' })} />
      </Form.Item>
      <Form.Item label={formatMessage({ id: 'common.belong' })} name="location">
        <Input placeholder={formatMessage({ id: 'common.belong' })} disabled />
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
