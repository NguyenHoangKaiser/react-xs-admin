import { useAppDispatch } from '@/store/hooks';
import { deleteSceneAction } from '@/store/modules/scene';
import { CloseOutlined, DragOutlined } from '@ant-design/icons';
import type { DraggableAttributes } from '@dnd-kit/core';
import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { Button, Popconfirm, Space, Typography } from 'antd';
import { useIntl } from 'react-intl';
import type { ISceneAction } from '../scene';
import DeviceAction from './DeviceAction';
import TimeAction from './TimeAction';

interface Props {
  action: ISceneAction;
  index: number;
  mode: 'add' | 'edit';
  viewOnly?: boolean;
  attributes?: DraggableAttributes;
  listeners?: SyntheticListenerMap;
}

const ActionCard = (props: Props) => {
  const { action, index, mode, viewOnly, attributes, listeners } = props;
  const { formatMessage } = useIntl();
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
            title={formatMessage({ id: 'common.scene.deleteAction' })}
            description={formatMessage({ id: 'common.scene.deleteActionDesc' })}
            onConfirm={() =>
              dispatch(deleteSceneAction({ index, created: action.created, for: mode }))
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
        {action.category === 'device-action' && formatMessage({ id: 'common.device' })}
        {action.category === 'time-action' && formatMessage({ id: 'common.time' })}
      </Typography.Text>
      {action.category === 'device-action' ? (
        <DeviceAction viewOnly={viewOnly} mode={mode} action={action} index={index} />
      ) : action.category === 'time-action' ? (
        <TimeAction viewOnly={viewOnly} mode={mode} action={action} index={index} />
      ) : null}
    </>
  );
};

export default ActionCard;
