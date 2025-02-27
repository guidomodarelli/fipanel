import type { Logger } from '@/core/contexts/shared/logger/domain/Logger';
import * as echarts from 'echarts';
import { useEffect, useRef, useState } from 'react';

interface TimeMachineChartProps {
  logger: Logger;
  years: number[];
  series: number[][];
}

export const TimeMachineChart: React.FC<TimeMachineChartProps> = ({ logger, years = [], series = [] }) => {
  const container = useRef<HTMLDivElement>(null);
  const chart = useRef<echarts.ECharts>(null);
  const [option, setOption] = useState({
    xAxis: {
      type: 'category',
      data: years,
    },
    yAxis: {
      type: 'value',
    },
    series: series.map((data) => ({
      data,
      type: 'line',
      smooth: true,
    })),
  });

  useEffect(() => {
    setOption({
      xAxis: {
        type: 'category',
        data: years,
      },
      yAxis: {
        type: 'value',
      },
      series: series.map((data) => ({
        data,
        type: 'line',
        smooth: true,
      })),
    });
  }, [years, series]);

  const handleResize = () => {
    logger.debug('Resizing chart');
    chart.current?.resize();
  };

  useEffect(() => {
    chart.current = echarts.init(container.current, null, {
      renderer: 'canvas',
      useDirtyRect: true,
    });

    chart.current?.setOption(option);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.current?.dispose();
    };
  }, []);

  useEffect(() => {
    if (years.length === 0 || series.length === 0) return;
    if (series.every((data) => data.length === 0)) return;

    logger.debug('Rendering chart with years:', years, 'and series:', series);
    chart.current?.setOption(option);
  }, [option]);

  return <div className='h-[30vh] w-full relative overflow-hidden' ref={container} />;
};
