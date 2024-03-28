import { Column } from '@ant-design/plots';
import { theme } from 'antd';

const ColumnChart = () => {
  const thme = theme.useToken();
  const config = {
    data: {
      type: 'fetch',
      value: 'https://render.alipay.com/p/yuyan/180020010001215413/antd-charts/column-column.json',
    },
    xField: 'letter',
    yField: 'frequency',
    label: {
      text: (d: any) => `${(d.frequency * 100).toFixed(1)}%`,
      textBaseline: 'bottom',
      fill: thme.token.colorText,
    },
    axis: {
      x: { labelAutoHide: 'greedy', labelFill: thme.token.colorText },
      y: {
        labelFormatter: '.0%',
        labelFill: thme.token.colorText,
      },
    },
    style: {
      // 圆角样式
      radiusTopLeft: 10,
      radiusTopRight: 10,
    },
  };
  return <Column {...config} />;
};

export default ColumnChart;
