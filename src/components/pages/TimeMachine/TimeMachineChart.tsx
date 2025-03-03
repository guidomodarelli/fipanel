import { EChart } from '@/components/EChart';
import type { Logger } from '@/core/contexts/shared/logger/domain/Logger';
import type * as echarts from 'echarts';
import { useEffect, useState } from 'react';
import type { Legend } from './types';

interface TimeMachineChartProps {
  logger: Logger;
  years: number[];
  series: number[][];
  legend?: Legend[];
}

export const TimeMachineChart: React.FC<TimeMachineChartProps> = ({ logger, years = [], series = [], legend = [] }) => {
  const [option, setOption] = useState<echarts.EChartsOption>({});

  useEffect(() => {
    if (years.length === 0 || series.length === 0) return;
    if (series.every((data) => data.length === 0)) return;
    if (legend.length > 0 && series.length !== legend.length) {
      logger.error('Series and legend length mismatch');
      return;
    }

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
        right: 135,
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
        name: legend[index].name,
        color: legend[index].color,
        type: 'line',
        smooth: true,
      })),
    });
  }, [JSON.stringify(years), JSON.stringify(series), JSON.stringify(legend)]);

  return <EChart logger={logger.getLogger([EChart.name], 'disabled')} option={option} />;
};
