import SvgIcon from '@/components/SvgIcon';
import { useLocale } from '@/locales';
import type { IGroupDevices, IconVariant } from '@/utils/constant';
import { FAKE_DATA, ListIconVariant } from '@/utils/constant';
import {
  Button,
  Form,
  Input,
  Modal,
  Select,
  Space,
  Typography,
  theme,
  type FormInstance,
} from 'antd';
import React, { useEffect, useState } from 'react';

interface GroupFormProps {
  initialValues?: IGroupDevices;
  onFormInstanceReady: (instance: FormInstance<IGroupDevices>) => void;
  selectedIcon?: IconVariant;
  setSelectedIcon: React.Dispatch<React.SetStateAction<IconVariant>>;
  typeModal?: string;
}

const GroupForm: React.FC<GroupFormProps> = ({
  initialValues,
  onFormInstanceReady,
  selectedIcon,
  setSelectedIcon,
  typeModal,
}) => {
  const [form] = Form.useForm();
  const thme = theme.useToken();
  const { formatMessage } = useLocale();

  useEffect(() => {
    onFormInstanceReady(form);
  }, []);
  return (
    <Form layout="vertical" form={form} name="form_in_modal" initialValues={initialValues}>
      <Form.Item
        label={formatMessage({ id: 'group.nameGroup' })}
        name="group_name"
        rules={[{ required: true }]}
      >
        <Input placeholder={formatMessage({ id: 'group.nameGroup' })} />
      </Form.Item>
      <Form.Item
        label={formatMessage({ id: 'common.area' })}
        name="section"
        rules={[{ required: true }]}
      >
        <Select placeholder={formatMessage({ id: 'group.selectArea' })}>
          {FAKE_DATA.sectionList.items.map((section) => {
            return (
              <Select.Option value={section.id} key={section.id}>
                {section.name}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item
        label={formatMessage({ id: 'common.deviceType' })}
        name="category"
        rules={[{ required: typeModal === 'lighting' ? true : false }]}
        initialValue={
          typeModal === 'normal' ? 'switch' : initialValues ? initialValues.category : undefined
        }
      >
        {typeModal === 'lighting' ? (
          <Select placeholder={formatMessage({ id: 'group.selectTypeDevice' })}>
            <Select.Option value="dimmer">Dimmer</Select.Option>
            <Select.Option value="rgb">RGB</Select.Option>
            <Select.Option value="ww">WW</Select.Option>
            <Select.Option value="switch">Switch</Select.Option>
          </Select>
        ) : (
          <Select
            labelRender={() => (
              <Typography.Text style={{ color: thme.token.colorBorder }}>Switch</Typography.Text>
            )}
            title="Switch"
            disabled
          />
        )}
      </Form.Item>

      <Form.Item label="Icon" name="icon">
        <Space wrap>
          {ListIconVariant.map((icon) => (
            <Button
              key={`icon-${icon}`}
              style={{
                border:
                  selectedIcon === icon
                    ? `1px solid ${thme.token.colorPrimary}`
                    : `1px solid transparent`,
                background: 'transparent',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onClick={() => {
                form.setFieldValue('icon', icon);
                setSelectedIcon(icon);
              }}
            >
              <SvgIcon name={icon} className="text-2xl mb-1" />
            </Button>
          ))}
        </Space>
      </Form.Item>
    </Form>
  );
};

interface GroupFormModalProps {
  open: boolean;
  onCreate: (values: IGroupDevices) => void;
  onCancel: () => void;
  initialValues?: IGroupDevices;
  selectedIcon?: IconVariant;
  setSelectedIcon: React.Dispatch<React.SetStateAction<IconVariant>>;
  typeModal?: 'normal' | 'lighting';
}

const GroupFormModal: React.FC<GroupFormModalProps> = ({
  open,
  onCreate,
  onCancel,
  initialValues,
  selectedIcon,
  setSelectedIcon,
  typeModal,
}) => {
  const { formatMessage } = useLocale();

  const [formInstance, setFormInstance] = useState<FormInstance>();

  return (
    <Modal
      open={open}
      title={`${
        typeModal === 'normal'
          ? formatMessage({ id: 'group.addGroupNormal' })
          : formatMessage({ id: 'group.addGroupLighting' })
      }`}
      okText={formatMessage({ id: 'manageAccount.save' })}
      cancelText={formatMessage({ id: 'group.cancel' })}
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
      <GroupForm
        initialValues={initialValues}
        onFormInstanceReady={(instance) => {
          setFormInstance(instance);
        }}
        selectedIcon={selectedIcon}
        setSelectedIcon={setSelectedIcon}
        typeModal={typeModal}
      />
    </Modal>
  );
};

export default GroupFormModal;
