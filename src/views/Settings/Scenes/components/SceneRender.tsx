import { useAppDispatch } from '@/store/hooks';
import { setSortActionData, setSortConditionData } from '@/store/modules/scene';
import { EConditionsTypeName } from '@/utils/constant';
import { DownOutlined } from '@ant-design/icons';
import type { DragEndEvent } from '@dnd-kit/core';
import { DndContext, PointerSensor, closestCenter, useSensor } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import type { MenuProps } from 'antd';
import { Col, Dropdown, Row, Space, Typography, theme } from 'antd';
import { forwardRef, memo, useCallback } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import type { ITourRef } from '../AddScene';
import type { ISceneAction, ISceneCondition, ISceneRule } from '../scene';
import ActionCard from './ActionCard';
import { CardContent, DraggableCardContent } from './ChainLink';
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

  const dispatch = useAppDispatch();

  let re1 = null;
  let re2 = null;
  let re3 = null;

  if (ref && 'current' in ref && ref.current) {
    re1 = ref.current.ref1;
    re2 = ref.current.ref2;
    re3 = ref.current.ref3;
  }

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

  const onDragEndConditions = useCallback(
    ({ active, over }: DragEndEvent) => {
      if (active.id !== over?.id) {
        const activeIndex = conditions.data.findIndex((i) => i.created === active.id);
        const overIndex = conditions.data.findIndex((i) => i.created === over?.id);
        const newArr = arrayMove(conditions.data, activeIndex, overIndex);
        dispatch(setSortConditionData({ data: newArr, for: mode }));
        return;
      }
    },
    [conditions.data, dispatch, mode],
  );

  const onDragEndActions = useCallback(
    ({ active, over }: DragEndEvent) => {
      if (active.id !== over?.id) {
        const activeIndex = actions.data.findIndex((i) => i.created === active.id);
        const overIndex = actions.data.findIndex((i) => i.created === over?.id);
        const newArr = arrayMove(actions.data, activeIndex, overIndex);
        dispatch(setSortActionData({ data: newArr, for: mode }));
        return;
      }
    },
    [actions.data, dispatch, mode],
  );

  return (
    <Row style={{ height: '100%', paddingBottom: 24 }}>
      <Col {...ColLayout} style={{ marginBottom: 18 }}>
        <div ref={re1} className="condition-container">
          <div ref={re2} className="condition-dropdown">
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
          <SortableWrapper data={conditions.data} onDragEnd={onDragEndConditions}>
            {conditions.data.map((condition, index) => {
              return (
                <DraggableCardContent
                  hideChain={
                    viewOnly && conditions.data.length > 0 && index === conditions.data.length - 1
                  }
                  type={conditions.type.name}
                  key={`condition-${condition.created}`}
                  id={condition.created}
                >
                  <ConditionCard
                    viewOnly={viewOnly}
                    mode={mode}
                    condition={condition}
                    index={index}
                  />
                </DraggableCardContent>
              );
            })}
          </SortableWrapper>
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
        <div ref={re3} className="action-container">
          <div className="action-dropdown">
            <Typography.Text style={{ color: token.blue }}>
              <FormattedMessage id="common.scene.DO" />
            </Typography.Text>
          </div>
          <SortableWrapper data={actions.data} onDragEnd={onDragEndActions}>
            {actions.data.map((action, index) => {
              return (
                <DraggableCardContent
                  id={action.created}
                  hideChain={
                    viewOnly && actions.data.length > 0 && index === actions.data.length - 1
                  }
                  key={`action-${action.created}`}
                >
                  <ActionCard viewOnly={viewOnly} mode={mode} action={action} index={index} />
                </DraggableCardContent>
              );
            })}
          </SortableWrapper>
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

interface ISortableWrapperProps {
  children: React.ReactNode;
  onDragEnd: (event: DragEndEvent) => void;
  data: ISceneCondition[] | ISceneAction[];
}

const SortableWrapper = memo(({ data, onDragEnd, children }: ISortableWrapperProps) => {
  const sensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } });

  return (
    <DndContext
      modifiers={[restrictToVerticalAxis]}
      sensors={[sensor]}
      onDragEnd={onDragEnd}
      collisionDetection={closestCenter}
    >
      <SortableContext items={data.map((i) => i.created)} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  );
});
