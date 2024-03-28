import { useLocale } from '@/locales';
import type { IUserInfo } from '@/server/apiTypes';
import type { FieldType } from '@/utils/constant';
import { Button, Col, Form, Input, Row } from 'antd';
import { memo, useState } from 'react';

const InfoAccount = memo(({ userInfo }: { userInfo: IUserInfo | undefined }) => {
  const { formatMessage } = useLocale();
  const [disabled, setDisabled] = useState(true);

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
            <Form.Item<FieldType> wrapperCol={{ offset: 6, span: 10 }}>
              <Button
                disabled={!disabled}
                onClick={() => {
                  setDisabled(false);
                }}
                className="mr-2"
              >
                Edit
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                onClick={() => {
                  setDisabled(true);
                }}
              >
                Save
              </Button>
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
