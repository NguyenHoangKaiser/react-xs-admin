import { useAppDispatch } from '@/store/hooks';
import { deleteSceneCondition } from '@/store/modules/scene';
import { ESceneOperator } from '@/utils/constant';
import { CloseOutlined } from '@ant-design/icons';
import type { SelectProps } from 'antd';
import { Button, Select, Space, Typography } from 'antd';
import type { ISceneCondition } from '../scene';
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
}

const ConditionCard = (props: Props) => {
  const { condition, index, mode, viewOnly } = props;
  const dispatch = useAppDispatch();
  return (
    <>
      {!viewOnly && (
        <Space style={{ position: 'absolute', top: 2, right: 8 }}>
          <Button
            onClick={() =>
              dispatch(deleteSceneCondition({ index, created: condition.created, for: mode }))
            }
            style={{ fontSize: 12, padding: 2 }}
            shape="round"
            type="text"
          >
            <CloseOutlined />
          </Button>
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
        {condition.category.toUpperCase()}
      </Typography.Text>
      {condition.category === 'device' ? (
        <DeviceCondition viewOnly={viewOnly} mode={mode} condition={condition} index={index} />
      ) : condition.category === 'time' ? (
        <TimeCondition viewOnly={viewOnly} mode={mode} condition={condition} index={index} />
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
