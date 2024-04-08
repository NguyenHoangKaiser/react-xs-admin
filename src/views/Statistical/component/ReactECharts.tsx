import type { ECharts, EChartsOption, SetOptionOpts } from 'echarts';
import { getInstanceByDom, init } from 'echarts';
import type { CSSProperties } from 'react';
import { memo, useEffect, useRef, useState } from 'react';

export interface ReactEChartsProps {
  option: EChartsOption;
  style?: CSSProperties;
  settings?: SetOptionOpts;
  loading?: boolean;
  theme?: 'light' | 'dark';
}

export const ReactECharts = memo(
  ({ option, style, settings, loading, theme }: ReactEChartsProps): JSX.Element => {
    const [chart, setChart] = useState<ECharts>();
    const chartRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const eChart = init(chartRef.current, theme); // echarts theme
      eChart.setOption({ ...option, resizeObserver }, settings); // second param is for 'noMerge'
      setChart(eChart);
      if (resizeObserver) resizeObserver.observe(chartRef.current as Element);
    }, [option, resizeObserver]);

    useEffect(() => {
      if (!chart) {
        return;
      }
      if (loading) {
        chart.showLoading();
        return;
      }

      chart.hideLoading();
    }, [chart, loading]);

    return <div ref={chartRef} style={{ width: '100%', height: '100%', ...style }} />;
  },
);

const resizeObserver = new window.ResizeObserver((entries) => {
  entries.map(({ target }) => {
    const instance = getInstanceByDom(target as HTMLDivElement);
    if (instance) {
      console.log('resizeObserver');
      instance.resize();
    }
  });
});
