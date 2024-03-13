import type { FieldType, IGroupDevices, IListIconItem } from '@/utils/constant';
import { FAKE_GROUP_CHILD } from '@/utils/constant';
import { CollapseProp } from '@/views/Home';
import type { CollapseProps } from 'antd';
import { Collapse, Typography } from 'antd';
import { useState } from 'react';
import GroupDrawer from './components/GroupDrawer';
import CollectionCreateFormModal from './components/GroupModal';
import ListGroupLighting from './components/ListGroupLighting';
import ListGroupNormal from './components/ListGroupNormal';
import { getGroupCss } from './style';

export default () => {
  const [selectedGroup, setSelectedGroup] = useState<IGroupDevices | null>(null);

  const [selectedIcon, setSelectedIcon] = useState<IListIconItem>();

  const [open, setOpen] = useState<boolean>(false);

  const onCreate = (values: FieldType) => {
    console.log('Received values of form: ', values);
    setOpen(false);
  };

  const onClose = () => {
    setSelectedGroup(null);
  };
  const onClick = (icon: IListIconItem, device: IGroupDevices) => {
    setSelectedGroup(device);
    setSelectedIcon(icon);
  };

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: (
        <Typography.Title style={{ marginBottom: 0 }} level={4}>
          Nhóm thường
        </Typography.Title>
      ),
      children: (
        <ListGroupNormal
          setOpenModal={setOpen}
          list={FAKE_GROUP_CHILD.group_normal}
          onClick={onClick}
        />
      ),
    },
    {
      key: '2',
      label: (
        <Typography.Title style={{ marginBottom: 0 }} level={4}>
          Nhóm lighting
        </Typography.Title>
      ),
      children: (
        <ListGroupLighting
          setOpenModal={setOpen}
          list={FAKE_GROUP_CHILD.group_lighting}
          onClick={onClick}
        />
      ),
    },
  ];
  const onChange = (key: string | string[]) => {
    console.log(key);
  };
  return (
    <div css={getGroupCss()}>
      <Collapse
        {...CollapseProp}
        ghost
        items={items}
        defaultActiveKey={['1', '2']}
        onChange={onChange}
      />
      <GroupDrawer icon={selectedIcon} group={selectedGroup} onClose={onClose} />
      <CollectionCreateFormModal
        open={open}
        onCreate={onCreate}
        onCancel={() => setOpen(false)}
        initialValues={{}}
      />
    </div>
  );
};
