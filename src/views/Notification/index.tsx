import type { TableColumnsType, TableProps } from 'antd';
import { Button, Col, Input, Row, Table, Typography } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';

interface DataType {
  key: string;
  title: string;
  type: 'all' | 'error' | 'maintain' | 'firealarm';
  content: string;
  time: number;
}

type Filters = Parameters<NonNullable<TableProps<DataType>['onChange']>>[1];

type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<NonNullable<TableProps<DataType>['onChange']>>[2]>;

const convertType = (type: 'all' | 'error' | 'maintain' | 'firealarm') => {
  switch (type) {
    case 'error':
      return 'Lỗi thiết bị';
    case 'maintain':
      return 'Bảo trì thiết bị';
    case 'firealarm':
      return 'Báo cháy';
    default:
      return '';
  }
};

const Notification = () => {
  const [filteredInfo, setFilteredInfo] = useState<Filters>({});
  const [sortedInfo, setSortedInfo] = useState<Sorts>({});

  const columns: TableColumnsType<DataType> = [
    { title: 'STT', dataIndex: 'key', key: '#', width: 60, align: 'center' },
    { title: 'Tiêu đề', dataIndex: 'title', key: 'title' },
    {
      title: 'Loại thông báo',
      dataIndex: 'type',
      key: 'type',
      render: (value) => {
        return <Typography.Text>{convertType(value)}</Typography.Text>;
      },
      filters: [
        { text: 'Lỗi thiết bị', value: 'error' },
        { text: 'Bảo trì thiết bị', value: 'maintain' },
        { text: 'Báo cháy', value: 'firealarm' },
      ],
      filteredValue: filteredInfo.type || null,
      onFilter: (value, record) => record.type.includes(value.toString()),
    },
    { title: 'Nội dung', dataIndex: 'content', key: 'content' },
    {
      title: 'Thời gian',
      dataIndex: 'time',
      key: 'time',
      render: (value) => {
        return <Typography.Text>{dayjs.unix(value).format('hh:mm, DD/MM/YYYY')}</Typography.Text>;
      },
      sorter: (a, b) => a.time - b.time,
      sortOrder: sortedInfo.columnKey === 'time' ? sortedInfo.order : null,
    },
  ];

  const data: DataType[] = [
    {
      key: '1',
      title: 'Thông báo cháy',
      type: 'firealarm',
      content: 'Cháy nhà tầng 1',
      time: 1563215463,
    },
    {
      key: '2',
      title: 'Thông báo hỏng thiết bị',
      type: 'error',
      content: 'Hỏng thiết bị tầng 1',
      time: 1563215465,
    },
    {
      key: '3',
      title: 'Thông báo bảo trì',
      type: 'maintain',
      content: 'Thiết bị tầng 1 cần bảo trì',
      time: 1563215465,
    },
    {
      key: '4',
      title: 'Thông báo cháy',
      type: 'firealarm',
      content: 'Cháy nhà tầng 1',
      time: 1563216465,
    },
    {
      key: '5',
      title: 'Thông báo cháy',
      type: 'firealarm',
      content: 'Cháy nhà tầng 1',
      time: 1563213461,
    },
    {
      key: '6',
      title: 'Thông báo cháy',
      type: 'firealarm',
      content: 'Cháy nhà tầng 1',
      time: 1563218468,
    },
    {
      key: '7',
      title: 'Thông báo cháy',
      type: 'firealarm',
      content: 'Cháy nhà tầng 1',
      time: 1563218468,
    },
    {
      key: '8',
      title: 'Thông báo cháy',
      type: 'firealarm',
      content: 'Cháy nhà tầng 1',
      time: 1563218468,
    },
    {
      key: '9',
      title: 'Thông báo cháy',
      type: 'firealarm',
      content: 'Cháy nhà tầng 1',
      time: 1693218468,
    },
    {
      key: '10',
      title: 'Thông báo cháy',
      type: 'firealarm',
      content: 'Cháy nhà tầng 1',
      time: 1713218468,
    },
    {
      key: '11',
      title: 'Thông báo cháy',
      type: 'firealarm',
      content: 'Cháy nhà tầng 1',
      time: 1713218468,
    },
  ];

  const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter) => {
    console.log('params', pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter as Sorts);
  };

  const clearFilters = () => {
    setFilteredInfo({});
  };

  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };

  return (
    <Row className="w-full h-full p-4">
      <Col span={24}>
        <Col span={6} className="mb-4">
          <Input.Search placeholder="Nhập nội dung tìm kiếm" />
        </Col>
        <Col span={24} className="items-start mb-4">
          <Button onClick={clearFilters} className="mr-4">
            Clear filters
          </Button>
          <Button onClick={clearAll}>Clear filters and sorters</Button>
        </Col>
        <Table
          columns={columns}
          dataSource={data}
          scroll={{ x: 1000 }}
          bordered
          onChange={onChange}
        />
      </Col>
    </Row>
  );
};

export default Notification;
