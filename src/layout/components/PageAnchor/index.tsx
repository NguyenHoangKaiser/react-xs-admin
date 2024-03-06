import { Anchor, Col, Row } from 'antd';
import type { AnchorProps } from 'antd/lib';

interface PageAnchorProps {
  children: React.ReactNode;
  anchorProps?: AnchorProps;
}

const PageAnchor: React.FC<PageAnchorProps> = ({ children, anchorProps }) => {
  const { getContainer, ...rest } = anchorProps || {};
  return (
    <Row>
      <Col span={3}>
        <Anchor
          getContainer={
            getContainer || (() => document.getElementById('anchor-container') as HTMLElement)
          }
          {...rest}
        />
      </Col>
      <Col
        style={{
          height: 'calc(100vh - 110px)',
          overflowY: 'auto',
        }}
        span={21}
        id="anchor-container"
      >
        {children}
      </Col>
    </Row>
  );
};

export default PageAnchor;
