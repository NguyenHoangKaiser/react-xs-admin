import { useAppDispatch } from '@/store/hooks';
import { deleteSceneAction } from '@/store/modules/scene';
import { CloseOutlined } from '@ant-design/icons';
import { Button, Space, Typography } from 'antd';
import type { ISceneAction } from '../scene';
import DeviceAction from './DeviceAction';
import TimeAction from './TimeAction';

interface Props {
  action: ISceneAction;
  index: number;
  mode: 'add' | 'edit';
}

const ActionCard = (props: Props) => {
  const { action, index, mode } = props;
  const dispatch = useAppDispatch();
  return (
    <>
      <Space style={{ position: 'absolute', top: 2, right: 8 }}>
        <Button
          onClick={() => dispatch(deleteSceneAction({ index, created: action.created, for: mode }))}
          style={{ fontSize: 12, padding: 2 }}
          shape="round"
          type="text"
        >
          <CloseOutlined />
        </Button>
      </Space>
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
        {action.category.toUpperCase()}
      </Typography.Text>
      {action.category === 'device-action' ? (
        <DeviceAction mode={mode} action={action} index={index} />
      ) : action.category === 'time-action' ? (
        <TimeAction mode={mode} action={action} index={index} />
      ) : null}
    </>
  );
};

export default ActionCard;
