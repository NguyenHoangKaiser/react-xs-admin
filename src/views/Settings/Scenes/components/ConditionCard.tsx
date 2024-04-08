import { useAppDispatch } from '@/store/hooks';
import { deleteSceneCondition } from '@/store/modules/scene';
import { ESceneOperator } from '@/utils/constant';
import { CloseOutlined, DragOutlined } from '@ant-design/icons';
import type { DraggableAttributes } from '@dnd-kit/core';
import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import type { SelectProps } from 'antd';
import { Button, Popconfirm, Select, Space, Typography } from 'antd';
import { useIntl } from 'react-intl';
import type { ISceneCondition, ISceneConditionType } from '../scene';
import DeviceCondition from './DeviceCondition';
import TimeCondition from './TimeCondition';

export const operatorSelect: {
  value: ESceneOperator;
  label: string;
}[] = [
  {
    value: ESceneOperator.Equal,
    label: '==',
  },
  {
    value: ESceneOperator.NotEqual,
    label: '!=',
  },
  {
    value: ESceneOperator.GreaterThan,
    label: '>',
  },
  {
    value: ESceneOperator.LessThan,
    label: '<',
  },
  {
    value: ESceneOperator.GreaterThanOrEqual,
    label: '>=',
  },
  {
    value: ESceneOperator.LessThanOrEqual,
    label: '<=',
  },
];

interface Props {
  condition: ISceneCondition;
  index: number;
  mode: 'add' | 'edit';
  viewOnly?: boolean;
  attributes?: DraggableAttributes;
  listeners?: SyntheticListenerMap;
  type: ISceneConditionType;
}

const ConditionCard = (props: Props) => {
  const { formatMessage } = useIntl();
  const { condition, index, mode, viewOnly, attributes, listeners, type } = props;
  const dispatch = useAppDispatch();
  return (
    <>
      {!viewOnly && (
        <Space style={{ position: 'absolute', top: 2, right: 8 }}>
          {attributes && listeners && (
            <Button
              {...attributes}
              {...listeners}
              style={{ fontSize: 12, padding: 2, cursor: 'move' }}
              shape="round"
              type="text"
            >
              <DragOutlined />
            </Button>
          )}
          <Popconfirm
            title={formatMessage({ id: 'common.scene.deleteCondition' })}
            description={formatMessage({ id: 'common.scene.deleteConditionDesc' })}
            onConfirm={() =>
              dispatch(deleteSceneCondition({ index, created: condition.created, for: mode }))
            }
          >
            <Button style={{ fontSize: 12, padding: 2 }} shape="round" type="text">
              <CloseOutlined />
            </Button>
          </Popconfirm>
        </Space>
      )}
      <Typography.Text
        style={{
          fontWeight: 'bold',
          margin: '0px 18px',
          display: 'block',
          textAlign: 'center',
          fontSize: 18,
          lineHeight: '24px',
        }}
      >
        {condition.category === 'device' && formatMessage({ id: 'common.device' })}
        {condition.category === 'time' && formatMessage({ id: 'common.time' })}
      </Typography.Text>
      {condition.category === 'device' ? (
        <DeviceCondition
          viewOnly={viewOnly}
          type={type}
          mode={mode}
          condition={condition}
          index={index}
        />
      ) : condition.category === 'time' ? (
        <TimeCondition
          viewOnly={viewOnly}
          type={type}
          mode={mode}
          condition={condition}
          index={index}
        />
      ) : null}
    </>
  );
};

export const OperatorSelect = (props: SelectProps) => {
  return (
    <Select
      options={operatorSelect}
      labelRender={(item) => <div className="text-center">{item.label}</div>}
      optionRender={(item) => <div className="text-center">{item.label}</div>}
      {...props}
    />
  );
};

export default ConditionCard;
