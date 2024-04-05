import { useLocale } from '@/locales';
import type { IUserInfo } from '@/server/apiTypes';
import { Button, Col, Flex, Form, Input, Row, Typography } from 'antd';
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
    <div className="flex-1">
      <Form layout="horizontal" {...formLayout} labelAlign="left">
        <Row style={{ display: 'flex', alignItems: 'center' }}>
          <Col span={18}>
            <Typography.Text className="text-2xl font-semibold">
              {formatMessage({ id: 'manageAccount.info' })}
            </Typography.Text>
          </Col>
          <Col span={6}>
            <Flex justify="flex-end" align="center" style={{ paddingRight: 16 }}>
              <Form.Item wrapperCol={{ span: 24 }} style={{ marginBottom: 0 }}>
                {!disabled ? (
                  <Button
                    onClick={() => {
                      setDisabled(true);
                    }}
                    className="mr-2"
                  >
                    {formatMessage({ id: 'common.cancel' })}
                  </Button>
                ) : (
                  <Button
                    disabled={!disabled}
                    onClick={() => {
                      setDisabled(false);
                    }}
                    className="mr-2"
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
              </Form.Item>
            </Flex>
          </Col>
        </Row>

        <Row style={{ marginTop: 24 }}>
          <Col span={24}>
            <Form.Item label={formatMessage({ id: 'manageAccount.fullName' })}>
              <Input value={userInfo?.name} disabled={disabled} />
            </Form.Item>
            <Form.Item label="Email">
              <Input value={userInfo?.email} disabled={disabled} />
            </Form.Item>
            <Form.Item label={formatMessage({ id: 'manageAccount.phone' })}>
              <Input value={userInfo?.phone} disabled={disabled} />
            </Form.Item>
            <Form.Item label={formatMessage({ id: 'manageAccount.authGroup' })}>
              <Input value={userInfo?.current_role_name} disabled={disabled} />
            </Form.Item>
          </Col>
          {/* <Col span={8} className="flex items-center justify-center">
          Avatar here
        </Col> */}
        </Row>
      </Form>
    </div>
  );
});

export default InfoAccount;
