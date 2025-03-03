import { useSidebar } from '@/components/ui/sidebar';
import type { Logger } from '@/core/contexts/shared/logger/domain/Logger';
import * as echarts from 'echarts';
import { useCallback, useEffect, useRef } from 'react';
import { Subject } from 'rxjs/internal/Subject';
import { debounceTime } from 'rxjs/operators';

interface EChartProps {
  logger: Logger;
  option: echarts.EChartsOption;
}

export const EChart: React.FC<EChartProps> = (props) => {
  const { logger } = props;
  const { open } = useSidebar();
  const container = useRef<HTMLDivElement>(null);
  const chart = useRef<echarts.ECharts>(null);
  const resizeNotifier$ = new Subject<void>();

  useEffect(() => {
    chart.current = echarts.init(container.current, null, {
      renderer: 'canvas',
    });

    window.addEventListener('resize', emitResizeEvent);
    resizeNotifier$.pipe(debounceTime(100)).subscribe(handleResize);

    return () => {
      window.removeEventListener('resize', emitResizeEvent);
      resizeNotifier$.complete();
      chart.current?.dispose();
    };
  }, []);

  useEffect(() => {
    chart.current?.setOption(props.option);
  }, [props.option]);

  const handleResize = useCallback(() => {
    logger.debug('Resizing chart');
    chart.current?.resize();
  }, [logger]);

  const emitResizeEvent = useCallback(() => {
    resizeNotifier$.next();
  }, []);

  useEffect(() => {
    emitResizeEvent();
  }, [open]);

  return <div className='h-[33vh] w-full relative overflow-hidden' ref={container} />;
};
