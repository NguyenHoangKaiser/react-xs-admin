import { getBreadcrumbArr } from '@/router/utils';
import { Breadcrumb, Col, Row, Typography } from 'antd';
import { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useMenuList } from '../Sidebar/hooks/useMenuList';

function itemRender(route: any, params: any, routes: any, _paths: any) {
  const last = routes.indexOf(route) === routes.length - 1;
  return last ? (
    <Typography.Text>{route.title}</Typography.Text>
  ) : (
    <Link to={route.path}>{route.title}</Link>
  );
}

const Bread = memo(() => {
  const { pathname } = useLocation();
  const { menuList } = useMenuList();
  const parentPathArr = getBreadcrumbArr(pathname, menuList);
  console.log('parentPathArr', parentPathArr[parentPathArr.length - 1].title);
  return (
    <Row
      style={{
        paddingLeft: 24,
        height: 84,
        backgroundColor: '#fff',
        zIndex: 5,
      }}
      align={'middle'}
    >
      <Col>
        <Breadcrumb style={{ marginBottom: 4 }} items={parentPathArr} itemRender={itemRender} />
        <Typography.Title level={4} style={{ margin: 0 }}>
          {parentPathArr[parentPathArr.length - 1].title}
        </Typography.Title>
      </Col>
    </Row>
  );
});

export default Bread;
