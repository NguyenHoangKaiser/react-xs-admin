import { useLocale } from '@/locales';
import type { IUserInfo } from '@/server/apiTypes';
import { Col, Form, Input, Row } from 'antd';
import { memo } from 'react';

const InfoAccount = memo(({ userInfo }: { userInfo: IUserInfo | undefined }) => {
  const { formatMessage } = useLocale();

  return (
    <div className="flex-1">
      <span className="text-2xl font-semibold">{formatMessage({ id: 'manageAccount.info' })}</span>
      <Row className="mt-8">
        <Col span={16}>
          <Form
            layout="horizontal"
            labelCol={{ xs: 6, xl: 4 }}
            wrapperCol={{ span: 10, offset: 2 }}
            labelAlign="left"
          >
            <Form.Item label={formatMessage({ id: 'manageAccount.fullName' })}>
              <Input value={userInfo?.name} disabled />
            </Form.Item>
            <Form.Item label="Email">
              <Input value={userInfo?.email} disabled />
            </Form.Item>
            <Form.Item label={formatMessage({ id: 'manageAccount.phone' })}>
              <Input value={userInfo?.phone} disabled />
            </Form.Item>
            <Form.Item label={formatMessage({ id: 'manageAccount.authGroup' })}>
              <Input value={userInfo?.current_role_name} disabled />
            </Form.Item>
          </Form>
        </Col>
        <Col span={8} className="flex items-center justify-center">
          {/* avatar */}
          Avatar here
        </Col>
      </Row>
    </div>
  );
});

export default InfoAccount;
