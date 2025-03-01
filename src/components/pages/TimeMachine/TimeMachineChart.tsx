import { useSidebar } from '@/components/ui/sidebar';
import type { Logger } from '@/core/contexts/shared/logger/domain/Logger';
import * as echarts from 'echarts';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Subject } from 'rxjs/internal/Subject';
import { debounceTime } from 'rxjs/operators';

interface TimeMachineChartProps {
  logger: Logger;
  years: number[];
  series: number[][];
  legend?: string[];
}

export const TimeMachineChart: React.FC<TimeMachineChartProps> = ({ logger, years = [], series = [], legend = [] }) => {
  const { open } = useSidebar();
  const container = useRef<HTMLDivElement>(null);
  const chart = useRef<echarts.ECharts>(null);
  const [option, setOption] = useState<echarts.EChartsOption>({});
  const resizeNotifier$ = new Subject<void>();

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
        name: legend[index],
        type: 'line',
        smooth: true,
      })),
    });
  }, [JSON.stringify(years), JSON.stringify(series), JSON.stringify(legend)]);

  const handleResize = useCallback(() => {
    logger.debug('Resizing chart');
    chart.current?.resize();
  }, []);

  const lazyResize = () => {
    resizeNotifier$.next();
  };

  useEffect(() => {
    resizeNotifier$.next();
  }, [open]);

  useEffect(() => {
    chart.current = echarts.init(container.current, null, {
      renderer: 'canvas',
      useDirtyRect: true,
    });

    window.addEventListener('resize', lazyResize);
    resizeNotifier$.pipe(debounceTime(100)).subscribe(handleResize);

    return () => {
      window.removeEventListener('resize', lazyResize);
      resizeNotifier$.complete();
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
