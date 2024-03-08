import { Anchor, Col, ConfigProvider, Row, theme } from 'antd';
import type { AnchorProps } from 'antd/lib';

interface PageAnchorProps {
  children: React.ReactNode;
  anchorProps?: AnchorProps;
}

const handleClick = (
  e: React.MouseEvent<HTMLElement>,
  link: {
    title: React.ReactNode;
    href: string;
  },
) => {
  e.preventDefault();
  console.log(link);
};

/**
 * Page wrapper with anchor on the left
 * @param anchorProps all props of antd Anchor
 * @param children  content of page
 */
const PageAnchor: React.FC<PageAnchorProps> = ({ children, anchorProps }) => {
  const { token } = theme.useToken();
  const { getContainer, onClick, ...rest } = anchorProps || {};
  return (
    <Row>
      <Col
        span={3}
        style={{
          borderRight: `1px solid ${token.colorBorder}`,
        }}
      >
        <ConfigProvider
          theme={{
            token: {
              colorSplit: token.colorBgContainer,
            },
          }}
        >
          <Anchor
            getContainer={
              getContainer || (() => document.getElementById('anchor-container') as HTMLElement)
            }
            replace
            onClick={onClick || handleClick}
            {...rest}
          />
        </ConfigProvider>
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
