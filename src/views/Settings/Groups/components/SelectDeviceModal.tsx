import SvgIcon from '@/components/SvgIcon';
import { useLocale } from '@/locales';
import type { IDevicesListItem1, IGroupDevices } from '@/utils/constant';
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
  formData?: IGroupDevices;
}

const colLayout = {
  xs: { span: 12 },
  md: { span: 12 },
  lg: { span: 10 },
  xl: { span: 8 },
  xxl: { span: 6 },
};

const colLayout2 = {
  xs: { span: 12 },
  md: { span: 12 },
  lg: { span: 14 },
  xl: { span: 16 },
  xxl: { span: 18 },
};

const SelectDeviceModal = ({ open, onCancel, formData }: ModalProps) => {
  const { token } = theme.useToken();
  const { formatMessage } = useLocale();
  const [checkedList, setCheckedList] = useState<number[]>([]);
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

  console.log('formData', formData);

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
      title={formatMessage({ id: 'group.selectDevice' })}
      okText={formatMessage({ id: 'manageAccount.save' })}
      cancelText={formatMessage({ id: 'group.cancel' })}
      okButtonProps={{ autoFocus: true }}
      onCancel={onCancel}
      destroyOnClose
      onOk={() => {}}
      width={'80%'}
    >
      <Row className="pt-4 h-full w-full">
        <Col span={24}>
          <Row className="px-4 items-center mb-2">
            <Col {...colLayout}>
              <Input.Search placeholder="Search device" />
            </Col>
            <Col {...colLayout2}>
              <Flex justify="end">
                <Checkbox
                  indeterminate={indeterminate}
                  onChange={onCheckAllChange}
                  checked={checkAll}
                >
                  {formatMessage({ id: 'group.selectAll' })}
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
