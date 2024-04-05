import { useLocale } from '@/locales';
import { Button, Col, Flex, Form, Input, Row, Typography } from 'antd';
import { memo } from 'react';
import { FormattedMessage } from 'react-intl';

interface FieldType {
  oldPassword: string;
  newPassword: string;
  reNewPassword: string;
}

const formLayout = {
  labelCol: {
    xs: 24,
    md: 24,
    lg: 8,
    xl: 6,
    xxl: 4,
  },
  wrapperCol: {
    xs: 20,
    md: 20,
    lg: 12,
    xl: 12,
    xxl: 8,
  },
};

const ChangePassword = memo(() => {
  const { formatMessage } = useLocale();

  const onFinish = (values: FieldType) => {
    console.log('Success:', values);
  };

  return (
    <div className="flex-1">
      <Form layout="horizontal" {...formLayout} labelAlign="left" onFinish={onFinish}>
        <Row>
          <Col span={18}>
            <Typography.Text className="text-2xl font-semibold">
              {formatMessage({ id: 'manageAccount.changePassword' })}
            </Typography.Text>
          </Col>
          <Col span={6}>
            <Flex justify="flex-end" style={{ paddingRight: 16 }}>
              <Form.Item<FieldType>>
                <Button type="primary" htmlType="submit">
                  {formatMessage({ id: 'manageAccount.save' })}
                </Button>
              </Form.Item>
            </Flex>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item<FieldType>
              name="oldPassword"
              label={formatMessage({ id: 'manageAccount.oldPassword' })}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="common.errorEmpty"
                      values={{ label: <FormattedMessage id="manageAccount.oldPassword" /> }}
                    />
                  ),
                },
              ]}
              colon
            >
              <Input />
            </Form.Item>
            <Form.Item<FieldType>
              name="newPassword"
              label={formatMessage({ id: 'manageAccount.newPassword' })}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="common.errorEmpty"
                      values={{ label: <FormattedMessage id="manageAccount.newPassword" /> }}
                    />
                  ),
                },
              ]}
              colon
            >
              <Input />
            </Form.Item>
            <Form.Item<FieldType>
              name="reNewPassword"
              label={formatMessage({ id: 'manageAccount.reNewPassword' })}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="common.errorEmpty"
                      values={{ label: <FormattedMessage id="manageAccount.reNewPassword" /> }}
                    />
                  ),
                },
              ]}
              colon
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
});

export default ChangePassword;
