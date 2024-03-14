import type { IGroupDevices, IListIconItem } from '@/utils/constant';
import { ListIconImage } from '@/utils/constant';
import { PlusCircleFilled } from '@ant-design/icons';
import type { CardProps } from 'antd';
import { Card, Flex, List, Typography } from 'antd';
import type { Dispatch, SetStateAction } from 'react';
import GroupCard from './GroupCard';

interface Props {
  list: IGroupDevices[];
  onClick: (icon: IListIconItem, group: IGroupDevices) => void;
  cardProps?: CardProps;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}

const ListGroupNormal = ({ list, cardProps, onClick, setOpenModal }: Props) => {
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
          renderItem={(group, index) => {
            const icon = ListIconImage[group.id % ListIconImage.length] || ListIconImage[0];
            return (
              <div className="flex flex-row">
                <List.Item>
                  <GroupCard
                    group={group}
                    icon={icon}
                    onClick={() => onClick(icon, group)}
                    {...cardProps}
                  />
                </List.Item>
                {index === list.length - 1 ? (
                  <Card
                    hoverable
                    styles={{
                      body: {
                        padding: 8,
                        paddingTop: 18,
                      },
                    }}
                    onClick={() => setOpenModal(true)}
                  >
                    <Flex vertical justify="center" align="center">
                      <div className="h-[60px]">
                        <PlusCircleFilled style={{ fontSize: 60 }} />
                      </div>
                      <Typography.Title
                        style={{
                          margin: 0,
                        }}
                        level={5}
                      >
                        Thêm nhóm
                      </Typography.Title>
                    </Flex>
                  </Card>
                ) : (
                  <></>
                )}
              </div>
            );
          }}
        />
      ) : (
        <Card
          hoverable
          styles={{
            body: {
              padding: 8,
              paddingTop: 18,
            },
          }}
        >
          <Flex vertical justify="center" align="center">
            <div className="h-[60px]">
              <PlusCircleFilled style={{ fontSize: 60 }} onClick={() => setOpenModal(true)} />
            </div>
            <Typography.Title
              style={{
                margin: 0,
              }}
              level={5}
            >
              Thêm nhóm
            </Typography.Title>
          </Flex>
        </Card>
      )}
    </div>
  );
};

export default ListGroupNormal;
