import { useTabsChange } from '@/layout/components/AppMain/TabsPage/hooks/useTabsChange';
import { RouteEnum } from '@/router/utils';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  addSceneAction,
  addSceneCondition,
  addSceneSelector,
  editSceneConditionType,
  finishAddScene,
  setSceneMetadata,
} from '@/store/modules/scene';
import { EConditionsTypeName } from '@/utils/constant';
import { DownOutlined, SaveOutlined, SettingOutlined } from '@ant-design/icons';
import type { CSSObject } from '@emotion/react';
import type { FormProps, GlobalToken, MenuProps } from 'antd';
import {
  App,
  Button,
  Card,
  Col,
  Drawer,
  Dropdown,
  Flex,
  Form,
  Input,
  Row,
  Space,
  Typography,
  notification,
  theme,
} from 'antd';
import dayjs from 'dayjs';
import { useState, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import ActionCard from '../components/ActionCard';
import ChainLink from '../components/ChainLink';
import ConditionCard from '../components/ConditionCard';
const gridStyle: React.CSSProperties = {
  width: '100%',
  padding: 0,
  minHeight: 100,
};

const typeDrop: MenuProps['items'] = [
  {
    label: 'Device',
    key: 'device',
  },
  {
    label: 'Time',
    key: 'time',
  },
];

const dropItems: MenuProps['items'] = [
  {
    label: 'ALL OF THESE ARE TRUE',
    key: '1',
  },
  {
    label: 'ANY OF THESE ARE TRUE',
    key: '2',
  },
];

interface FormFieldType {
  name: string;
  description: string;
}

const CardContent = ({
  children,
  type = 1,
  hideChain,
}: {
  children: ReactNode;
  type?: 1 | 2;
  hideChain?: boolean;
}) => {
  return (
    <>
      <Card
        styles={{
          body: {
            padding: '12px 24px',
            position: 'relative',
            // width: '100%',
            // height: '100%',
          },
        }}
        style={gridStyle}
      >
        {children}
      </Card>
      {!hideChain && (
        <div className="pl-[100px]">
          <ChainLink text={type} />
        </div>
      )}
    </>
  );
};

export default () => {
  const { token } = theme.useToken();
  const { message } = App.useApp();
  const { conditions, metadata, actions } = useAppSelector(addSceneSelector);
  const dispatch = useAppDispatch();
  const [openDrawer, setOpenDrawer] = useState(false);
  const location = useLocation();
  const { removeTab } = useTabsChange();
  const getCurrentPathname = (): string => {
    return location.pathname + location.search;
  };
  const onFinish: FormProps<FormFieldType>['onFinish'] = (values) => {
    dispatch(
      setSceneMetadata({
        name: values.name,
        description: values.description,
        created: dayjs().unix(),
      }),
    );
    setOpenDrawer(false);
    message.success('Scene info updated');
  };

  const onFinishFailed: FormProps<FormFieldType>['onFinishFailed'] = (errorInfo) => {
    message.error(errorInfo.errorFields[0].errors[0]);
  };

  const onClick: MenuProps['onClick'] = ({ key }) => {
    if (Number(key) === 1) {
      dispatch(editSceneConditionType({ name: 1 }));
    } else {
      dispatch(editSceneConditionType({ name: 2, trigger: [] }));
    }
  };

  const onClickConditionTypeDrop: MenuProps['onClick'] = ({ key }) => {
    switch (key) {
      case 'device':
        dispatch(
          addSceneCondition({
            editing: true,
            category: 'device',
            created: dayjs().unix(),
            deviceId: null,
            states: null,
            type: null,
          }),
        );
        break;
      case 'time':
        dispatch(
          addSceneCondition({
            editing: true,
            category: 'time',
            created: dayjs().unix(),
            type: null,
          }),
        );
        break;
      default:
        break;
    }
  };

  const onClickActionTypeDrop: MenuProps['onClick'] = ({ key }) => {
    switch (key) {
      case 'device':
        dispatch(
          addSceneAction({
            editing: true,
            category: 'device-action',
            created: dayjs().unix(),
            deviceId: null,
            states: null,
            type: null,
          }),
        );
        break;
      case 'time':
        dispatch(
          addSceneAction({
            editing: true,
            category: 'time-action',
            created: dayjs().unix(),
            type: null,
          }),
        );
        break;
      default:
        break;
    }
  };

  const onClose = () => {
    setOpenDrawer(false);
  };

  const showDrawer = () => {
    setOpenDrawer(true);
  };

  const finishScene = () => {
    if (metadata.name === '') {
      message.error('Please enter scene name');
      return;
    }
    removeTab(getCurrentPathname(), {
      route: [RouteEnum.SettingsScenesAdd],
      title: 'Save and Finish Scene? Any unsaved changes will be lost.',
      trigger: actions.data.length > 0 || conditions.data.length > 0,
      callback: () => {
        dispatch(finishAddScene());
        notification.success({
          message: 'Scene added successfully',
          placement: 'bottomRight',
        });
      },
    });
  };

  // const location = useLocation();
  // const state = location.state as AddSceneFormType | null;
  // const navigate = useNavigate();

  return (
    <div css={getDivCss(token)}>
      <Row className="my-4">
        <Col span={22} offset={1}>
          <Flex justify="space-between" align="center">
            {metadata.name ? (
              <Typography.Title level={3}>{metadata.name}</Typography.Title>
            ) : (
              <Typography.Title level={3} type="secondary">
                Enter name in Edit Scene Info
              </Typography.Title>
            )}
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
      <Row style={{ height: '100%', paddingBottom: 24 }}>
        <Col span={7} offset={1}>
          <div className="condition-container">
            <div className="condition-dropdown">
              <Dropdown
                trigger={['click']}
                menu={{
                  items: dropItems,
                  onClick,
                  selectedKeys: [conditions.type.name.toString()],
                }}
              >
                <Typography.Text style={{ cursor: 'pointer', color: token.blue }}>
                  <Space>
                    {conditions.type.name === EConditionsTypeName.All
                      ? 'ALL OF THESE ARE TRUE'
                      : 'ANY OF THESE ARE TRUE'}
                    <DownOutlined />
                  </Space>
                </Typography.Text>
              </Dropdown>
            </div>
            {conditions.data.map((condition, index) => {
              return (
                <CardContent type={conditions.type.name} key={`condition-${condition.created}`}>
                  <ConditionCard condition={condition} index={index} />
                </CardContent>
              );
            })}
            <CardContent hideChain={conditions.data.length > 0} type={conditions.type.name}>
              <Dropdown
                menu={{ items: typeDrop, onClick: onClickConditionTypeDrop }}
                trigger={['click']}
              >
                <div
                  style={{
                    color: token.colorTextTertiary,
                    border: `2px dashed ${token.colorBorder}`,
                    height: 80,
                    textAlign: 'center',
                    lineHeight: '80px',
                  }}
                >
                  Click to add Condition
                </div>
              </Dropdown>
            </CardContent>
          </div>
        </Col>
        <Col span={7} offset={1}>
          <div className="action-container">
            {actions.data.map((action, index) => {
              return (
                <CardContent type={conditions.type.name} key={`action-${action.created}`}>
                  <ActionCard action={action} index={index} />
                </CardContent>
              );
            })}
            <CardContent>
              <Dropdown
                menu={{ items: typeDrop, onClick: onClickActionTypeDrop }}
                trigger={['click']}
              >
                <div
                  style={{
                    color: token.colorTextTertiary,
                    border: `2px dashed ${token.colorBorder}`,
                    height: 80,
                    textAlign: 'center',
                    lineHeight: '80px',
                  }}
                >
                  Click to add Action
                </div>
              </Dropdown>
            </CardContent>
          </div>
        </Col>
      </Row>
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
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FormFieldType>
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter scene name' }]}
          >
            <Input placeholder="Please enter scene name" />
          </Form.Item>
          <Form.Item<FormFieldType>
            name="description"
            label="Description"
            // rules={[
            //   {
            //     required: true,
            //     message: 'Please enter scene description',
            //   },
            // ]}
          >
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

const getDivCss = (token: GlobalToken): CSSObject => {
  return {
    '& .condition-container': {
      position: 'relative',
      border: `2px solid ${token.colorBorder}`,
      padding: token.padding,
      paddingTop: 49,
      borderTopLeftRadius: token.borderRadiusLG,
      borderBottomLeftRadius: token.borderRadiusLG,
      ['&:hover']: {
        border: `2px solid ${token.colorPrimaryBorder}`,
      },
    },
    '& .condition-dropdown': {
      position: 'absolute',
      top: 0,
      left: 0,
      padding: '4px 10px',
      borderRight: `2px solid ${token.colorBorder}`,
      borderBottom: `2px solid ${token.colorBorder}`,
      borderBottomRightRadius: token.borderRadiusLG,
      ['&:hover']: {
        borderRight: `2px solid ${token.colorPrimaryBorder}`,
        borderBottom: `2px solid ${token.colorPrimaryBorder}`,
      },
    },
    '& .action-container': {
      border: `2px solid ${token.colorBorder}`,
      padding: token.padding,
      borderTopRightRadius: token.borderRadiusLG,
      borderBottomRightRadius: token.borderRadiusLG,
      ['&:hover']: {
        border: `2px solid ${token.colorPrimaryBorder}`,
      },
    },
  };
};
