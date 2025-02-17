import DolarCard from '@/components/cards/DolarCard/DolarCard';
import IPCCard from '@/components/cards/IPCCard/IPCCard';
import InterestRateCard from '@/components/cards/InterestRateCard/InterestRateCard';
import { SIDEBAR_TRIGGER_HEIGHT } from '@/components/sidebar/Sidebar';

export default function Home() {
  return (
    <div
      className={`flex flex-col gap-4 items-center`}
      style={{ height: `calc(100% - ${SIDEBAR_TRIGGER_HEIGHT})` }}
    >
      <div className='flex gap-4 flex-col md:flex-row'>
        <IPCCard />
        <DolarCard />
        <InterestRateCard />
      </div>
    </div>
  );
}
