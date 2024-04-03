import { useLocale } from '@/locales';
import type { IDevicesListItem1, IListIconItem } from '@/utils/constant';
import { FAKE_DATA, ListIconImage } from '@/utils/constant';
import { getCollapseCss } from '@/views/Home/style';
import { RightOutlined } from '@ant-design/icons';
import type { CollapseProps } from 'antd';
import { Button, Col, Collapse, List, Popconfirm, Row, Typography, message } from 'antd';
import type { DataNode } from 'antd/es/tree';
import { useCallback, useState } from 'react';
import CardDev from './components/Card';
import DrawerControl from './components/DrawerControl';
import EditAreaFormModal from './components/EditAreaModal';
import type { IAnchorItem2 } from './utils/utils';
import { findNodesWithTitle, generateAnchorList2 } from './utils/utils';

interface ExtendedDataNode extends DataNode {
  titleWithNoIcon?: string; // Extending TreeProps and adding the children property
}
interface DataT {
  titleWithNoIcon?: string;
  location: string;
}
const CollapseProp: CollapseProps = {
  bordered: true,
  ghost: true,
  size: 'small',
  expandIcon({ isActive }) {
    return <RightOutlined style={{ fontSize: 16 }} rotate={isActive ? 90 : 0} />;
  },
};

const DetailArea = ({
  data,
  keyChose,
  location,
}: {
  data: ExtendedDataNode;
  keyChose: React.Key;
  location: string;
}) => {
  const anchorItems2 = generateAnchorList2(
    FAKE_DATA.devicesList.items,
    FAKE_DATA.sectionList.items,
  );
  const abc: DataT = {
    titleWithNoIcon: data && data.titleWithNoIcon,
    location: location && location,
  };
  // useCallback to memoize the function generateCollapseItems
  const generateCollapseItems = useCallback((list: IAnchorItem2[]) => {
    const getChild = (list: IAnchorItem2[]): CollapseProps['items'] => {
      const render: CollapseProps['items'] = [];
      list.forEach((item) => {
        if (item.children && item.children.length) {
          console.log(`collapse${item.key}`);
          return render.push({
            key: `collapse${item.key}`,
            label: (
              <Typography.Title style={{ marginBottom: 0 }} level={4} id={item.key}>
                {item.title}
              </Typography.Title>
            ),
            // children: (
            //   <Collapse
            //     {...CollapseProp}
            //     defaultActiveKey={item.children.map((child) => `collapse${child.key}`)}
            //     items={generateCollapseItems(item.children)}
            //   />
            // ),
          });
        }
        if (item.renderDevice && item.renderDevice.length) {
          return render.push({
            key: `collapse${item.key}`,
            label: (
              <Typography.Title style={{ marginBottom: 0 }} level={4} id={item.key}>
                {item.title}
              </Typography.Title>
            ),
            children: (
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
                style={{ paddingTop: 24 }}
                dataSource={item.renderDevice}
                renderItem={(device) => {
                  const icon = ListIconImage[device.id % ListIconImage.length] || ListIconImage[0];
                  return (
                    <List.Item>
                      <CardDev
                        onClick={() => {
                          setSelectedIcon(icon);
                          setSelectedDevice(device);
                        }}
                        device={device}
                        icon={icon}
                      />
                    </List.Item>
                  );
                }}
              />
            ),
          });
        }
      });
      return render;
    };
    const render = getChild(list);
    return render;
  }, []);
  const confirm = (e?: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    message.success('Click on Yes');
  };
  const cancel = (e?: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    message.error('Click on No');
  };
  const [open, setOpen] = useState<boolean>(false);

  const [selectedDevice, setSelectedDevice] = useState<IDevicesListItem1 | null>(null);
  const [selectedIcon, setSelectedIcon] = useState<IListIconItem>();
  const onClose = () => {
    setSelectedDevice(null);
  };
  const collapseArray = [];
  for (let i = 1; i <= 20; i++) {
    collapseArray.push(i);
  }
  const onCreate = () => {
    setOpen(false);
  };
  const { formatMessage } = useLocale();

  return data ? (
    <div css={getCollapseCss()}>
      <Collapse
        {...CollapseProp}
        defaultActiveKey={collapseArray.map((item) => `collapseanchor${item}`)}
        ghost
        items={generateCollapseItems(
          findNodesWithTitle(anchorItems2, data?.titleWithNoIcon ?? '', keyChose, []),
        )}
      />
      <DrawerControl icon={selectedIcon} device={selectedDevice} onClose={onClose} />
      <Popconfirm
        title="Delete the area"
        description="Are you sure to delete this area?"
        onConfirm={confirm}
        onCancel={cancel}
        okText="Yes"
        cancelText="No"
      >
        <Button danger className="absolute top-2 right-4">
          {formatMessage({ id: 'common.delete' })}
        </Button>
      </Popconfirm>
      <Button type="primary" className="absolute top-2 right-24" onClick={() => setOpen(true)}>
        {formatMessage({ id: 'common.edit' })}
      </Button>
      <EditAreaFormModal
        open={open}
        onCreate={onCreate}
        onCancel={() => setOpen(false)}
        initialValues={abc}
      />
    </div>
  ) : (
    <div className="p-4 m-4">
      <Row className="flex justify-between">
        <Typography.Title>{formatMessage({ id: 'common.basicInformation' })}</Typography.Title>
      </Row>
      <Row gutter={24} style={{ marginTop: 16 }}>
        <Col xl={8} lg={24} style={{ paddingRight: 24 }}>
          <img
            style={{ width: '100%', height: '100%' }}
            src={
              'https://luci.vn/wp-content/uploads/2024/02/png-clipart-smart-city-innovation-business-urban-design-city-building-city-removebg-preview.png.webp'
            }
          />
        </Col>
        <Col xl={16} lg={17} md={24}>
          <Row className="mb-4 text-">
            <Col span={4}>{formatMessage({ id: 'common.projectName' })}:</Col>
            <Col offset={1} span={19} style={{ fontWeight: 'bold' }}>
              Luci IBMS
            </Col>
          </Row>
          <Row className="mb-4">
            <Col span={4}>{formatMessage({ id: 'common.domainName' })}:</Col>
            <Col offset={1} span={19} style={{ fontWeight: 'bold' }}>
              https://luci.vn/
            </Col>
          </Row>
          <Row className="mb-4">
            <Col span={4}>{formatMessage({ id: 'common.city' })}:</Col>
            <Col offset={1} span={19} style={{ fontWeight: 'bold' }}>
              Tp. Hà Nội
            </Col>
          </Row>
          <Row className="mb-4">
            <Col span={4}>{formatMessage({ id: 'common.address' })}:</Col>
            <Col offset={1} span={19} style={{ fontWeight: 'bold' }}>
              Tầng 2, toà New Skyline, Đường Nguyễn Khuyến, Phường Văn Quán, Quận Hà Đông,
            </Col>
          </Row>
          <Row className="mb-4">
            <Col span={4}>{formatMessage({ id: 'common.introduce' })}:</Col>
            <Col offset={1} span={19} style={{ whiteSpace: 'pre-wrap' }}>
              Luci iBMS là một hệ thống đồng bộ, cho phép quản lý, điều khiển các hệ thống cơ điện,
              cung cấp nước sinh hoạt, điều hòa thông gió, cảnh báo môi trường, an ninh, báo cháy
              trong một tòa nhà…đảm bảo cho việc vận hành các thiết bị trong toàn được chính xác,
              kịp thời, hiệu quả, tiết kiệm năng lượng.
              <Col style={{ whiteSpace: 'pre-wrap', marginTop: 16 }}>
                Bằng cách tích hợp với các thiết bị IoT, hệ thống cho phép trao đổi và liên lạc dữ
                liệu theo thời gian thực giữa các thành phần khác nhau của tòa nhà. Sự tích hợp liền
                mạch này giúp nâng cao hiệu quả tổng thể và khả năng đáp ứng của các hoạt động xây
                dựng.
              </Col>
            </Col>
          </Row>
          <Row className="mb-4">
            <Col span={4}>Email:</Col>
            <Col offset={1} span={19} style={{ fontWeight: 'bold' }}>
              info@luci.vn
            </Col>
          </Row>
          <Row className="mb-4">
            <Col span={4}>Hotline:</Col>
            <Col span={19} offset={1} style={{ fontWeight: 'bold' }}>
              <Typography.Paragraph
                ellipsis={{ rows: 1 }}
                code
                css={{
                  [':where(.css-dev-only-do-not-override-15v93vd).ant-typography code']: {
                    margin: 0,
                  },
                }}
              >
                0888 729 119
              </Typography.Paragraph>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default DetailArea;
