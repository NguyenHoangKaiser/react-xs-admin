import SvgIcon from '@/components/SvgIcon';
import { RouteEnum } from '@/router/utils';
import type { TIconType } from '@/utils/constant';
import { CopyIcon, Pencil1Icon, PlayIcon, TrashIcon } from '@radix-ui/react-icons';
import { Button, Col, Input, Row, Space, Switch, Table, type TableColumnsType } from 'antd';
import { useNavigate } from 'react-router-dom';

interface DataType {
  id: string;
  icon: TIconType;
  name: string;
  status: number;
}

const columns: TableColumnsType<DataType> = [
  {
    title: 'Icon',
    dataIndex: 'icon',
    key: 'icon',
    align: 'center',
    width: 100,
    render: (icon) => (
      <div style={{ fontSize: 32 }}>
        <SvgIcon name={icon} />
      </div>
    ),
  },
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    align: 'center',
    width: 80,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    align: 'center',
    width: 100,
    render: (status) => (
      <Switch checkedChildren={'Active'} unCheckedChildren={'Inactive'} checked={!!status} />
    ),
  },
  {
    title: 'Run',
    key: 'run',
    align: 'center',
    width: 100,
    render: () => (
      <div className="flex items-center justify-center">
        <Button
          type="primary"
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 4 }}
        >
          <PlayIcon height={20} width={20} />
        </Button>
      </div>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    align: 'center',
    render: () => (
      <Space size={'large'}>
        <Button
          type="default"
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 4 }}
        >
          <CopyIcon height={20} width={20} />
        </Button>
        <Button
          type="default"
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 4 }}
        >
          <Pencil1Icon height={20} width={20} />
        </Button>
        <Button
          type="dashed"
          danger
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 4 }}
        >
          <TrashIcon height={20} width={20} />
        </Button>
      </Space>
    ),
  },
  Table.EXPAND_COLUMN,
];

const data: DataType[] = [
  {
    id: '1',
    name: 'Scene 1',
    icon: 'light-bulb',
    status: 1,
  },
  {
    id: '2',
    name: 'Scene 2',
    icon: 'air-conditioner',
    status: 0,
  },
  {
    id: '3',
    name: 'Scene 3',
    icon: 'maintenance',
    status: 1,
  },
  {
    id: '4',
    name: 'Scene 4',
    icon: 'fan',
    status: 0,
  },
  {
    id: '5',
    name: 'Scene 5',
    icon: 'light-bulb',
    status: 1,
  },
  {
    id: '6',
    name: 'Scene 6',
    icon: 'air-conditioner',
    status: 0,
  },
  {
    id: '7',
    name: 'Scene 7',
    icon: 'maintenance',
    status: 1,
  },
  {
    id: '8',
    name: 'Scene 8',
    icon: 'fan',
    status: 0,
  },
  {
    id: '9',
    name: 'Scene 9',
    icon: 'light-bulb',
    status: 1,
  },
  {
    id: '10',
    name: 'Scene 10',
    icon: 'air-conditioner',
    status: 0,
  },
  {
    id: '11',
    name: 'Scene 11',
    icon: 'maintenance',
    status: 1,
  },
  {
    id: '12',
    name: 'Scene 12',
    icon: 'fan',
    status: 0,
  },
  {
    id: '13',
    name: 'Scene 13',
    icon: 'light-bulb',
    status: 1,
  },
  {
    id: '14',
    name: 'Scene 14',
    icon: 'air-conditioner',
    status: 0,
  },
  {
    id: '15',
    name: 'Scene 15',
    icon: 'maintenance',
    status: 1,
  },
  {
    id: '16',
    name: 'Scene 16',
    icon: 'fan',
    status: 0,
  },
  {
    id: '17',
    name: 'Scene 17',
    icon: 'light-bulb',
    status: 1,
  },
  {
    id: '18',
    name: 'Scene 18',
    icon: 'air-conditioner',
    status: 0,
  },
  {
    id: '19',
    name: 'Scene 19',
    icon: 'maintenance',
    status: 1,
  },
  {
    id: '20',
    name: 'Scene 20',
    icon: 'fan',
    status: 0,
  },
];

export default () => {
  const navigate = useNavigate();

  return (
    <>
      <Row>
        <Col
          style={{
            padding: '8px 16px',
          }}
          span={24}
        >
          <Button
            type="primary"
            onClick={() => {
              // setOpen(true);
              navigate(RouteEnum.SettingsScenesAdd);
            }}
          >
            Add Scene
          </Button>
          <Input.Search style={{ width: 200, float: 'right' }} />
        </Col>
      </Row>
      <div>
        <Table
          expandable={{
            expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.name}</p>,
            // rowExpandable: (record) => record.name !== 'Not Expandable',
          }}
          columns={columns}
          rowKey="id"
          dataSource={data}
          pagination={{
            defaultPageSize: 20,
            // hideOnSinglePage: true,
            // showSizeChanger: true,
            // pageSizeOptions: ['10', '20', '50', '100'],
            // position: ['topCenter'],
          }}
        />
      </div>
    </>
  );
};

// const tableCss = css`
//   .ant-table-tbody {
//     height: calc(100vh - 220px);
//   }
// `;
