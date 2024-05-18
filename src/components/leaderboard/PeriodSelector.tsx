import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { FC, Fragment } from 'react';

import { cn } from '@/lib/utils';

import { ActivePeriod, useActiveTableStore } from '@/state/stores';

type Options = {
  [Key in ActivePeriod]: string;
};

const options: Options = { day: 'Past day', week: 'Past week' };

const PeriodSelector: FC = () => {
  const activeTable = useActiveTableStore((state) => state.activeTable);
  const activePeriod = useActiveTableStore((state) => state.activePeriod);
  const setActivePeriod = useActiveTableStore((state) => state.setActivePeriod);

  if (activeTable === 'holders') return null;

  return (
    <Listbox value={activePeriod} onChange={setActivePeriod}>
      {({ open }) => (
        <div className='flex justify-center'>
          <div className='w-full md:w-48 mt-5 px-4'>
            <div className='relative inline mt-2'>
              <ListboxButton className='relative w-full cursor-default rounded-md bg-input-background py-1.5 pl-3 pr-10 text-left text-white shadow-sm ring-1 ring-inset ring-input-border focus:outline-none focus:ring-1 focus:ring-accent sm:text-sm sm:leading-6'>
                <span className='block truncate'>{options[activePeriod]}</span>
                <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                  <ChevronUpDownIcon
                    className='h-5 w-5 text-gray-400'
                    aria-hidden='true'
                  />
                </span>
              </ListboxButton>

              <Transition
                show={open}
                as={Fragment}
                leave='transition ease-in duration-100'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
              >
                <ListboxOptions className='absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-input-background py-1 text-base shadow-lg ring-1 ring-input-border focus:outline-none sm:text-sm'>
                  {Object.entries(options).map(([period, label]) => (
                    <ListboxOption
                      key={period}
                      className={({ focus }) =>
                        cn(
                          focus ? 'bg-table-hover text-white' : 'text-white',
                          'relative cursor-default select-none py-2 pl-3 pr-9',
                        )
                      }
                      value={period}
                    >
                      {({ selected, focus }) => (
                        <>
                          <span
                            className={cn(
                              selected ? 'font-semibold' : 'font-normal',
                              'block truncate',
                            )}
                          >
                            {label}
                          </span>

                          {selected ? (
                            <span
                              className={cn(
                                focus ? 'text-white' : 'text-accent',
                                'absolute inset-y-0 right-0 flex items-center pr-4',
                              )}
                            >
                              <CheckIcon
                                className='h-4 w-4'
                                aria-hidden='true'
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </Transition>
            </div>
          </div>
        </div>
      )}
    </Listbox>
  );
};

export default PeriodSelector;
