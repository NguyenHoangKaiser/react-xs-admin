import LayoutSpin from '@/components/LayoutSpin';
import { defaultDimension } from '@/utils/constant';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import type { ButtonProps, SiderProps, TreeProps } from 'antd';
import { Button, Col, Layout, Tree, theme } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const { Sider, Content } = Layout;

interface TreeAnchorProps {
  children: React.ReactNode;
  treeProps?: TreeProps;
  siderProps?: SiderProps;
  buttonProps?: ButtonProps;
  title?: React.ReactNode;
  loading?: {
    content?: boolean;
    tree?: boolean;
  };
}

const TreeAnchor = ({
  children,
  treeProps,
  siderProps,
  buttonProps,
  title,
  loading,
}: TreeAnchorProps) => {
  const { token } = theme.useToken();
  const navigate = useNavigate();
  const location = useLocation();
  const lastHash = useRef('');
  const [collapsed, setCollapsed] = useState(false);

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
    <Layout>
      <Sider
        className="sidebar"
        breakpoint="lg"
        collapsedWidth="55"
        width={230}
        theme="light"
        collapsed={collapsed}
        onBreakpoint={(broken) => {
          if (broken) setCollapsed(true);
          else setCollapsed(false);
        }}
        trigger={null}
        collapsible
        style={{
          backgroundColor: token.colorBgContainer,
          borderRight: `1px solid ${token.colorBorder}`,
          height: defaultDimension.height,
        }}
        {...siderProps}
      >
        {!collapsed && (
          <>
            {!!loading?.tree && loading.tree ? (
              <div className="h-full w-full relative">
                <LayoutSpin position="absolute" />
              </div>
            ) : (
              <>
                {title}
                <Tree
                  style={{ marginTop: 8 }}
                  defaultSelectedKeys={[hash]}
                  defaultExpandAll
                  onSelect={onSelect || onDefaultSelect}
                  {...rest}
                />
              </>
            )}
          </>
        )}
        <Button
          style={{
            position: 'absolute',
            bottom: 0,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            borderTop: `1px solid ${token.colorBorder}`,
          }}
          block
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          {...buttonProps}
        />
      </Sider>
      <Content>
        <Col
          style={{
            height: defaultDimension.height,
            overflowY: 'auto',
            position: 'initial',
          }}
        >
          {!!loading?.content && loading.content ? (
            <div className="h-full w-full relative">
              <LayoutSpin position="absolute" />
            </div>
          ) : (
            <>{children}</>
          )}
        </Col>
      </Content>
    </Layout>
  );
};

export default TreeAnchor;
