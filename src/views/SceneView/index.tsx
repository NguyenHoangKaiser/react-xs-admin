import SvgIcon from '@/components/SvgIcon';
import { useInfoPageTabs } from '@/hooks/useInfoPageTabs';
import Page from '@/layout/components/Container';
import { getIntlText } from '@/locales';
import { RouteEnum } from '@/router/utils';
import { useAppSelector } from '@/store/hooks';
import { listSceneSelector } from '@/store/modules/scene';
import { EStatus } from '@/utils/constant';
import type { CollapseProps } from 'antd';
import { Card, Collapse, Flex, List, Typography } from 'antd';
import { memo } from 'react';
import { useIntl } from 'react-intl';
import { CollapseProp } from '../Home';
import type { ISceneRule } from '../Settings/Scenes/scene';

const ListScene = memo(({ sceneStatus }: { sceneStatus: EStatus }) => {
  const { formatMessage } = useIntl();
  const { data } = useAppSelector(listSceneSelector);
  const realData = data.filter((scene) => scene.metadata.status === sceneStatus);
  const { navigateTabs } = useInfoPageTabs();

  const onDetail = (record: ISceneRule) => {
    const path = `${RouteEnum.SettingsScenesDetail}/${record.metadata.created}`;
    navigateTabs({
      path,
      localeLabel: 'layout.menu.settingSceneDetail',
    });
  };

  return (
    <List
      grid={{
        gutter: 16,
        xs: 2,
        sm: 3,
        md: 4,
        lg: 6,
        xl: 8,
        xxl: 10,
      }}
      dataSource={realData}
      renderItem={(scene) => {
        const { metadata } = scene;
        return (
          <List.Item>
            <Card
              hoverable
              styles={{
                body: {
                  padding: 8,
                  paddingTop: 18,
                },
              }}
              onClick={() => onDetail(scene)}
            >
              <Flex vertical justify="center" align="center">
                <div className="h-[60px]">
                  <span style={{ fontSize: '60px' }}>
                    <SvgIcon name={metadata.icon || 'maintenance'} />
                  </span>
                </div>
                <Typography.Text
                  style={{
                    fontSize: 16,
                    lineHeight: '20px',
                    textAlign: 'center',
                    marginTop: 4,
                    marginBottom: 0,
                  }}
                  ellipsis={{ tooltip: true }}
                >
                  {metadata.name || formatMessage({ id: 'common.name' })}
                </Typography.Text>
                {/* {} */}
              </Flex>
            </Card>
          </List.Item>
        );
      }}
    />
  );
});

const items: CollapseProps['items'] = [
  {
    key: '1',
    label: (
      <Typography.Title style={{ marginBottom: 0 }} level={4}>
        {getIntlText({ id: 'common.active' })}
      </Typography.Title>
    ),
    children: <ListScene sceneStatus={EStatus.Active} />,
  },
  {
    key: '2',
    label: (
      <Typography.Title style={{ marginBottom: 0 }} level={4}>
        {getIntlText({ id: 'common.inactive' })}
      </Typography.Title>
    ),
    children: <ListScene sceneStatus={EStatus.Inactive} />,
  },
];

export default memo(() => {
  return (
    <Page>
      <div css={getGroupCss}>
        <Collapse {...CollapseProp} ghost items={items} defaultActiveKey={['1', '2']} />
      </div>
    </Page>
  );
});

const getGroupCss = {
  ['& .ant-collapse-small >.ant-collapse-item >.ant-collapse-header']: {
    paddingTop: 6,
    paddingBottom: 6,
    alignItems: 'center',
  },
  // ['& .ant-collapse-small >.ant-collapse-item >.ant-collapse-content>.ant-collapse-content-box']: {
  //   paddingTop: 0,
  //   paddingBottom: 0,
  // },
  // ['& .ant-collapse-content.ant-collapse-content-active > .ant-collapse-content-box']: {
  //   paddingTop: 0,
  //   paddingBottom: 0,
  // },
};
