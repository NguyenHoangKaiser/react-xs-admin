import { useLocale } from '@/locales';
import { Button, Col, Form, Input, Row } from 'antd';
import { memo } from 'react';

interface FieldType {
  oldPassword: string;
  newPassword: string;
  reNewPassword: string;
}

const ChangePassword = memo(() => {
  const { formatMessage } = useLocale();

  const onFinish = (values: FieldType) => {
    console.log('Success:', values);
  };

  return (
    <div className="flex-1">
      <span className="text-2xl font-semibold">
        {formatMessage({ id: 'manageAccount.changePassword' })}
      </span>
      <Row className="mt-8">
        <Col span={24}>
          <Form
            layout="horizontal"
            labelCol={{ xs: 8, xl: 6, xxl: 4 }}
            wrapperCol={{ span: 8 }}
            labelAlign="left"
            onFinish={() => onFinish}
          >
            <Form.Item<FieldType>
              name="oldPassword"
              label={formatMessage({ id: 'manageAccount.oldPassword' })}
              rules={[{ required: true, message: 'Please input your password!' }]}
              colon
            >
              <Input />
            </Form.Item>
            <Form.Item<FieldType>
              name="newPassword"
              label={formatMessage({ id: 'manageAccount.newPassword' })}
              rules={[{ required: true, message: 'Please input your password!' }]}
              colon
            >
              <Input />
            </Form.Item>
            <Form.Item<FieldType>
              name="reNewPassword"
              label={formatMessage({ id: 'manageAccount.reNewPassword' })}
              rules={[{ required: true, message: 'Please input your password!' }]}
              colon
            >
              <Input />
            </Form.Item>
            <Form.Item<FieldType> wrapperCol={{ offset: 4, span: 10 }}>
              <Button type="primary" htmlType="submit">
                {formatMessage({ id: 'manageAccount.save' })}
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
});

export default ChangePassword;
