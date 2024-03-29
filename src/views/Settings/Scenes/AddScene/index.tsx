import { useTabsChange } from '@/layout/components/AppMain/TabsPage/hooks/useTabsChange';
import { RouteEnum } from '@/router/utils';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  addSceneAction,
  addSceneCondition,
  addSceneSelector,
  editSceneConditionType,
  editSceneSelector,
  finishAddScene,
  finishEditScene,
  setSceneMetadata,
} from '@/store/modules/scene';
import { SaveOutlined, SettingOutlined } from '@ant-design/icons';
import { App, Button, Col, Drawer, Flex, Form, Input, Row, Space, theme } from 'antd';
import dayjs from 'dayjs';
import { useCallback, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SceneRender from '../components/SceneRender';
import { getSceneContainerCss } from '../style';

interface FormFieldType {
  name: string;
  description: string;
}

export default ({ mode }: { mode: 'add' | 'edit' }) => {
  const { token } = theme.useToken();
  const { message, notification } = App.useApp();
  const sceneAdd = useAppSelector(addSceneSelector);
  const sceneEdit = useAppSelector(editSceneSelector);
  const scene = useMemo(() => (mode === 'add' ? sceneAdd : sceneEdit), [mode, sceneAdd, sceneEdit]);
  console.log('scene', {
    scene,
    mode,
    sceneAdd,
    sceneEdit,
  });
  const { metadata, conditions, actions } = scene;
  const dispatch = useAppDispatch();
  const [openDrawer, setOpenDrawer] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { removeTab } = useTabsChange();

  const onFinish = (values: FormFieldType) => {
    dispatch(
      setSceneMetadata({
        data: {
          name: values.name,
          description: values.description,
        },
        for: mode,
      }),
    );
    setOpenDrawer(false);
    message.success('Scene info updated');
  };

  const onClick = useCallback(
    ({ key }: { key: string }) => {
      if (Number(key) === 1) {
        dispatch(editSceneConditionType({ data: { name: 1 }, for: mode }));
      } else {
        dispatch(editSceneConditionType({ data: { name: 2, trigger: [] }, for: mode }));
      }
    },
    [dispatch, mode],
  );

  const onClickConditionTypeDrop = useCallback(
    ({ key }: { key: string }) => {
      switch (key) {
        case 'device':
          dispatch(
            addSceneCondition({
              data: {
                editing: true,
                category: 'device',
                created: dayjs().unix(),
                deviceId: null,
                states: null,
                type: null,
              },
              for: mode,
            }),
          );
          break;
        case 'time':
          dispatch(
            addSceneCondition({
              data: {
                editing: true,
                category: 'time',
                created: dayjs().unix(),
                type: null,
              },
              for: mode,
            }),
          );
          break;
        default:
          break;
      }
    },
    [dispatch, mode],
  );

  const onClickActionTypeDrop = useCallback(
    ({ key }: { key: string }) => {
      switch (key) {
        case 'device':
          dispatch(
            addSceneAction({
              data: {
                editing: true,
                category: 'device-action',
                created: dayjs().unix(),
                deviceId: null,
                states: null,
                type: null,
              },
              for: mode,
            }),
          );
          break;
        case 'time':
          dispatch(
            addSceneAction({
              data: {
                editing: true,
                category: 'time-action',
                created: dayjs().unix(),
                type: null,
              },
              for: mode,
            }),
          );
          break;
        default:
          break;
      }
    },
    [dispatch, mode],
  );

  const onClose = () => {
    setOpenDrawer(false);
  };

  const showDrawer = () => {
    setOpenDrawer(true);
  };
  const pathKey = location.pathname + location.search;

  const finishScene = useCallback(() => {
    if (metadata.name === '') {
      message.error('Please enter scene name');
      return;
    }
    removeTab(pathKey, {
      route: [RouteEnum.SettingsScenesAdd, RouteEnum.SettingsScenesEdit],
      title: mode === 'add' ? 'Finish adding scene?' : 'Finish editing scene?',
      content: 'Any unsaved changes will be lost.',
      trigger: actions.data.length > 0 || conditions.data.length > 0,
      callback: () => {
        dispatch(mode === 'add' ? finishAddScene() : finishEditScene());
        notification.success({
          message: mode === 'add' ? 'Scene added successfully' : 'Scene updated successfully',
          placement: 'bottomRight',
        });
        // navigate(RouteEnum.SettingsScenes, { replace: true });
      },
    });
  }, [actions.data.length, conditions.data.length, pathKey, metadata.name, navigate, mode]);

  return (
    <div css={getSceneContainerCss(token)}>
      <Row className="my-4">
        <Col span={22} offset={1}>
          <Flex justify="space-between" align="center">
            <Button type="text" onClick={showDrawer} className="title-scene">
              {metadata.name ? (
                <span
                  style={{
                    color: token.colorText,
                  }}
                >
                  {metadata.name}
                </span>
              ) : (
                <span
                  style={{
                    color: token.colorTextSecondary,
                  }}
                >
                  Enter name in Edit Scene Info
                </span>
              )}
            </Button>
            <Space>
              <Button type="default" icon={<SettingOutlined />} onClick={showDrawer}>
                Edit Scene Info
              </Button>
              <Button
                type="primary"
                disabled={actions.data.length === 0 || conditions.data.length === 0}
                icon={<SaveOutlined />}
                onClick={finishScene}
              >
                Finish Scene
              </Button>
            </Space>
          </Flex>
        </Col>
      </Row>
      <SceneRender
        mode={mode}
        scene={scene}
        onClick={onClick}
        onClickActionTypeDrop={onClickActionTypeDrop}
        onClickConditionTypeDrop={onClickConditionTypeDrop}
      />
      <Drawer
        title="Edit Scene Info"
        getContainer={false}
        placement="right"
        onClose={onClose}
        open={openDrawer}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        style={{ position: 'relative' }}
      >
        <Form
          name="Scene Information"
          layout="vertical"
          initialValues={metadata}
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FormFieldType>
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter scene name' }]}
          >
            <Input placeholder="Please enter scene name" />
          </Form.Item>
          <Form.Item<FormFieldType> name="description" label="Description">
            <Input.TextArea rows={4} placeholder="Please enter scene description" />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ position: 'absolute', bottom: 18, right: 18 }}
          >
            Submit
          </Button>
        </Form>
      </Drawer>
    </div>
  );
};
