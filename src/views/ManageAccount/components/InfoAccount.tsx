import { useLocale } from '@/locales';
import type { IUserInfo } from '@/server/apiTypes';
import { Button, Col, Flex, Form, Image, Input, Row, Space, Typography } from 'antd';
import { memo, useState } from 'react';

const formLayout = {
  labelCol: {
    xs: 24,
    md: 24,
    lg: 6,
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

const InfoAccount = memo(({ userInfo }: { userInfo?: IUserInfo }) => {
  const { formatMessage } = useLocale();
  const [disabled, setDisabled] = useState(true);

  return (
    <div className="flex-1 pr-4">
      <Form layout="horizontal" {...formLayout} labelAlign="left">
        <Row style={{ display: 'flex', alignItems: 'center' }}>
          <Col span={18}>
            <Typography.Text className="text-2xl font-semibold">
              {formatMessage({ id: 'manageAccount.info' })}
            </Typography.Text>
          </Col>
          <Col span={6}>
            <Flex justify="flex-end" align="center">
              <Form.Item wrapperCol={{ span: 24 }} style={{ marginBottom: 0 }}>
                <Space>
                  {!disabled ? (
                    <Button
                      onClick={() => {
                        setDisabled(true);
                      }}
                    >
                      {formatMessage({ id: 'common.cancel' })}
                    </Button>
                  ) : (
                    <Button
                      disabled={!disabled}
                      onClick={() => {
                        setDisabled(false);
                      }}
                    >
                      {formatMessage({ id: 'manageAccount.edit' })}
                    </Button>
                  )}
                  <Button
                    disabled={disabled}
                    type="primary"
                    htmlType="submit"
                    onClick={() => {
                      setDisabled(true);
                    }}
                  >
                    {formatMessage({ id: 'manageAccount.save' })}
                  </Button>
                </Space>
              </Form.Item>
            </Flex>
          </Col>
        </Row>

        <Row style={{ marginTop: 24 }}>
          <Col
            xxl={{ span: 12, order: 1 }}
            xl={{ span: 12, order: 1 }}
            lg={{ span: 12, order: 1 }}
            md={{ span: 24, order: 2 }}
          >
            <Form.Item
              label={formatMessage({ id: 'manageAccount.fullName' })}
              labelCol={{ xxl: 8, xl: 8, lg: 10, md: 8 }}
              wrapperCol={{ xxl: 16, xl: 16, lg: 14, md: 14 }}
            >
              <Input value={userInfo?.name} disabled={disabled} />
            </Form.Item>
            <Form.Item
              label="Email"
              labelCol={{ xxl: 8, xl: 8, lg: 10, md: 8 }}
              wrapperCol={{ xxl: 16, xl: 16, lg: 14, md: 14 }}
            >
              <Input value={userInfo?.email} disabled={disabled} />
            </Form.Item>
            <Form.Item
              label={formatMessage({ id: 'manageAccount.phone' })}
              labelCol={{ xxl: 8, xl: 8, lg: 10, md: 8 }}
              wrapperCol={{ xxl: 16, xl: 16, lg: 14, md: 14 }}
            >
              <Input value={userInfo?.phone} disabled={disabled} />
            </Form.Item>
            <Form.Item
              label={formatMessage({ id: 'manageAccount.authGroup' })}
              labelCol={{ xxl: 8, xl: 8, lg: 10, md: 8 }}
              wrapperCol={{ xxl: 16, xl: 16, lg: 14, md: 14 }}
            >
              <Input value={userInfo?.current_role_name} disabled={disabled} />
            </Form.Item>
          </Col>
          <Col
            xxl={{ span: 11, order: 2, offset: 1 }}
            xl={{ span: 11, order: 2, offset: 1 }}
            lg={{ span: 11, order: 2, offset: 1 }}
            md={{ span: 24, order: 1 }}
            style={{ paddingBottom: 32 }}
          >
            <Flex align="center" justify="center">
              <Image
                width={200}
                height={200}
                src="error"
                fallback="data:image/png;base64,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"
              />
            </Flex>
          </Col>
        </Row>
      </Form>
    </div>
  );
});

export default InfoAccount;
