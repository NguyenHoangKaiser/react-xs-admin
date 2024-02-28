// const columns: ColumnsType<ITodo> = [
//   {
//     title: 'id',
//     dataIndex: 'id',
//     key: 'id',
//   },
//   {
//     title: 'title',
//     dataIndex: 'title',
//     key: 'title',
//   },
//   {
//     title: 'userId',
//     dataIndex: 'userId',
//     key: 'userId',
//   },
// ];
const Permissions = () => {
  // const dispatch = useAppDispatch();

  // const token = useAppSelector((state) => state.user.access_token);

  // const { isError, error, isFetching, refetch, data } = useGetTodosQuery(undefined, {
  //   skip: !power?.includes('admin'),
  // });

  // const setCount = async () => {
  //   const newPower = power?.includes('admin') ? ['test'] : ['admin'];
  //   dispatch(setPower(newPower));
  //   initAsyncRoute(token!);
  // };

  return (
    <>
      {/* <Space>
        <Button type="primary" onClick={setCount}>
          {power?.toString()} Switch permissions
        </Button>
        <Button type="primary" loading={isFetching} onClick={refetch}>
          Fetch post
        </Button>
      </Space> */}
      {/* <Table
        className="mt-4"
        loading={isFetching}
        footer={() => (
          <Typography.Text type="secondary">
            {isError ? getErrMsg(error) : 'Powered by RTK Query'}
          </Typography.Text>
        )}
        columns={columns}
        dataSource={data}
        scroll={{ y: 440 }}
        rowKey="id"
      /> */}
    </>
  );
};

export default Permissions;
