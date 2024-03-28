import { Line } from '@ant-design/plots';
import { theme } from 'antd';

const TinyLine = () => {
  const thme = theme.useToken();
  const config = {
    title: 'Energy balance in time',

    data: {
      type: 'fetch',
      value: 'https://gw.alipayobjects.com/os/antvdemo/assets/data/blockchain.json',
      transform: [
        {
          type: 'fold',
          fields: ['blockchain', 'nlp'],
          key: 'type',
          value: 'value',
        },
      ],
    },

    legend: {
      color: {
        // itemLabelFill: '#f2f',
        // itemMarker: 'line',
        // itemMarkerFill: 'blue',
        titleInset: 10,
      },
    },
    xField: (d: any) => new Date(d.date),
    yField: 'value',
    colorField: 'type',
    axis: {
      x: {
        labelFill: thme.token.colorText,
        title: 'Date',
        titleFill: thme.token.colorPrimary,
        // line: true,
        // arrow: true,
      },
      y: {
        labelFill: thme.token.colorText,
        title: 'Value',
        titleFill: thme.token.colorPrimary,
        // line: true,
        // arrow: true,
      },
    },

    interaction: {
      legendFilter: true,
    },
    // annotations: [
    //   {
    //     type: 'text',
    //     data: [new Date('2017-12-17'), 100],
    //     style: {
    //       text: `grgrgrg`,
    //       wordWrap: true,
    //       wordWrapWidth: 164,
    //       dx: -174,
    //       dy: 30,
    //       fill: '#2C3542',
    //       fillOpacity: 0.65,
    //       fontSize: 12,
    //       background: true,
    //       backgroundRadius: 2,
    //       connector: true,
    //       startMarker: true,
    //       startMarkerFill: '#2C3542',
    //       startMarkerFillOpacity: 0.65,
    //     },
    //     tooltip: false,
    //   },
    // ],
  };

  return <Line {...config} />;
};

export default TinyLine;
