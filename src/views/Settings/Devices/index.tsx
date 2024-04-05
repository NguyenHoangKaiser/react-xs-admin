import SvgIcon from '@/components/SvgIcon';
import { getIntlText, useLocale } from '@/locales';
import type { DataType } from '@/utils/constant';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useAntdTable } from 'ahooks';
import type { TableColumnsType, TableProps, TabsProps } from 'antd';
import { Button, Col, Form, Input, Row, Select, Space, Table, Tabs, Tooltip, theme } from 'antd';
import React, { useState } from 'react';
import Advance from './components/Advance';
import DeviceDetail from './components/DeviceDetail';
import Preview from './components/Preview';
import { getDevicesListCss } from './style';

type OnChange = NonNullable<TableProps<DataType>['onChange']>;
type Filters = Parameters<OnChange>[1];

type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    power: 0,
    id: 1,
    protocol: 1,
    role: 1,
    roomId: 1,
    image: 'fan',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    power: null,
    id: 3,
    protocol: 3,
    role: 1,
    roomId: 2,
    image: 'camera',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    power: 98,
    id: 32,
    protocol: 2,
    role: 2,
    roomId: 1,
    image: 'light-bulb',
  },
  {
    key: '4',
    name: 'Jim Red',
    age: 32,
    power: 50,
    id: 5,
    protocol: 1,
    role: 2,
    roomId: 3,
    image: 'temperature',
  },
  {
    key: '5',
    name: 'Jim Red',
    age: 32,
    power: 50,
    id: 5,
    protocol: 1,
    role: 2,
    roomId: 3,
    image: 'air-conditioner',
  },
  {
    key: '6',
    name: 'Jim Red',
    age: 32,
    power: 50,
    id: 5,
    protocol: 1,
    role: 2,
    roomId: 3,
    image: 'pump',
  },
];
export function convertRoom(num: number): string {
  const letterMap: { [key: number]: string } = {
    1: getIntlText({ id: 'common.livingRoom' }),
    2: getIntlText({ id: 'common.bedRoom' }),
    3: getIntlText({ id: 'common.kitchen' }),
    // Add more mappings as needed
  };

  return letterMap[num] || ''; // Return an empty string if the number is not in the map
}
export function convertProtocol(num: number): string {
  const letterMap: { [key: number]: string } = {
    1: getIntlText({ id: 'common.other' }),
    2: 'Z-Wave',
    3: 'Zigbee',
    // Add more mappings as needed
  };

  return letterMap[num] || ''; // Return an empty string if the number is not in the map
}
export function convertRole(num: number): string {
  const letterMap: { [key: number]: string } = {
    1: getIntlText({ id: 'common.other' }),
    2: getIntlText({ id: 'common.light' }),
    3: getIntlText({ id: 'common.temperatureSensor' }),
    // Add more mappings as needed
  };

  return letterMap[num] || ''; // Return an empty string if the number is not in the map
}
// interface ExpandedDataType {
//   key: React.Key;
//   date: string;
//   name: string;
//   upgradeNum: string;
// }
interface Item {
  name: {
    last: string;
  };
  email: string;
  phone: string;
  gender: 'male' | 'female';
}

interface Result {
  total: number;
  list: Item[];
}

const getTableData = ({
  current,
  pageSize,
}: {
  current: any;
  pageSize: number;
}): Promise<Result> => {
  const query = `page=${current}&size=${pageSize}`;

  return fetch(`https://randomuser.me/api?results=55&${query}`)
    .then((res) => res.json())
    .then((res) => ({
      total: res.info.results,
      list: res.results,
    }));
};
const SettingDevices: React.FC = () => {
  const [filteredInfo, setFilteredInfo] = useState<Filters>({});
  const [sortedInfo, setSortedInfo] = useState<Sorts>({});
  const { token } = theme.useToken();
  const [form] = Form.useForm();
  const handleChange: OnChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter as Sorts);
  };
  const { search } = useAntdTable(getTableData, {
    form,
    defaultParams: [{ current: 2, pageSize: 5 }],
  });
  const { submit, reset } = search;
  const clearFilters = () => {
    setFilteredInfo({});
  };

  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };
  const { formatMessage } = useLocale();

  const expandedRowRender = (record: DataType) => {
    const onChange = (key: string) => {
      console.log(key);
    };

    const items: TabsProps['items'] = [
      {
        key: '1',
        label: formatMessage({ id: 'common.general' }),
        children: <DeviceDetail record={record} />,
      },

      {
        key: '2',
        label: formatMessage({ id: 'common.advance' }),
        children: <Advance record={record} />,
      },
      {
        key: '3',
        label: formatMessage({ id: 'common.preview' }),
        children: <Preview record={record} />,
      },
    ];
    return <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;
  };
  const advanceSearchForm = (
    <div>
      <Form form={form}>
        <Row gutter={[24, 16]}>
          <Col span={5}>
            <Form.Item>
              <Input
                style={{ textTransform: 'capitalize' }}
                maxLength={255}
                placeholder={formatMessage({ id: 'common.name' })}
                prefix={
                  <Tooltip title={formatMessage({ id: 'common.searchName' })}>
                    <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                  </Tooltip>
                }
                onChange={(e) => console.log('e', e)}
              />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item>
              <Input style={{ textTransform: 'capitalize' }} placeholder="ID" />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Select
              showSearch
              style={{ width: '100%' }}
              placeholder={formatMessage({ id: 'common.room' })}
              optionFilterProp="children"
              filterOption={(input, option) =>
                option?.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              onChange={(value) => {
                console.log(value);
              }}
              allowClear
            >
              <Select.Option value="1">{formatMessage({ id: 'common.livingRoom' })}</Select.Option>
            </Select>
          </Col>
          <Col>
            <Button type="primary" onClick={submit}>
              {formatMessage({ id: 'common.search' })}
            </Button>
          </Col>
          <Col>
            <Button onClick={reset}>{formatMessage({ id: 'common.reset' })}</Button>
          </Col>
        </Row>
      </Form>
    </div>
  );

  const columns: TableColumnsType<DataType> = [
    {
      title: formatMessage({ id: 'common.icon' }).toUpperCase(),
      dataIndex: 'image',
      key: 'image',
      align: 'center',
      width: 120,
      render: (text) => (
        <div
          style={{ fontSize: 32, borderLeft: `3px solid ${token.colorPrimary}` }}
          className=" w-full  flex items-center justify-center "
        >
          <SvgIcon name={text} />
        </div>
      ),
      ellipsis: true,
    },
    {
      title: 'Id'.toUpperCase(),
      dataIndex: 'id',
      key: 'id',
      width: 100,
      sorter: (a, b) => a.id - b.id,
      sortOrder: sortedInfo.columnKey === 'id' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: formatMessage({ id: 'common.name' }).toUpperCase(),
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: formatMessage({ id: 'common.protocol' }).toUpperCase(),
      dataIndex: 'protocol',
      key: 'protocol',
      filters: [
        { text: 'Other', value: '1' },
        { text: 'Z-Wave', value: '2' },
        { text: 'Zigbee', value: '3' },
      ],
      filteredValue: filteredInfo.protocol || null,
      onFilter: (value, record) => {
        return record.protocol.toString() === value.toString();
      },
      render: (_text, record) => <div>{convertProtocol(record.protocol)}</div>,
      ellipsis: true,
    },
    {
      title: formatMessage({ id: 'common.role' }).toUpperCase(),
      dataIndex: 'role',
      key: 'role',
      filters: [
        { text: formatMessage({ id: 'common.other' }), value: '1' },
        { text: formatMessage({ id: 'common.light' }), value: '2' },
        { text: formatMessage({ id: 'common.temperatureSensor' }), value: '3' },
      ],
      filteredValue: filteredInfo.role || null,
      onFilter: (value, record) => {
        return record.role.toString() === value.toString();
      },
      render: (_text, record) => <div>{convertRole(record.role)}</div>,
      ellipsis: true,
    },
    {
      title: formatMessage({ id: 'common.room' }).toUpperCase(),
      dataIndex: 'roomId',
      key: 'roomId',
      filters: [
        { text: formatMessage({ id: 'common.livingRoom' }), value: '1' },
        { text: formatMessage({ id: 'common.bedRoom' }), value: '2' },
        { text: formatMessage({ id: 'common.kitchen' }), value: '3' },
      ],
      filteredValue: filteredInfo.roomId || null,
      onFilter: (value, record) => record.roomId.toString() === value.toString(),
      sorter: (a, b) => convertRoom(a.roomId).localeCompare(convertRoom(b.roomId)),
      sortOrder: sortedInfo.columnKey === 'roomId' ? sortedInfo.order : null,
      render: (_text, record) => <div>{convertRoom(record.roomId)}</div>,
      ellipsis: true,
    },
    Table.EXPAND_COLUMN,
  ];

  return (
    <Row>
      <Col span={24} className=" h-full">
        <Space className="mx-4 mt-4">{advanceSearchForm}</Space>
        <Col span={24} className="mx-4  items-start">
          <Button onClick={clearFilters} className="mr-4">
            {formatMessage({ id: 'common.clearFilters' })}
          </Button>
          <Button onClick={clearAll}>{formatMessage({ id: 'common.clearAll' })}</Button>
        </Col>
        <Table
          style={{ height: 360, marginTop: 24 }}
          className="items-start content-start "
          css={getDevicesListCss(token)}
          columns={columns}
          dataSource={data}
          onChange={handleChange}
          bordered={false}
          pagination={{ position: ['none', 'bottomCenter'] }}
          expandable={{
            expandedRowRender,
          }}
        />
      </Col>
    </Row>
  );
};

export default SettingDevices;
