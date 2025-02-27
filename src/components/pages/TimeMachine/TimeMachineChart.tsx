import type { Logger } from '@/core/contexts/shared/logger/domain/Logger';
import * as echarts from 'echarts';
import { useEffect, useRef, useState } from 'react';

interface TimeMachineChartProps {
  logger: Logger;
  years: number[];
  series: number[][];
  legend?: string[];
}

export const TimeMachineChart: React.FC<TimeMachineChartProps> = ({ logger, years = [], series = [], legend = [] }) => {
  const container = useRef<HTMLDivElement>(null);
  const chart = useRef<echarts.ECharts>(null);
  const [option, setOption] = useState<echarts.EChartsOption>({});

  useEffect(() => {
    setOption({
      ...(legend.length > 0 && {
        legend: {
          data: legend,
          orient: 'vertical',
          right: 1,
          top: 50,
        },
      }),
      tooltip: {
        trigger: 'axis',
      },
      grid: {
        left: '1%',
        right: '21%',
        bottom: '1%',
        containLabel: true,
      },
      toolbox: {
        feature: {
          saveAsImage: {
            title: 'Guardar imagen',
          },
        },
      },
      xAxis: {
        type: 'category',
        data: years,
      },
      yAxis: {
        type: 'value',
      },
      series: series.map((data, index) => ({
        data,
        name: legend[index],
        type: 'line',
        smooth: true,
      })),
    });
  }, [JSON.stringify(years), JSON.stringify(series), JSON.stringify(legend)]);

  const handleResize = () => {
    logger.debug('Resizing chart');
    chart.current?.resize();
  };

  useEffect(() => {
    chart.current = echarts.init(container.current, null, {
      renderer: 'canvas',
      useDirtyRect: true,
    });

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.current?.dispose();
    };
  }, []);

  useEffect(() => {
    if (years.length === 0 || series.length === 0) return;
    if (series.every((data) => data.length === 0)) return;
    if (legend.length > 0 && series.length !== legend.length) {
      logger.error('Series and legend length mismatch');
      return;
    }

    logger.debug('Rendering chart with years:', years, 'and series:', series);
    chart.current?.setOption(option);
  }, [option]);

  return <div className='h-[33vh] w-full relative overflow-hidden' ref={container} />;
};
