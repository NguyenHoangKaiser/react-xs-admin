import SvgIcon from '@/components/SvgIcon';
import type { DataType } from '@/utils/constant';
import { DownOutlined, InfoCircleOutlined, RightOutlined } from '@ant-design/icons';
import { useAntdTable } from 'ahooks';
import type { TableColumnsType, TableProps, TabsProps } from 'antd';
import { Button, Col, Form, Input, Row, Select, Space, Table, Tabs, Tooltip, theme } from 'antd';
import type { CSSProperties } from 'react';
import React, { useState } from 'react';
import Advance from './components/Advance';
import DeviceDetail from './components/DeviceDetail';
import Preview from './components/Preview';
import { getDevicesListCss } from './style';

const { Option } = Select;
type OnChange = NonNullable<TableProps<DataType>['onChange']>;
type Filters = Parameters<OnChange>[1];

type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;

const iconStyles: CSSProperties = {
  color: 'rgba(0, 0, 0, 0.2)',
  fontSize: '18px',
  verticalAlign: 'middle',
  cursor: 'pointer',
};
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
    1: 'Living Room',
    2: 'Bed Room',
    3: 'Kitchen',
    // Add more mappings as needed
  };

  return letterMap[num] || ''; // Return an empty string if the number is not in the map
}
export function convertProtocol(num: number): string {
  const letterMap: { [key: number]: string } = {
    1: 'Other',
    2: 'Z-Wave',
    3: 'Zigbee',
    // Add more mappings as needed
  };

  return letterMap[num] || ''; // Return an empty string if the number is not in the map
}
export function convertRole(num: number): string {
  const letterMap: { [key: number]: string } = {
    1: 'Other',
    2: 'Light',
    3: 'Temperature sensor',
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
    defaultType: 'advance',
  });
  const { type, changeType, submit, reset } = search;
  const clearFilters = () => {
    setFilteredInfo({});
  };

  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };
  const [expended, setExpended] = useState('0');

  const expandedRowRender = (record: DataType) => {
    const onChange = (key: string) => {
      console.log(key);
    };

    const items: TabsProps['items'] = [
      {
        key: '1',
        label: 'General',
        children: <DeviceDetail record={record} />,
      },

      {
        key: '2',
        label: 'Advance',
        children: <Advance record={record} />,
      },
      {
        key: '3',
        label: 'Preview',
        children: <Preview record={record} />,
      },
    ];
    return <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;
  };
  const advanceSearchForm = (
    <div>
      <Form form={form}>
        <Row>
          <Col span={6} className="mr-4">
            <Form.Item>
              <Input
                maxLength={255}
                placeholder={'name'}
                prefix={
                  <Tooltip title={'search name'}>
                    <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                  </Tooltip>
                }
                onChange={(e) => console.log('e', e)}
              />
            </Form.Item>
          </Col>
          <Col span={6} className="mr-4">
            <Form.Item>
              <Input placeholder="email" />
            </Form.Item>
          </Col>
          <Col span={6} className="mr-4">
            <Form.Item>
              <Input placeholder="phone" />
            </Form.Item>
          </Col>
          <Col>
            <Button type="primary" onClick={submit}>
              Search
            </Button>
            <Button onClick={reset} style={{ marginLeft: 16 }}>
              Reset
            </Button>
            <Button type="link" onClick={changeType}>
              Simple Search
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );

  const searchForm = (
    <div>
      <Form form={form}>
        <Form.Item name="room" initialValue="all">
          <Select style={{ width: 120 }} onChange={submit}>
            <Option value="">all</Option>
            <Option value="1">Other</Option>
            <Option value="3">Kitchen</Option>
          </Select>
        </Form.Item>
        <Form.Item name="name">
          <Input.Search placeholder="enter name" style={{ width: 240 }} onSearch={submit} />
        </Form.Item>
        <Button type="link" onClick={changeType}>
          Advanced Search
        </Button>
      </Form>
    </div>
  );
  const expend = (index: any) => {
    if (expended === index) setExpended('0');
    else setExpended(index);
  };
  const columns: TableColumnsType<DataType> = [
    {
      title: 'Icon'.toUpperCase(),
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
      title: 'Name'.toUpperCase(),
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: 'Protocol'.toUpperCase(),
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
      title: 'Role'.toUpperCase(),
      dataIndex: 'role',
      key: 'role',
      filters: [
        { text: 'Other', value: '1' },
        { text: 'Light', value: '2' },
        { text: 'Temperature sensor', value: '3' },
      ],
      filteredValue: filteredInfo.role || null,
      onFilter: (value, record) => {
        return record.role.toString() === value.toString();
      },
      render: (_text, record) => <div>{convertRole(record.role)}</div>,
      ellipsis: true,
    },
    {
      title: 'Room'.toUpperCase(),
      dataIndex: 'roomId',
      key: 'roomId',
      filters: [
        { text: 'Living Room', value: '1' },
        { text: 'Bed Room', value: '2' },
        { text: 'Kitchen', value: '3' },
      ],
      filteredValue: filteredInfo.roomId || null,
      onFilter: (value, record) => record.roomId.toString() === value.toString(),
      sorter: (a, b) => convertRoom(a.roomId).localeCompare(convertRoom(b.roomId)),
      sortOrder: sortedInfo.columnKey === 'roomId' ? sortedInfo.order : null,
      render: (_text, record) => <div>{convertRoom(record.roomId)}</div>,

      ellipsis: true,
    },
    // {
    //   title: 'Power',
    //   dataIndex: 'power',
    //   key: 'power',
    //   filters: [
    //     { text: 'On', value: true },
    //     { text: 'Off', value: false },
    //   ],
    //   filteredValue: filteredInfo.power || null,
    //   onFilter: (value, record) => {
    //     return isNumeric(record.power) === value;
    //   },
    //   sorter: (a, b) => compareByPower(a, b),
    //   sortOrder: sortedInfo.columnKey === 'power' ? sortedInfo.order : null,
    //   render: (_text, record) => (
    //     <div className="w-10 h-10 flex items-center justify-center">
    //       {isNumeric(record.power) ? (
    //         <span>
    //           <BatteryGauge
    //             value={record.power}
    //             size={66}
    //             formatValue={undefined}
    //             aspectRatio={0.4}
    //           />
    //         </span>
    //       ) : (
    //         ''
    //       )}
    //     </div>
    //   ),

    //   ellipsis: true,
    // },
    {
      title: '',
      key: 'action',
      width: 100,
      render: (_text, _record, index) => (
        <div className="flex items-center justify-center ">
          <a type="text" onClick={() => expend(`${index + 1}`)}>
            {!expended.includes(`${index + 1}`) ? (
              <RightOutlined style={{ ...iconStyles }} />
            ) : (
              <DownOutlined style={{ ...iconStyles }} />
            )}
          </a>
        </div>
      ),
    },
  ];

  return (
    <Row>
      <Col span={24} className=" h-full">
        <Space className="m-4 items-start">
          {type === 'simple' ? searchForm : advanceSearchForm}
        </Space>
        <Col span={24} className="m-4 items-start">
          <Button onClick={clearFilters} className="mr-4">
            Clear filters
          </Button>
          <Button onClick={clearAll}>Clear filters and sorters</Button>
        </Col>

        <Table
          style={{ height: 360 }}
          className="items-start content-start "
          css={getDevicesListCss(token)}
          columns={columns}
          dataSource={data}
          onChange={handleChange}
          bordered={false}
          pagination={{ position: ['none', 'bottomCenter'] }}
          expandable={{
            expandedRowRender,
            expandIcon: () => undefined,
            expandedRowKeys: [expended],
            expandIconColumnIndex: -1,
          }}
        />
      </Col>
    </Row>
  );
};

export default SettingDevices;
