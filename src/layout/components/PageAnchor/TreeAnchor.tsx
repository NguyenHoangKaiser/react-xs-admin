import type { TreeProps } from 'antd';
import { Col, Row, Tree, theme } from 'antd';
import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface TreeAnchorProps {
  children: React.ReactNode;
  treeProps?: TreeProps;
  title?: React.ReactNode;
}

const TreeAnchor = ({ children, treeProps, title }: TreeAnchorProps) => {
  const { token } = theme.useToken();
  const navigate = useNavigate();
  const location = useLocation();
  const lastHash = useRef('');

  // listen to location change using useEffect with location as dependency
  // https://jasonwatmore.com/react-router-v6-listen-to-location-route-change-without-history-listen
  useEffect(() => {
    if (location.hash) {
      lastHash.current = location.hash.slice(1); // safe hash for further use after navigation
    }

    if (lastHash.current && document.getElementById(lastHash.current)) {
      setTimeout(() => {
        document
          .getElementById(lastHash.current)
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        lastHash.current = '';
      }, 100);
    }
  }, [location]);

  const hash = window.location.hash.slice(1);
  const { onSelect, ...rest } = treeProps || {};
  const onDefaultSelect: TreeProps['onSelect'] = (selectedKeys) => {
    navigate(`#${selectedKeys[0]}`);
  };
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
        {title}
        <Tree
          style={{ marginTop: 8 }}
          defaultSelectedKeys={[hash]}
          defaultExpandAll
          onSelect={onSelect || onDefaultSelect}
          {...rest}
        />
      </Col>
      <Col
        style={{
          height: 'calc(100vh - 110px)',
          overflowY: 'auto',
        }}
        span={21}
      >
        {children}
      </Col>
    </Row>
  );
};

export default TreeAnchor;
