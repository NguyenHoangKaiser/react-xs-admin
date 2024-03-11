import { Col, Row, theme } from 'antd';

interface RawPageProps {
  children: React.ReactNode;
  side: React.ReactNode;
}

const RawPage = ({ children, side }: RawPageProps) => {
  const { token } = theme.useToken();
  return (
    <Row>
      <Col
        span={3}
        style={{
          borderRight: `1px solid ${token.colorBorder}`,
          position: 'sticky',
          top: 0,
          height: 'calc(100vh - 110px)',
          overflow: 'auto',
        }}
      >
        {side}
      </Col>
      <Col span={21}>{children}</Col>
    </Row>
  );
};

export default RawPage;
