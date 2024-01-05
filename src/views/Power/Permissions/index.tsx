import { Button, Space, Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { initAsyncRoute } from '@/router/utils';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setPower } from '@/store/modules/user';
import { useGetPostsQuery } from '@/server';
import type { TPost } from '@/server/apiType';
const columns: ColumnsType<TPost> = [
  {
    title: 'id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'title',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'body',
    dataIndex: 'body',
    key: 'body',
  },
];
const Permissions = () => {
  const dispatch = useAppDispatch();

  const power = useAppSelector((state) => state.user.power);

  const { data, error, isFetching, refetch } = useGetPostsQuery(undefined);

  const setCount = async () => {
    const newPower = power === 'admin' ? 'test' : 'admin';
    dispatch(setPower(newPower));
    initAsyncRoute(newPower);
  };

  return (
    <>
      <Space>
        <Button type="primary" onClick={setCount}>
          {power} Switch permissions
        </Button>
        <Button type="primary" loading={isFetching} onClick={refetch}>
          Fetch post
        </Button>
      </Space>
      <Table
        className="mt-4"
        loading={isFetching}
        footer={() => (
          <Typography.Text type="secondary">
            {error ? error.message : 'Powered by RTK Query'}
          </Typography.Text>
        )}
        columns={columns}
        dataSource={data}
        scroll={{ y: 440 }}
        rowKey="id"
      />
    </>
  );
};

export default Permissions;
