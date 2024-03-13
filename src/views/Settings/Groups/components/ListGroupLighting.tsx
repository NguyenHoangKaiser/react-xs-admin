import type { IGroupDevices, IListIconItem } from '@/utils/constant';
import { ListIconImage } from '@/utils/constant';
import { PlusCircleFilled } from '@ant-design/icons';
import type { CardProps } from 'antd';
import { List } from 'antd';
import type { Dispatch, SetStateAction } from 'react';
import GroupCard from './GroupCard';

interface Props {
  list: IGroupDevices[];
  onClick: (icon: IListIconItem, group: IGroupDevices) => void;
  cardProps?: CardProps;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}

const ListGroupLighting = ({ list, cardProps, onClick, setOpenModal }: Props) => {
  return (
    <div>
      {list?.length > 0 ? (
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
            const icon = ListIconImage[group.id % ListIconImage.length] || ListIconImage[0];
            return (
              <List.Item>
                <GroupCard
                  group={group}
                  icon={icon}
                  onClick={() => onClick(icon, group)}
                  {...cardProps}
                />
              </List.Item>
            );
          }}
        />
      ) : (
        <PlusCircleFilled style={{ fontSize: 32 }} onClick={() => setOpenModal(true)} />
      )}
    </div>
  );
};

export default ListGroupLighting;
