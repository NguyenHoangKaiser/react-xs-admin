import { RouteEnum } from '@/router/utils';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setStoreMultiTabs } from '@/store/modules/route';
import { listSceneSelector, sceneSelector, setEditScene } from '@/store/modules/scene';
import { useInfoPageTabs } from '@/views/DetailsPage/hooks/useInfoPageTabs';
import { EditOutlined } from '@ant-design/icons';
import { App, Button, Col, Flex, Row, Typography, theme } from 'antd';
import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import SceneRender from '../components/SceneRender';
import { getSceneContainerCss } from '../style';

const DetailScene = () => {
  const { token } = theme.useToken();
  const params = useParams();
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { editingScene, editScene } = useAppSelector(sceneSelector);
  const listScene = useAppSelector(listSceneSelector);
  const scene = listScene.data.find((item) => item.metadata.created === Number(params.id));
  const { modal } = App.useApp();
  const { navigateTabs } = useInfoPageTabs();

  useEffect(() => {
    if (!scene) {
      dispatch(setStoreMultiTabs({ type: 'delete', tabs: { key: pathname } }));
      navigate(RouteEnum.SettingsScenes);
    }
  }, [scene, dispatch, pathname, navigate]);

  if (!scene) {
    return null;
  }

  const { metadata } = scene;
  const onEdit = () => {
    if (editingScene) {
      modal.confirm({
        title: 'You have unsaved changes in Edit Scene page',
        content:
          'Proceed to Edit this scene will lose all unsaved changes. Do you want to proceed?',
        okText: 'Proceed',
        cancelText: 'Keep Editing',
        onOk: () => {
          dispatch(setEditScene(scene));
          const oldPath = `${RouteEnum.SettingsScenesEdit}/${editScene.metadata.created}`;
          dispatch(setStoreMultiTabs({ type: 'delete', tabs: { key: oldPath } }));
          const path = `${RouteEnum.SettingsScenesEdit}/${scene.metadata.created}`;
          navigateTabs(path, 'Edit Scene');
        },
        onCancel: () => {
          const path = `${RouteEnum.SettingsScenesEdit}/${editScene.metadata.created}`;
          navigateTabs(path, 'Edit Scene');
        },
      });
    } else {
      dispatch(setEditScene(scene));
      const path = `${RouteEnum.SettingsScenesEdit}/${scene.metadata.created}`;
      navigateTabs(path, 'Edit Scene');
    }
  };

  return (
    <div css={getSceneContainerCss(token)}>
      <Row className="my-4">
        <Col span={22} offset={1}>
          <Flex justify="space-between" align="center">
            {metadata.name && <Typography.Title level={3}>{metadata.name}</Typography.Title>}
            <Button type="default" icon={<EditOutlined />} onClick={onEdit}>
              Edit Scene
            </Button>
          </Flex>
        </Col>
      </Row>
      <SceneRender mode={'add'} scene={scene} viewOnly />
    </div>
  );
};

export default DetailScene;
