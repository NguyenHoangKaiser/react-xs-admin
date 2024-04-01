import SvgIcon from '@/components/SvgIcon';
import { FormatMessage, getIntlText } from '@/locales';
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
import { EyeOpenIcon, Pencil1Icon, PlayIcon, TrashIcon } from '@radix-ui/react-icons';
import { App, Button, Col, Input, Row, Space, Switch, Table, type TableColumnsType } from 'antd';
import { FormattedMessage } from 'react-intl';
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

  const onDetail = (record: ISceneRule) => {
    // dispatch(setDetailScene(record));
    const path = `${RouteEnum.SettingsScenesDetail}/${record.metadata.created}`;
    navigateTabs({
      path,
      localeLabel: 'layout.menu.settingSceneDetail',
      option: {
        state: {
          scene: record,
        },
      },
    });
  };

  const onEdit = (record: ISceneRule) => {
    if (editingScene) {
      modal.confirm({
        title: getIntlText({ id: 'common.scene.editUnsaved' }),
        content: getIntlText({ id: 'common.scene.editUnsavedContent' }),
        okText: getIntlText({ id: 'common.proceed' }),
        cancelText: getIntlText({ id: 'common.scene.editUnsavedContinue' }),
        onOk: () => {
          dispatch(setEditScene(record));
          const oldPath = `${RouteEnum.SettingsScenesEdit}/${editScene.metadata.created}`;
          dispatch(setStoreMultiTabs({ type: 'delete', tabs: { key: oldPath } }));
          const path = `${RouteEnum.SettingsScenesEdit}/${record.metadata.created}`;
          navigateTabs({ path, localeLabel: 'layout.menu.settingSceneEdit' });
        },
        onCancel: () => {
          const path = `${RouteEnum.SettingsScenesEdit}/${editScene.metadata.created}`;
          navigateTabs({ path, localeLabel: 'layout.menu.settingSceneEdit' });
        },
      });
    } else {
      dispatch(setEditScene(record));
      const path = `${RouteEnum.SettingsScenesEdit}/${record.metadata.created}`;
      navigateTabs({ path, localeLabel: 'layout.menu.settingSceneEdit' });
    }
  };

  const onDelete = (record: ISceneRule) => {
    modal.confirm({
      title: getIntlText({ id: 'common.scene.deleteScene' }),
      content: getIntlText({ id: 'common.scene.actionNotUndone' }),
      okText: getIntlText({ id: 'common.delete' }),
      cancelText: getIntlText({ id: 'common.cancel' }),
      onOk: () => {
        dispatch(deleteScene({ created: record.metadata.created! }));
      },
    });
  };

  const onAddScene = () => {
    if (addingScene) {
      modal.confirm({
        title: getIntlText({ id: 'common.scene.addUnsaved' }),
        content: getIntlText({ id: 'common.scene.addUnsavedContent' }),
        okText: getIntlText({ id: 'common.proceed' }),
        cancelText: getIntlText({ id: 'common.scene.addUnsavedContinue' }),
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
  };

  const columns: TableColumnsType<ISceneRule> = [
    {
      title: 'Icon',
      dataIndex: ['metadata', 'icon'],
      key: 'icon',
      align: 'center',
      width: 100,
      render: (icon) => (
        <div style={{ fontSize: 32 }}>
          <SvgIcon name={icon || 'maintenance'} />
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
      title: FormatMessage({ id: 'common.scene.name' }),
      dataIndex: ['metadata', 'name'],
      key: 'name',
    },
    {
      title: FormatMessage({ id: 'common.status' }),
      dataIndex: ['metadata', 'status'],
      key: 'status',
      align: 'center',
      width: 100,
      render: (status) => <Switch defaultChecked={status === EStatus.Active} />,
    },
    {
      title: FormatMessage({ id: 'common.run' }),
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
      title: FormatMessage({ id: 'common.action' }),
      key: 'action',
      align: 'center',
      dataIndex: ['metadata', 'savedAt'],
      render: (_text, record) => (
        <Space size={'large'}>
          <Button
            type="default"
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 4 }}
            onClick={() => {
              onDetail(record);
            }}
          >
            <EyeOpenIcon height={20} width={20} />
          </Button>
          <Button
            type="default"
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 4 }}
            onClick={() => {
              onEdit(record);
            }}
          >
            <Pencil1Icon height={20} width={20} />
          </Button>
          <Button
            danger
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 4 }}
            onClick={() => {
              onDelete(record);
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
          <Button type="primary" onClick={onAddScene}>
            <FormattedMessage id="common.scene.addScene" />
          </Button>
          <Input.Search style={{ width: 200, float: 'right' }} />
        </Col>
      </Row>
      <div>
        <Table
          expandable={{
            expandedRowRender: (record) => (
              <p style={{ margin: 0 }}>
                {record.metadata.description || getIntlText({ id: 'common.noDescription' })}
              </p>
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
