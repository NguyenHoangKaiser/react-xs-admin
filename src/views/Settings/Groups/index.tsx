import { useLocale } from '@/locales';
import type { IGroupDevices, IconVariant } from '@/utils/constant';
import { FAKE_GROUP_CHILD } from '@/utils/constant';
import { CollapseProp } from '@/views/Home';
import { ExclamationCircleOutlined, PlusCircleFilled } from '@ant-design/icons';
import type { CollapseProps } from 'antd';
import { Collapse, Modal, Typography, theme } from 'antd';
import { useState } from 'react';
import GroupDrawer from './components/GroupDrawer';
import GroupFormModal from './components/GroupModal';
import ListGroupLighting from './components/ListGroupLighting';
import ListGroupNormal from './components/ListGroupNormal';
import SelectDeviceModal from './components/SelectDeviceModal';
import { getGroupCss } from './style';
const { confirm } = Modal;

export default () => {
  const [listGroupNormal] = useState<IGroupDevices[]>(FAKE_GROUP_CHILD.group_normal);

  const [listGroupLighting] = useState<IGroupDevices[]>(FAKE_GROUP_CHILD.group_lighting);

  const [selectedGroup, setSelectedGroup] = useState<IGroupDevices | null>(null);

  const [selectedIcon, setSelectedIcon] = useState<IconVariant>(selectedGroup?.icon ?? 'bulb');

  const [openModal, setOpenModal] = useState<boolean>(false);

  const [openModalSelect, setOpenModalSelect] = useState<boolean>(false);

  const [formData, setFormData] = useState<IGroupDevices>();

  const [type, setType] = useState<'normal' | 'lighting'>('normal');

  const thme = theme.useToken();

  const { formatMessage } = useLocale();

  const onCreate = (values: IGroupDevices) => {
    if (selectedGroup) {
      if (type === 'normal') {
        setOpenModalSelect(true);
      } else {
        setOpenModalSelect(true);
      }
    } else {
      setOpenModalSelect(true);
      setFormData(values);
    }

    setOpenModal(false);
  };

  const onDelete = () => {
    confirm({
      title: formatMessage({ id: 'group.confirm' }),
      icon: <ExclamationCircleOutlined />,
      content: formatMessage({ id: 'group.confirmDelete' }),
      okText: formatMessage({ id: 'common.agree' }),
      cancelText: formatMessage({ id: 'group.cancel' }),
      onOk: () => {},
      centered: true,
    });
  };

  const onClose = () => {
    setSelectedGroup(null);
    setSelectedIcon('bulb');
  };
  const onClickNormal = (group: IGroupDevices) => {
    setSelectedGroup(group);
    setSelectedIcon(group?.icon ?? 'bulb');
    setType('normal');
  };

  const onClickLighting = (group: IGroupDevices) => {
    setSelectedGroup(group);
    setSelectedIcon(group?.icon ?? 'bulb');
    setType('lighting');
  };

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: (
        <div className="flex flex-row gap-3">
          <Typography.Title style={{ marginBottom: 0 }} level={4}>
            {formatMessage({ id: 'group.normalGroup' })}
          </Typography.Title>
          <PlusCircleFilled
            style={{ fontSize: 24, color: thme.token.colorPrimary }}
            onClick={(e) => {
              e.stopPropagation();
              setOpenModal(true);
              setType('normal');
            }}
          />
        </div>
      ),
      children: <ListGroupNormal list={listGroupNormal} onClick={onClickNormal} />,
    },
    {
      key: '2',
      label: (
        <div className="flex flex-row gap-3">
          <Typography.Title style={{ marginBottom: 0 }} level={4}>
            {formatMessage({ id: 'group.lightingGroup' })}
          </Typography.Title>
          <PlusCircleFilled
            style={{ fontSize: 24, color: thme.token.colorPrimary }}
            onClick={(e) => {
              e.stopPropagation();
              setOpenModal(true);
              setType('lighting');
            }}
          />
        </div>
      ),
      children: <ListGroupLighting list={listGroupLighting} onClick={onClickLighting} />,
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
      <GroupDrawer
        icon={selectedGroup?.icon}
        group={selectedGroup}
        onClose={onClose}
        onClickEdit={() => setOpenModal(true)}
        onClickDelete={onDelete}
      />
      <GroupFormModal
        open={openModal}
        onCreate={onCreate}
        onCancel={() => {
          setSelectedIcon('bulb');
          setOpenModal(false);
        }}
        initialValues={selectedGroup ?? undefined}
        selectedIcon={selectedIcon}
        setSelectedIcon={setSelectedIcon}
        typeModal={type}
      />
      <SelectDeviceModal
        formData={formData}
        open={openModalSelect}
        onCancel={() => {
          setOpenModalSelect(false);
        }}
      />
    </div>
  );
};
