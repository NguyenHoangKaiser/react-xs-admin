import SvgIcon from '@/components/SvgIcon';
import { useLocale } from '@/locales';
import { css } from '@emotion/react';
import type { SliderSingleProps } from 'antd';
import { Button, Col, Modal, Row, Segmented, Slider, theme } from 'antd';
import { useState } from 'react';

interface ControlACProps {
  open?: boolean;
  onOk?: () => void;
  onCancel?: () => void;
}

const ControlACModal = (props: ControlACProps) => {
  const { token } = theme.useToken();
  const { formatMessage } = useLocale();
  const { open, onOk, onCancel } = props;
  const [modeAC, setModeAC] = useState<'cool' | 'wet' | 'heat' | 'fan' | 'auto'>('cool');
  const marks: SliderSingleProps['marks'] = {
    0: {
      style: {
        color: token.colorSuccess,
      },
      label: <strong>0°C</strong>,
    },
    16: {
      style: {
        color: token.colorPrimary,
      },
      label: <strong>16°C</strong>,
    },
    30: {
      style: {
        color: token.colorWarning,
      },
      label: <strong>30°C</strong>,
    },
  };
  return (
    <Modal
      open={open}
      title={formatMessage({ id: 'calendar.controlAC' })}
      okText={formatMessage({ id: 'manageAccount.save' })}
      cancelText={formatMessage({ id: 'tab.close' })}
      onOk={onOk}
      onCancel={onCancel}
      width={'40%'}
    >
      <Row>
        <Col span={24}>
          <Row className="py-2">
            <Col span={3}>
              <Button className="w-full h-[40px] flex items-center justify-center">
                <SvgIcon name="leaf" className="text-[24px]" />
              </Button>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Slider
            min={0}
            max={30}
            range
            marks={marks}
            defaultValue={[0]}
            disabled={modeAC === 'wet' || modeAC === 'fan'}
          />
        </Col>
        <Col span={24}>
          <Row gutter={16} className="pb-2">
            <Col span={12}>{formatMessage({ id: 'calendar.mode' })}</Col>
            <Col span={12}>{formatMessage({ id: 'calendar.fan' })}</Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row gutter={16} className="pb-2">
            <Col span={12}>
              <Segmented<'cool' | 'wet' | 'heat' | 'fan' | 'auto'>
                css={css`
                  .ant-segmented-item-label {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  }
                `}
                size="large"
                block
                options={[
                  {
                    value: 'cool',
                    icon: <SvgIcon name="snowflake" className="text-2xl" />,
                  },
                  { value: 'wet', icon: <SvgIcon name="waterdrop" className="text-2xl" /> },
                  { value: 'heat', icon: <SvgIcon name="sun" className="text-2xl" /> },
                  { value: 'fan', icon: <SvgIcon name="fan" className="text-2xl" /> },
                  {
                    value: 'auto',
                    icon: <strong style={{ color: token.colorSuccess, fontSize: 24 }}>A</strong>,
                  },
                ]}
                onChange={(value) => setModeAC(value)}
              />
            </Col>
            <Col span={12}>
              <Segmented
                css={css`
                  .ant-segmented-item-label {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  }
                `}
                size="large"
                block
                options={[
                  {
                    value: '1',
                    icon: <SvgIcon name="bar-chart-1" className="text-3xl" />,
                  },
                  { value: '2', icon: <SvgIcon name="bar-chart-2" className="text-3xl" /> },
                  { value: '3', icon: <SvgIcon name="bar-chart-3" className="text-3xl" /> },
                  { value: '4', icon: <SvgIcon name="bar-chart-4" className="text-3xl" /> },
                  {
                    value: '0',
                    icon: <strong style={{ color: token.colorSuccess, fontSize: 24 }}>A</strong>,
                  },
                ]}
              />
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row gutter={16} className="pb-2">
            <Col span={12}>{formatMessage({ id: 'calendar.verticalWind' })}</Col>
            <Col span={12}>{formatMessage({ id: 'calendar.horizontalWind' })}</Col>
          </Row>
        </Col>

        <Col span={24}>
          <Row gutter={16} className="pb-2">
            <Col span={12}>
              <Segmented
                css={css`
                  .ant-segmented-item-label {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  }
                `}
                size="large"
                block
                options={[
                  {
                    value: 'cool',
                    icon: <SvgIcon name="v-wind-1" className="text-2xl" />,
                  },
                  { value: 'wet', icon: <SvgIcon name="v-wind-2" className="text-2xl" /> },
                  { value: 'heat', icon: <SvgIcon name="v-wind-3" className="text-2xl" /> },
                  { value: 'fan', icon: <SvgIcon name="v-wind-4" className="text-2xl" /> },
                  {
                    value: 'auto',
                    icon: <strong style={{ color: token.colorSuccess, fontSize: 24 }}>A</strong>,
                  },
                ]}
              />
            </Col>
            <Col span={12}>
              <Segmented
                css={css`
                  .ant-segmented-item-label {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  }
                `}
                size="large"
                block
                options={[
                  {
                    value: '1',
                    icon: <SvgIcon name="h-wind-1" className="text-3xl" />,
                  },
                  { value: '2', icon: <SvgIcon name="h-wind-2" className="text-3xl" /> },
                  { value: '3', icon: <SvgIcon name="h-wind-3" className="text-3xl" /> },
                  {
                    value: '0',
                    icon: <strong style={{ color: token.colorSuccess, fontSize: 24 }}>A</strong>,
                  },
                ]}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Modal>
  );
};

export default ControlACModal;
