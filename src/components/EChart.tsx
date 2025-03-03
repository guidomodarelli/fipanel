import { SIDEBAR_ANIMATION_DURATION, useSidebar } from '@/components/ui/sidebar';
import type { Logger } from '@/core/contexts/shared/logger/domain/Logger';
import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';
import { Subject } from 'rxjs/internal/Subject';

interface EChartProps {
  logger: Logger;
  option: echarts.EChartsOption;
}

export const EChart: React.FC<EChartProps> = (props) => {
  const { logger } = props;
  const { open } = useSidebar();
  const container = useRef<HTMLDivElement>(null);
  const chart = useRef<echarts.ECharts>(null);
  const resizeNotifier$ = useRef(new Subject<void>());

  useEffect(() => {
    logger.debug('Initializing chart');
    chart.current = echarts.init(container.current, null, {
      renderer: 'canvas',
    });

    window.addEventListener('resize', emitResizeEvent);
    // resizeNotifier$.current.pipe(debounceTime(SIDEBAR_ANIMATION_DURATION + 10)).subscribe({
    //   next: () => {
    //     chart.current?.resize(); // Final resize to ensure correct dimensions
    //   },
    // });
    resizeNotifier$.current.subscribe({
      next: () => {
        const startTime = Date.now();
        let animationFrame: number;

        const animate = () => {
          logger.debug('Animating resize');
          chart.current?.resize();
          if (Date.now() - startTime < SIDEBAR_ANIMATION_DURATION + 50) {
            animationFrame = requestAnimationFrame(animate);
          } else {
            cancelAnimationFrame(animationFrame);
          }
        };

        animationFrame = requestAnimationFrame(animate);
      },
    });

    return () => {
      window.removeEventListener('resize', emitResizeEvent);
      resizeNotifier$.current.complete();
      chart.current?.dispose();
    };
  }, []);

  useEffect(() => {
    chart.current?.setOption(props.option);
  }, [props.option]);

  const emitResizeEvent = () => {
    resizeNotifier$.current.next();
  };

  useEffect(() => {
    emitResizeEvent();
  }, [open]);

  return <div className='h-[33vh] w-full relative overflow-hidden' ref={container} />;
};
