import { Radio, RadioGroup } from '@headlessui/react';
import { FC } from 'react';

import { useActiveTableStore } from '@/state/stores';

const tables = [
  { title: 'Holders 💎🤲', value: 'holders' },
  { title: 'Buyers 📈', value: 'buyers' },
  { title: 'Sellers 📉', value: 'sellers' },
];

const TableSelector: FC = () => {
  const activeTable = useActiveTableStore((state) => state.activeTable);
  const setActiveTable = useActiveTableStore((state) => state.setActiveTable);

  return (
    <div className='w-full px-4 mt-8'>
      <div className='mx-auto w-full max-w-md'>
        <RadioGroup
          value={activeTable}
          onChange={setActiveTable}
          aria-label='Server size'
          className='grid grid-cols-1 md:grid-cols-3 gap-4 justify-center'
        >
          {tables.map((table) => (
            <Radio
              key={table.title}
              value={table.value}
              className='group relative flex border border-hl-light cursor-pointer rounded-lg bg-white/5 py-4 px-5 text-white shadow-md transition focus:outline-none data-[checked]:bg-primary-200/20 data-[checked]:border data-[checked]:border-hl-primary'
            >
              <div className='flex justify-center w-full text-sm/6'>
                <span className='font-semibold text-white text-sm'>
                  {table.title}
                </span>
              </div>
            </Radio>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};

export default TableSelector;
