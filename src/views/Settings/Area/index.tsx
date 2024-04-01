import TreeAnchorTwo from '@/layout/components/PageAnchor/TreeAnchorTwo';
import { useLocale } from '@/locales';
import type { IDevicesListItem1, ISectionListItem } from '@/utils/constant';
import { FAKE_DATA } from '@/utils/constant';
import { PlusCircleOutlined } from '@ant-design/icons';
import type { TreeDataNode, TreeProps } from 'antd';
import { Button, Col, Form, Input, Row, Typography, theme } from 'antd';
import type { DataNode } from 'antd/es/tree';
import { memo, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import DetailArea from './DetailArea';
import type { IAnchorItem2 } from './utils/utils';
import { generateAnchorList2, getParentKey, getParentTitles } from './utils/utils';

interface ExtendedDataNode extends DataNode {
  titleWithNoIcon?: string; // Extending TreeProps and adding the children property
}

const SettingArea = memo(() => {
  const anchorItems2 = generateAnchorList2(
    FAKE_DATA.devicesList.items,
    FAKE_DATA.sectionList.items,
  );
  const { token } = theme.useToken();
  const { formatMessage } = useLocale();
  const [searchValue, setSearchValue] = useState('');
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>(['-1']);
  const [data, setData] = useState<ExtendedDataNode>();
  const [autoExpandParent, setAutoExpandParent] = useState(false);
  const [add, setAdd] = useState(false);
  const [keyChose, setKeyChose] = useState<React.Key>('');
  const renderTitleNode = (name: string) => {
    const index = name.indexOf(searchValue);
    const beforeStr = name.substring(0, index);
    const afterStr = name.slice(index + searchValue.length);
    return (
      <Row
        gutter={24}
        className="flex  align-middle justify-between"
        style={{
          margin: 4,
        }}
      >
        <div
          style={{ maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis', display: 'ruby' }}
        >
          {index > -1 ? (
            <span>
              {beforeStr}
              <span style={{ backgroundColor: token.colorPrimary }}>{searchValue}</span>
              {afterStr}
            </span>
          ) : (
            <span>{name}</span>
          )}
          <span style={{ marginLeft: 10 }}>
            <PlusCircleOutlined
              onClick={(e) => {
                console.log('e', e);
                setAdd(true);
              }}
            />
          </span>
        </div>
      </Row>
    );
  };
  const generateTreeNode2 = (
    deviceList: IDevicesListItem1[],
    sectionList: ISectionListItem[],
  ): IAnchorItem2[] => {
    const getChildren = (parentId: number | null, level = 0): IAnchorItem2[] => {
      const children: IAnchorItem2[] = [];
      sectionList.forEach((item) => {
        const renderDevice = deviceList.filter((device) => device?.building_area?.id === item.id);
        if (item.parent_id === parentId) {
          const child = getChildren(item.id, level + 1);
          if (!renderDevice.length && !child.length) {
            return;
          } else {
            children.push({
              key: `anchor${item.id}`,
              href: `#anchor${item.id}`,
              titleWithNoIcon: item.name,
              title: renderTitleNode(item.name),
              children: child,
              renderDevice,
              level: level + 1,
            });
          }
        }
      });
      return children;
    };
    const anchorList = getChildren(null);
    return anchorList;
  };
  const treeData = generateTreeNode2(FAKE_DATA.devicesList.items, FAKE_DATA.sectionList.items);
  const dataList: { key: React.Key; title: string }[] = [];
  const generateList = (data: TreeDataNode[]) => {
    for (let i = 0; i < data.length; i++) {
      const node = data[i];
      const { key } = node;
      const newNode: ExtendedDataNode = node;
      dataList.push({ key, title: newNode.titleWithNoIcon as string });
      if (node.children) {
        generateList(node.children);
      }
    }
  };
  const convertToTreeNode = (data: ExtendedDataNode[]): TreeDataNode[] => {
    const result: TreeDataNode[] = [];
    data.forEach((node) => {
      const { key, titleWithNoIcon, children } = node;
      const treeNode: TreeDataNode = {
        key,
        title: titleWithNoIcon ?? '',
      };
      if (children && children.length > 0) {
        treeNode.children = convertToTreeNode(children);
      }
      result.push(treeNode);
    });
    return result;
  };

  generateList(treeData);

  const onSelect: TreeProps['onSelect'] = (_selectedKeys, info) => {
    setData(info.node);
    setKeyChose(info.node.key);
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const newExpandedKeys = dataList
      .map((item) => {
        if (item.title.indexOf(value) > -1) {
          return getParentKey(item.key, convertToTreeNode(treeData));
        }
        return null;
      })
      .filter((item, i, self): item is React.Key => !!(item && self.indexOf(item) === i));
    setExpandedKeys(newExpandedKeys);
    setSearchValue(value);
    setAutoExpandParent(true);
  };
  const onExpand = (newExpandedKeys: React.Key[]) => {
    setExpandedKeys(newExpandedKeys);
    setAutoExpandParent(false);
  };
  return (
    <TreeAnchorTwo
      treeProps={{ treeData, onExpand, expandedKeys, autoExpandParent, onSelect }}
      inputProps={{ onChange }}
    >
      {add || treeData.length === 0 ? (
        <Row className="px-4 pt-4">
          <Col span={24}>
            <Typography.Title level={4}>{formatMessage({ id: 'common.newArea' })}</Typography.Title>
            <Form
              layout="horizontal"
              labelCol={{ xs: 8, xl: 6, xxl: 4 }}
              wrapperCol={{ span: 8 }}
              labelAlign="left"
              // onFinish={() => onFinish}
            >
              <Form.Item
                name="name"
                label={formatMessage({ id: 'common.areaName' })}
                rules={[
                  { required: true, message: <FormattedMessage id="common.areaNameRequire" /> },
                ]}
                colon
              >
                <Input />
              </Form.Item>
              <Form.Item name="parent" label={formatMessage({ id: 'common.belong' })}>
                <Typography>
                  {getParentTitles(anchorItems2, data?.titleWithNoIcon ?? '', [])}
                </Typography>
              </Form.Item>
              <Form.Item>
                <Button
                  type="default"
                  htmlType="button"
                  style={{ marginRight: 16 }}
                  onClick={() => setAdd(false)}
                >
                  {formatMessage({ id: 'common.cancel' })}
                </Button>
                <Button type="primary" htmlType="button">
                  {formatMessage({ id: 'manageAccount.save' })}
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      ) : (
        <DetailArea
          keyChose={keyChose}
          data={data!}
          location={getParentTitles(anchorItems2, data?.titleWithNoIcon ?? '', []) ?? ''}
        />
      )}
    </TreeAnchorTwo>
  );
});

export default SettingArea;
