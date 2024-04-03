import LayoutSpin from '@/components/LayoutSpin';
import { useLocale } from '@/locales';
import { AppDefault } from '@/utils/constant';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import type { InputProps, TreeProps } from 'antd';
import { Button, Col, Input, Layout, Tree, theme } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const { Sider, Content } = Layout;
const { Search } = Input;

interface TreeAnchorTwoProps {
  children: React.ReactNode;
  treeProps?: TreeProps;
  title?: React.ReactNode;
  loading?: {
    content?: boolean;
    tree?: boolean;
  };
  inputProps?: InputProps;
}

const TreeAnchorTwo = ({ children, treeProps, title, loading, inputProps }: TreeAnchorTwoProps) => {
  const { token } = theme.useToken();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const hash = window.location.hash.slice(1);
  const { onSelect, ...rest } = treeProps || {};
  const { onChange } = inputProps || {};
  const onDefaultSelect: TreeProps['onSelect'] = (selectedKeys) => {
    navigate(`#${selectedKeys[0]}`);
  };
  const { formatMessage } = useLocale();

  return (
    <Layout>
      <Sider
        className="sidebar"
        breakpoint="lg"
        collapsedWidth="55"
        width={230}
        theme="light"
        collapsed={collapsed}
        trigger={null}
        collapsible
        css={{
          backgroundColor: token.colorBgContainer,
          borderRight: `1px solid ${token.colorBorder}`,
          height: AppDefault.height,
        }}
      >
        {!!loading?.tree && loading.tree ? (
          <div className="h-full w-full relative">
            <LayoutSpin position="absolute" />
          </div>
        ) : (
          <>
            {!collapsed && (
              <Search
                style={{ marginBottom: 8, paddingRight: 16, paddingLeft: 16, paddingTop: 16 }}
                placeholder={formatMessage({ id: 'common.search' })}
                onChange={onChange}
                allowClear
              />
            )}
            {title}
            {!collapsed && (
              <Tree
                style={{ marginTop: 8, minHeight: 'calc(100vh - 206px)' }}
                defaultSelectedKeys={[hash]}
                defaultExpandAll
                onSelect={onSelect || onDefaultSelect}
                {...rest}
              />
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
        />
      </Sider>
      <Content>
        <Col
          style={{
            height: AppDefault.height,
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

export default TreeAnchorTwo;
