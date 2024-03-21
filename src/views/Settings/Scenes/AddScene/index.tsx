import { DownOutlined } from '@ant-design/icons';
import type { CSSObject } from '@emotion/react';
import type { GlobalToken, MenuProps } from 'antd';
import { Card, Col, Dropdown, Row, Space, Typography, theme } from 'antd';
import type { ReactNode } from 'react';
import { useState } from 'react';
import ChainLink from '../components/ChainLink';
const gridStyle: React.CSSProperties = {
  width: '100%',
  padding: 0,
  minHeight: 100,
};

const onClick: MenuProps['onClick'] = ({ key }) => {
  console.log('key', key);
};

const dropItems: MenuProps['items'] = [
  {
    label: '1st menu item',
    key: '1',
  },
  {
    label: '2nd menu item',
    key: '2',
  },
  {
    label: '3rd menu item',
    key: '3',
  },
];

const CardContent = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Card
        styles={{
          body: {
            padding: 12,
            // display: 'flex',
            // justifyContent: 'center',
            // alignItems: 'center',
          },
        }}
        style={gridStyle}
      >
        {children}
      </Card>
      <div className="pl-[100px]">
        <ChainLink />
      </div>
    </>
  );
};

export default () => {
  const { token } = theme.useToken();
  const [activeCol, setActiveCol] = useState<number | null>(null);
  // const location = useLocation();
  // const state = location.state as AddSceneFormType | null;
  // const navigate = useNavigate();

  return (
    <div css={getDivCss(token, activeCol)}>
      <Row>
        <h1>Header</h1>
      </Row>
      <Row style={{ height: '100%' }}>
        <Col span={7} offset={1}>
          <div
            onMouseEnter={() => {
              setActiveCol(1);
            }}
            onMouseLeave={() => {
              setActiveCol(null);
            }}
            className="condition-container"
          >
            <div className="condition-dropdown">
              <Dropdown trigger={['click']} menu={{ items: dropItems, onClick }}>
                <Typography.Text style={{ cursor: 'pointer' }} type="success">
                  <Space>
                    ALL OF THESE ARE TRUE
                    <DownOutlined />
                  </Space>
                </Typography.Text>
              </Dropdown>
            </div>
            <CardContent>
              <Dropdown menu={{ items }} trigger={['click']}>
                <div
                  style={{
                    color: token.colorTextTertiary,
                    border: `2px dashed ${token.colorBorder}`,
                    height: 50,
                    textAlign: 'center',
                    lineHeight: '50px',
                  }}
                >
                  Click on here
                </div>
              </Dropdown>
            </CardContent>
          </div>
        </Col>
        <Col span={7} offset={1}>
          <div
            onMouseEnter={() => {
              setActiveCol(2);
            }}
            onMouseLeave={() => {
              setActiveCol(null);
            }}
            className="action-container"
          >
            <CardContent>
              <Dropdown menu={{ items }} trigger={['click']}>
                <div
                  style={{
                    color: token.colorTextTertiary,
                    border: `2px dashed ${token.colorBorder}`,
                    height: 50,
                    textAlign: 'center',
                    lineHeight: '50px',
                  }}
                >
                  Click on here
                </div>
              </Dropdown>
            </CardContent>
          </div>
        </Col>
      </Row>
    </div>
  );
};

const items: MenuProps['items'] = [
  {
    label: 'Device',
    key: 'Device',
  },
  {
    label: 'Time',
    key: 'Time',
  },
];

const getDivCss = (token: GlobalToken, active?: number | null): CSSObject => {
  const conditionBorderColor = active === 1 ? token.colorPrimaryBorder : token.colorBorder;
  const actionBorderColor = active === 2 ? token.colorPrimaryBorder : token.colorBorder;
  return {
    // '&': {
    //   display: 'block',
    //   position: 'relative',
    //   borderLeft: bol ? `34px solid ${token.colorSuccess}` : 'none',
    //   paddingLeft: bol ? 34 : 0,
    // },
    '& .condition-container': {
      position: 'relative',
      border: `2px solid ${conditionBorderColor}`,
      padding: token.padding,
      paddingTop: 49,
      borderTopLeftRadius: token.borderRadiusLG,
      borderBottomLeftRadius: token.borderRadiusLG,
    },
    '& .condition-dropdown': {
      position: 'absolute',
      top: 0,
      left: 0,
      padding: '4px 10px',
      borderRight: `2px solid ${conditionBorderColor}`,
      borderBottom: `2px solid ${conditionBorderColor}`,
      borderBottomRightRadius: token.borderRadiusLG,
    },
    '& .action-container': {
      border: `2px solid ${actionBorderColor}`,
      padding: token.padding,
      borderTopRightRadius: token.borderRadiusLG,
      borderBottomRightRadius: token.borderRadiusLG,
    },
  };
};
