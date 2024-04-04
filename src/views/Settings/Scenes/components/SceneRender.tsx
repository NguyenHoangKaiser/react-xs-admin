import { EConditionsTypeName } from '@/utils/constant';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Col, Dropdown, Row, Space, theme, Typography } from 'antd';
import { forwardRef, memo } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import type { ITourRef } from '../AddScene';
import type { ISceneRule } from '../scene';
import ActionCard from './ActionCard';
import { CardContent } from './ChainLink';
import ConditionCard from './ConditionCard';

interface SceneRenderProps {
  scene: ISceneRule;
  onClickConditionTypeDrop?: MenuProps['onClick'];
  onClickActionTypeDrop?: MenuProps['onClick'];
  onClick?: MenuProps['onClick'];
  mode: 'add' | 'edit';
  viewOnly?: boolean;
}

const ColLayout = {
  xs: {
    span: 19,
    offset: 1,
  },
  lg: {
    span: 18,
    offset: 1,
  },
  xl: {
    span: 10,
    offset: 1,
  },
  xxl: {
    span: 7,
    offset: 1,
  },
};

const Render = forwardRef<ITourRef, SceneRenderProps>((props, ref) => {
  const {
    scene,
    onClickConditionTypeDrop,
    onClickActionTypeDrop,
    onClick,
    mode,
    viewOnly = false,
  } = props;
  if (!ref || !('current' in ref) || !ref.current) {
    throw new Error('ref is required');
  }
  const { ref1, ref2, ref3 } = ref.current;
  const { conditions, actions } = scene;
  const { formatMessage } = useIntl();
  const { token } = theme.useToken();

  const dropItems: MenuProps['items'] = [
    {
      label: <FormattedMessage id="common.scene.ALL" />,
      key: '1',
    },
    {
      label: <FormattedMessage id="common.scene.ANY" />,
      key: '2',
    },
  ];

  const typeDrop: MenuProps['items'] = [
    {
      label: <FormattedMessage id="common.device" />,
      key: 'device',
    },
    {
      label: <FormattedMessage id="common.time" />,
      key: 'time',
    },
  ];

  return (
    <Row style={{ height: '100%', paddingBottom: 24 }}>
      <Col {...ColLayout} style={{ marginBottom: 18 }}>
        <div ref={ref1} className="condition-container">
          <div ref={ref2} className="condition-dropdown">
            <Dropdown
              trigger={['click']}
              disabled={viewOnly}
              menu={{
                items: dropItems,
                onClick,
                selectedKeys: [conditions.type.name.toString()],
              }}
            >
              <Typography.Text
                style={{ cursor: viewOnly ? 'default' : 'pointer', color: token.blue }}
              >
                <Space>
                  {conditions.type.name === EConditionsTypeName.All
                    ? formatMessage({ id: 'common.scene.ALL' })
                    : formatMessage({ id: 'common.scene.ANY' })}
                  {viewOnly ? null : <DownOutlined />}
                </Space>
              </Typography.Text>
            </Dropdown>
          </div>
          {conditions.data.map((condition, index) => {
            return (
              <CardContent
                hideChain={
                  viewOnly && conditions.data.length > 0 && index === conditions.data.length - 1
                }
                type={conditions.type.name}
                key={`condition-${condition.created}`}
              >
                <ConditionCard
                  viewOnly={viewOnly}
                  mode={mode}
                  condition={condition}
                  index={index}
                />
              </CardContent>
            );
          })}
          {!viewOnly && (
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
                  <FormattedMessage id="common.scene.clickCondition" />
                </div>
              </Dropdown>
            </CardContent>
          )}
        </div>
      </Col>
      <Col {...ColLayout}>
        <div ref={ref3} className="action-container">
          <div className="action-dropdown">
            <Typography.Text style={{ color: token.blue }}>
              <FormattedMessage id="common.scene.DO" />
            </Typography.Text>
          </div>
          {actions.data.map((action, index) => {
            return (
              <CardContent
                hideChain={viewOnly && actions.data.length > 0 && index === actions.data.length - 1}
                key={`action-${action.created}`}
              >
                <ActionCard viewOnly={viewOnly} mode={mode} action={action} index={index} />
              </CardContent>
            );
          })}
          {!viewOnly && (
            <CardContent>
              <Dropdown
                disabled={viewOnly}
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
                  <FormattedMessage id="common.scene.clickAction" />
                </div>
              </Dropdown>
            </CardContent>
          )}
        </div>
      </Col>
    </Row>
  );
});

const SceneRender = memo(Render);

export default SceneRender;
