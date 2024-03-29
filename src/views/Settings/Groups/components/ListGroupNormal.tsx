import type { IGroupDevices } from '@/utils/constant';
import type { CardProps } from 'antd';
import { List } from 'antd';
import GroupCard from './GroupCard';

interface Props {
  list: IGroupDevices[];
  onClick: (group: IGroupDevices) => void;
  cardProps?: CardProps;
}

const ListGroupNormal = ({ list, cardProps, onClick }: Props) => {
  return (
    <List
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 4,
        lg: 6,
        xl: 8,
        xxl: 10,
      }}
      dataSource={list}
      renderItem={(group) => {
        return (
          <List.Item>
            <GroupCard
              group={group}
              icon={group.icon ?? 'bulb'}
              onClick={() => onClick(group)}
              {...cardProps}
            />
          </List.Item>
        );
      }}
    />
  );
};

export default ListGroupNormal;
