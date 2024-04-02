import { Line } from '@ant-design/plots';
import { theme } from 'antd';

const LineChart = () => {
  const thme = theme.useToken();
  const data = [
    { year: '1991', value: 3 },
    { year: '1992', value: 4 },
    { year: '1993', value: 3.5 },
    { year: '1994', value: 5 },
    { year: '1995', value: 4.9 },
    { year: '1996', value: 6 },
    { year: '1997', value: 7 },
    { year: '1998', value: 9 },
    { year: '1999', value: 13 },
  ];
  const config = {
    data,
    xField: 'year',
    yField: 'value',
    point: {
      shapeField: 'diamond',
      sizeField: '4',
    },
    interaction: {
      tooltip: {
        marker: true,
      },
    },
    style: {
      lineWidth: 2,
    },
    axis: {
      x: {
        labelFill: thme.token.colorText,
      },
      y: {
        labelFill: thme.token.colorText,
      },
    },
  };
  return <Line {...config} />;
};

export default LineChart;
