import SvgIcon from '@/components/SvgIcon';
import { useTabsChange } from '@/layout/components/AppMain/TabsPage/hooks/useTabsChange';
import { getIntlText } from '@/locales';
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
import { ListIconImage, type TIconType } from '@/utils/constant';
import { SaveOutlined, SettingOutlined } from '@ant-design/icons';
import { App, Button, Col, Drawer, Flex, Form, Input, Row, Select, Space, theme } from 'antd';
import dayjs from 'dayjs';
import { useCallback, useMemo, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useLocation, useNavigate } from 'react-router-dom';
import SceneRender from '../components/SceneRender';
import { getSceneContainerCss } from '../style';

interface FormFieldType {
  name: string;
  description: string;
  icon: TIconType;
}

export default ({ mode }: { mode: 'add' | 'edit' }) => {
  const { token } = theme.useToken();
  const { message, notification } = App.useApp();
  const sceneAdd = useAppSelector(addSceneSelector);
  const sceneEdit = useAppSelector(editSceneSelector);
  const scene = useMemo(() => (mode === 'add' ? sceneAdd : sceneEdit), [mode, sceneAdd, sceneEdit]);
  const { locale } = useIntl();

  const listIcon = useMemo(
    () =>
      ListIconImage.map((icon) => ({
        label: locale === 'en' ? icon.name_en : icon.name,
        value: icon.type,
      })),
    [locale],
  );

  const { metadata, conditions, actions } = scene;
  const conditionHasDevice = conditions.data.some((condition) => condition.category === 'device');
  const actionHasDevice = actions.data.some((action) => action.category === 'device-action');
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
          icon: values.icon,
        },
        for: mode,
      }),
    );
    setOpenDrawer(false);
    message.success(getIntlText({ id: 'common.scene.infoUpdated' }));
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
      message.error(getIntlText({ id: 'common.scene.pleaseEnterName' }));
      return;
    }
    removeTab(pathKey, {
      route: [RouteEnum.SettingsScenesAdd, RouteEnum.SettingsScenesEdit],
      title:
        mode === 'add'
          ? getIntlText({ id: 'common.scene.finishAdding' })
          : getIntlText({ id: 'common.scene.finishEditing' }),
      content: 'Any unsaved changes will be lost.',
      trigger: actions.data.length > 0 || conditions.data.length > 0,
      callback: () => {
        dispatch(mode === 'add' ? finishAddScene() : finishEditScene());
        notification.success({
          message:
            mode === 'add'
              ? getIntlText({ id: 'common.scene.addedSuccess' })
              : getIntlText({ id: 'common.scene.editSuccess' }),
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
          <Flex justify="space-between" align="center" wrap="wrap" gap="middle">
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
                  <FormattedMessage id="common.scene.enterNameEdit" />
                </span>
              )}
            </Button>
            <Space>
              <Button type="default" icon={<SettingOutlined />} onClick={showDrawer}>
                {getIntlText({ id: 'common.scene.editInfo' })}
              </Button>
              <Button
                type="primary"
                disabled={
                  actions.data.length === 0 ||
                  conditions.data.length === 0 ||
                  !conditionHasDevice ||
                  !actionHasDevice
                }
                icon={<SaveOutlined />}
                onClick={finishScene}
              >
                {getIntlText({ id: 'common.scene.finishScene' })}
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
        title={getIntlText({ id: 'common.scene.editInfo' })}
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
          name={getIntlText({ id: 'common.scene.sceneInfo' })}
          layout="vertical"
          initialValues={metadata}
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FormFieldType>
            name="name"
            label={<FormattedMessage id="common.scene.name" />}
            rules={[
              { required: true, message: getIntlText({ id: 'common.scene.requireSceneName' }) },
            ]}
          >
            <Input placeholder={getIntlText({ id: 'common.scene.pleaseEnterName' })} />
          </Form.Item>
          <Form.Item<FormFieldType>
            name="description"
            label={<FormattedMessage id="common.description" />}
          >
            <Input.TextArea
              rows={4}
              placeholder={getIntlText({ id: 'common.scene.pleaseEnterDescription' })}
            />
          </Form.Item>
          <Form.Item<FormFieldType> label="Icon" name="icon">
            <Select
              placeholder={getIntlText({ id: 'common.scene.pleaseSelectIcon' })}
              options={listIcon}
              optionRender={(option) => (
                <Space size="large">
                  <SvgIcon name={option.value as TIconType} className="text-2xl mb-1" />
                  <span>{option.data.label}</span>
                </Space>
              )}
            />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ position: 'absolute', bottom: 18, right: 18 }}
          >
            <FormattedMessage id="common.submit" />
          </Button>
        </Form>
      </Drawer>
    </div>
  );
};
