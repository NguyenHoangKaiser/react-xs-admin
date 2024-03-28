import { EConditionsTypeName } from '@/utils/constant';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Col, Dropdown, Row, Space, theme, Typography } from 'antd';
import { memo } from 'react';
import type { ISceneRule } from '../scene';
import ActionCard from './ActionCard';
import { CardContent } from './ChainLink';
import ConditionCard from './ConditionCard';

const typeDrop: MenuProps['items'] = [
  {
    label: 'Device',
    key: 'device',
  },
  {
    label: 'Time',
    key: 'time',
  },
];

const dropItems: MenuProps['items'] = [
  {
    label: 'ALL OF THESE ARE TRUE',
    key: '1',
  },
  {
    label: 'ANY OF THESE ARE TRUE',
    key: '2',
  },
];

interface SceneRenderProps {
  scene: ISceneRule;
  onClickConditionTypeDrop: MenuProps['onClick'];
  onClickActionTypeDrop: MenuProps['onClick'];
  onClick: MenuProps['onClick'];
  mode: 'add' | 'edit';
}

const SceneRender = memo((props: SceneRenderProps) => {
  const { scene, onClickConditionTypeDrop, onClickActionTypeDrop, onClick, mode } = props;
  const { conditions, actions } = scene;
  const { token } = theme.useToken();
  console.log('SceneRender');
  return (
    <Row style={{ height: '100%', paddingBottom: 24 }}>
      <Col span={7} offset={1}>
        <div className="condition-container">
          <div className="condition-dropdown">
            <Dropdown
              trigger={['click']}
              menu={{
                items: dropItems,
                onClick,
                selectedKeys: [conditions.type.name.toString()],
              }}
            >
              <Typography.Text style={{ cursor: 'pointer', color: token.blue }}>
                <Space>
                  {conditions.type.name === EConditionsTypeName.All
                    ? 'ALL OF THESE ARE TRUE'
                    : 'ANY OF THESE ARE TRUE'}
                  <DownOutlined />
                </Space>
              </Typography.Text>
            </Dropdown>
          </div>
          {conditions.data.map((condition, index) => {
            return (
              <CardContent type={conditions.type.name} key={`condition-${condition.created}`}>
                <ConditionCard mode={mode} condition={condition} index={index} />
              </CardContent>
            );
          })}
          <CardContent hideChain={conditions.data.length > 0} type={conditions.type.name}>
            <Dropdown
              menu={{ items: typeDrop, onClick: onClickConditionTypeDrop }}
              trigger={['click']}
            >
              <div
                style={{
                  color: token.colorTextTertiary,
                  border: `2px dashed ${token.colorBorder}`,
                  height: 80,
                  textAlign: 'center',
                  lineHeight: '80px',
                }}
              >
                Click to add Condition
              </div>
            </Dropdown>
          </CardContent>
        </div>
      </Col>
      <Col span={7} offset={1}>
        <div className="action-container">
          {actions.data.map((action, index) => {
            return (
              <CardContent type={conditions.type.name} key={`action-${action.created}`}>
                <ActionCard mode={mode} action={action} index={index} />
              </CardContent>
            );
          })}
          <CardContent>
            <Dropdown
              menu={{ items: typeDrop, onClick: onClickActionTypeDrop }}
              trigger={['click']}
            >
              <div
                style={{
                  color: token.colorTextTertiary,
                  border: `2px dashed ${token.colorBorder}`,
                  height: 80,
                  textAlign: 'center',
                  lineHeight: '80px',
                }}
              >
                Click to add Action
              </div>
            </Dropdown>
          </CardContent>
        </div>
      </Col>
    </Row>
  );
});

export default SceneRender;
