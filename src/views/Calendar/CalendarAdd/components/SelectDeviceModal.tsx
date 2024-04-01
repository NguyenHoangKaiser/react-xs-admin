import SvgIcon from '@/components/SvgIcon';
import type { IDevicesListItem1 } from '@/utils/constant';
import { FAKE_DATA, ListIconImage } from '@/utils/constant';
import type { CheckboxProps } from 'antd';
import {
  Card,
  Checkbox,
  Col,
  Flex,
  Input,
  List,
  Modal,
  Row,
  Skeleton,
  Typography,
  theme,
} from 'antd';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

interface ModalProps {
  open: boolean;
  onCancel: () => void;
  setListDevices: React.Dispatch<React.SetStateAction<number[]>>;
  listDevices: number[];
}

const SelectDeviceModal = ({ open, onCancel, setListDevices, listDevices }: ModalProps) => {
  const { token } = theme.useToken();
  const [checkedList, setCheckedList] = useState<number[]>(listDevices);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<IDevicesListItem1[]>([]);

  const checkAll = FAKE_DATA.devicesList.items.length === checkedList.length;

  const indeterminate =
    checkedList.length > 0 && checkedList.length < FAKE_DATA.devicesList.items.length;

  const onCheckAllChange: CheckboxProps['onChange'] = (e) => {
    setCheckedList(e.target.checked ? FAKE_DATA.devicesList.items.map((item) => item.id) : []);
  };

  const onChange = (device: IDevicesListItem1, checked: boolean) => {
    if (!checked) {
      setCheckedList([...checkedList, device.id]);
    } else {
      setCheckedList(checkedList.filter((item) => item !== device.id));
    }
  };

  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);

    // Simulate fetching data from the FAKE_DATA.devicesList.items
    setTimeout(() => {
      setData(FAKE_DATA.devicesList.items);
      setLoading(false);
    }, 3000); // Load more data every 3 seconds
  };

  useEffect(() => {
    loadMoreData();
  }, []);

  return (
    <Modal
      open={open}
      title={'Chọn thiết bị'}
      okText="Lưu"
      cancelText="Hủy"
      okButtonProps={{ autoFocus: true }}
      onCancel={onCancel}
      destroyOnClose
      onOk={() => {
        setListDevices(checkedList);
        onCancel();
      }}
      width={'80%'}
    >
      <Row className="pt-4 h-full w-full">
        <Col span={24}>
          <Row gutter={16} className=" items-center mb-2">
            <Col xxl={6} xl={8} lg={10} md={12}>
              <Input.Search placeholder="Tìm kiếm thiết bị" />
            </Col>
            <Col xxl={18} xl={16} lg={14} md={12}>
              <Flex justify="end">
                <Checkbox
                  indeterminate={indeterminate}
                  onChange={onCheckAllChange}
                  checked={checkAll}
                >
                  Chọn tất cả
                </Checkbox>
              </Flex>
            </Col>
          </Row>
          <div
            id="scrollableDiv"
            style={{
              height: 500,
              overflow: 'auto',
              border: `1px solid ${token.colorBorder}`,
              borderRadius: 8,
            }}
          >
            <InfiniteScroll
              dataLength={data.length}
              next={loadMoreData}
              hasMore={data.length < FAKE_DATA.devicesList.items.length}
              loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
              scrollableTarget="scrollableDiv"
            >
              <List
                grid={{
                  gutter: 16,
                  xs: 1,
                  sm: 2,
                  md: 4,
                  lg: 6,
                  xl: 8,
                  xxl: 10,
                }}
                style={{ padding: 16 }}
                dataSource={data}
                renderItem={(device) => {
                  const icon = ListIconImage[device.id % ListIconImage.length] || ListIconImage[0];

                  return (
                    <List.Item>
                      <Card
                        hoverable
                        styles={{
                          body: {
                            padding: 16,
                            paddingTop: 10,
                          },
                        }}
                        onClick={() => {
                          onChange(
                            device,
                            checkedList.some((checkItem) => checkItem === device.id),
                          );
                        }}
                      >
                        <Checkbox
                          checked={checkedList.some((checkItem) => checkItem === device.id)}
                        />
                        <Flex vertical justify="center" align="center" className="pt-2">
                          <div className="h-[60px]">
                            <span style={{ fontSize: '60px' }}>
                              <SvgIcon name={icon.type} />
                            </span>
                          </div>
                          <Typography.Title
                            style={{
                              margin: 0,
                            }}
                            level={5}
                          >
                            {device.name}
                          </Typography.Title>
                        </Flex>
                      </Card>
                    </List.Item>
                  );
                }}
              />
            </InfiniteScroll>
          </div>
        </Col>
      </Row>
    </Modal>
  );
};
export default SelectDeviceModal;
