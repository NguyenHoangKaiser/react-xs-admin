import SvgIcon from '@/components/SvgIcon';
import { RouteEnum } from '@/router/utils';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setStoreMultiTabs } from '@/store/modules/route';
import {
  deleteScene,
  listSceneSelector,
  resetAddScene,
  sceneSelector,
  setEditScene,
} from '@/store/modules/scene';
import { EStatus } from '@/utils/constant';
import { useInfoPageTabs } from '@/views/DetailsPage/hooks/useInfoPageTabs';
import { CopyIcon, Pencil1Icon, PlayIcon, TrashIcon } from '@radix-ui/react-icons';
import { App, Button, Col, Input, Row, Space, Switch, Table, type TableColumnsType } from 'antd';
import { useNavigate } from 'react-router-dom';
import type { ISceneRule } from './scene';

export default () => {
  const navigate = useNavigate();
  //TODO: Replace with real data from API
  const { data } = useAppSelector(listSceneSelector);
  const dispatch = useAppDispatch();
  const { addingScene, editingScene, editScene } = useAppSelector(sceneSelector);
  const { modal } = App.useApp();
  const { navigateTabs } = useInfoPageTabs();

  const columns: TableColumnsType<ISceneRule> = [
    {
      title: 'Icon',
      dataIndex: ['metadata', 'icon'],
      key: 'icon',
      align: 'center',
      width: 100,
      render: (icon) => (
        <div style={{ fontSize: 32 }}>
          <SvgIcon name={icon || 'light-bulb'} />
        </div>
      ),
    },
    {
      title: 'ID',
      key: 'id',
      align: 'center',
      width: 80,
      render: (_text, _record, index) => <span>{index + 1}</span>,
    },
    {
      title: 'Name',
      dataIndex: ['metadata', 'name'],
      key: 'name',
    },
    {
      title: 'Status',
      dataIndex: ['metadata', 'status'],
      key: 'status',
      align: 'center',
      width: 100,
      render: (status) => (
        <Switch
          checkedChildren={'Active'}
          unCheckedChildren={'Inactive'}
          defaultChecked={status === EStatus.Active}
        />
      ),
    },
    {
      title: 'Run',
      key: 'run',
      align: 'center',
      width: 100,
      render: () => (
        <div className="flex items-center justify-center">
          <Button
            type="primary"
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 4 }}
          >
            <PlayIcon height={20} width={20} />
          </Button>
        </div>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      dataIndex: ['metadata', 'savedAt'],
      render: (_text, record) => (
        <Space size={'large'}>
          <Button
            type="default"
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 4 }}
          >
            <CopyIcon height={20} width={20} />
          </Button>
          <Button
            type="default"
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 4 }}
            onClick={() => {
              if (editingScene) {
                modal.confirm({
                  title: 'You have unsaved changes in Edit Scene page',
                  content:
                    'Proceed to Edit this scene will lose all unsaved changes. Do you want to proceed?',
                  okText: 'Proceed',
                  cancelText: 'Keep Editing',
                  onOk: () => {
                    dispatch(setEditScene(record));
                    const oldPath = `${RouteEnum.SettingsScenesEdit}/${editScene.metadata.created}`;
                    dispatch(setStoreMultiTabs({ type: 'delete', tabs: { key: oldPath } }));
                    const path = `${RouteEnum.SettingsScenesEdit}/${record.metadata.created}`;
                    navigateTabs(path, 'Edit Scene');
                  },
                  onCancel: () => {
                    const path = `${RouteEnum.SettingsScenesEdit}/${editScene.metadata.created}`;
                    navigateTabs(path, 'Edit Scene');
                  },
                });
              } else {
                dispatch(setEditScene(record));
                const path = `${RouteEnum.SettingsScenesEdit}/${record.metadata.created}`;
                navigateTabs(path, 'Edit Scene');
              }
            }}
          >
            <Pencil1Icon height={20} width={20} />
          </Button>
          <Button
            type="dashed"
            danger
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 4 }}
            onClick={() => {
              modal.confirm({
                title: 'Are you sure you want to delete this scene?',
                content: 'This action cannot be undone.',
                okText: 'Delete',
                cancelText: 'Cancel',
                onOk: () => {
                  dispatch(deleteScene({ created: record.metadata.created! }));
                },
              });
            }}
          >
            <TrashIcon height={20} width={20} />
          </Button>
        </Space>
      ),
    },
    Table.EXPAND_COLUMN,
  ];
  return (
    <>
      <Row>
        <Col
          style={{
            padding: '8px 16px',
          }}
          span={24}
        >
          <Button
            type="primary"
            onClick={() => {
              if (addingScene) {
                modal.confirm({
                  title: 'You have unsaved changes in Add Scene page',
                  content:
                    'Proceed to Add new scene will lose all unsaved changes. Do you want to proceed?',
                  okText: 'Proceed',
                  cancelText: 'Keep Editing',
                  onOk: () => {
                    dispatch(resetAddScene());
                    navigate(RouteEnum.SettingsScenesAdd);
                  },
                  onCancel: () => {
                    navigate(RouteEnum.SettingsScenesAdd);
                  },
                });
              } else {
                navigate(RouteEnum.SettingsScenesAdd);
              }
            }}
          >
            Add Scene
          </Button>
          <Input.Search style={{ width: 200, float: 'right' }} />
        </Col>
      </Row>
      <div>
        <Table
          expandable={{
            expandedRowRender: (record) => (
              <p style={{ margin: 0 }}>{record.metadata.description || 'No description'}</p>
            ),
            // rowExpandable: (record) => record.name !== 'Not Expandable',
          }}
          columns={columns}
          rowKey={(record) => record.metadata.created!}
          dataSource={data}
          pagination={{
            defaultPageSize: 20,
            hideOnSinglePage: true,
            // showSizeChanger: true,
            // pageSizeOptions: ['10', '20', '50', '100'],
            // position: ['topCenter'],
          }}
        />
      </div>
    </>
  );
};

// const tableCss = css`
//   .ant-table-tbody {
//     height: calc(100vh - 220px);
//   }
// `;
