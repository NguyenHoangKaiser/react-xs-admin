import SvgIcon from '@/components/SvgIcon';
import type { DataType } from '@/utils/constant';
import { compareByPower, isNumeric } from '@/utils/is';
import Icon, {
  DeleteOutlined,
  EyeOutlined,
  InfoCircleOutlined,
  RightOutlined,
} from '@ant-design/icons';
import { useAntdTable } from 'ahooks';
import type { GetProps, TableColumnsType, TableProps } from 'antd';
import { Button, Col, Form, Input, Row, Select, Space, Table, Tooltip } from 'antd';
import type { CSSProperties } from 'react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    image: 'medal',
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
function mapNumberToLetter(num: number): string {
  const letterMap: { [key: number]: string } = {
    1: 'Living Room',
    2: 'Bed Room',
    3: 'Kitchen',
    // Add more mappings as needed
  };

  return letterMap[num] || ''; // Return an empty string if the number is not in the map
}

type CustomIconComponentProps = GetProps<typeof Icon>;

const BatterySvg = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={800}
    height={800}
    fill="none"
    viewBox="0 0 24 24"
    color="#fff"
    {...props}
  >
    <path
      stroke={'#000'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 13v-2M6.2 18h10.6c1.12 0 1.68 0 2.108-.218a2 2 0 0 0 .874-.874C20 16.48 20 15.92 20 14.8V9.2c0-1.12 0-1.68-.218-2.108a2 2 0 0 0-.874-.874C18.48 6 17.92 6 16.8 6H6.2c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C3 7.52 3 8.08 3 9.2v5.6c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874C4.52 18 5.08 18 6.2 18Z"
    />
  </svg>
);
const BatteryIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={BatterySvg} {...props} />
);
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
  // const { token } = theme.useToken();
  const navigate = useNavigate();
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
        <Form.Item name="gender" initialValue="male">
          <Select style={{ width: 120 }} onChange={submit}>
            <Option value="">all</Option>
            <Option value="male">male</Option>
            <Option value="female">female</Option>
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

  const columns: TableColumnsType<DataType> = [
    {
      title: 'Icon',
      dataIndex: 'image',
      key: 'image',
      align: 'center',
      width: 100,

      render: (text) => (
        <span style={{ fontSize: 32 }}>
          <SvgIcon name={text} />
        </span>
      ),

      ellipsis: true,
    },
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      width: 50,
      sorter: (a, b) => a.id - b.id,
      sortOrder: sortedInfo.columnKey === 'id' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',

      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: 'Protocol',
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
      render: (_text, record) => <div>{record.protocol === 1 ? 'Other' : record.protocol}</div>,
      ellipsis: true,
    },
    {
      title: 'Role',
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
      render: (_text, record) => <div>{record.role === 1 ? 'Other' : record.role}</div>,
      ellipsis: true,
    },

    {
      title: 'Room',
      dataIndex: 'roomId',
      key: 'roomId',
      filters: [
        { text: 'Living Room', value: '1' },
        { text: 'Bed Room', value: '2' },
        { text: 'Kitchen', value: '3' },
      ],
      filteredValue: filteredInfo.roomId || null,
      onFilter: (value, record) => record.roomId.toString() === value.toString(),
      sorter: (a, b) => mapNumberToLetter(a.roomId).localeCompare(mapNumberToLetter(b.roomId)),
      sortOrder: sortedInfo.columnKey === 'roomId' ? sortedInfo.order : null,
      render: (_text, record) => <div>{record.roomId === 1 ? 'Living Room' : record.roomId}</div>,

      ellipsis: true,
    },
    {
      title: 'Power',
      dataIndex: 'power',
      key: 'power',
      filters: [
        { text: 'On', value: true },
        { text: 'Off', value: false },
      ],
      filteredValue: filteredInfo.power || null,
      onFilter: (value, record) => {
        return isNumeric(record.power) === value;
      },
      sorter: (a, b) => compareByPower(a, b),
      sortOrder: sortedInfo.columnKey === 'power' ? sortedInfo.order : null,
      render: (_text, record) => (
        <div className="w-10 h-10 flex items-center justify-center">
          {isNumeric(record.power) ? (
            <BatteryIcon style={{ fontSize: 25 }} />
          ) : (
            <BatteryIcon style={{ fontSize: 25, visibility: 'hidden', color: 'transparent' }} />
          )}
        </div>
      ),

      ellipsis: true,
    },
    {
      title: '',
      key: 'action',
      align: 'right',
      render: () => (
        <Space size="middle" className="justify-between   px-6">
          <EyeOutlined
            style={{ ...iconStyles, color: '#1677FF' }}
            onClick={() => navigate('/home')}
          />
          <Space>
            <DeleteOutlined style={{ ...iconStyles, color: 'red' }} />
          </Space>
          <Space>
            <RightOutlined style={{ ...iconStyles }} />
          </Space>
        </Space>
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
          className="mx-4 items-start content-start "
          //css={getDevicesListCss(token)}
          columns={columns}
          dataSource={data}
          onChange={handleChange}
          bordered={true}
          pagination={{ position: ['none', 'bottomCenter'] }}
        />
      </Col>
    </Row>
  );
};

export default SettingDevices;
