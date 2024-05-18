import { create } from 'zustand';

interface AddressState {
  address: string | undefined;
  setAddress: (address: string) => void;
}

export const useAddressStore = create<AddressState>((set) => ({
  address: undefined,
  setAddress: (address: string) => set({ address }),
}));

/**
 * Active table
 */
type ActiveTable = 'holders' | 'buyers' | 'sellers';
export type ActivePeriod = 'day' | 'week';

interface ActiveTableState {
  activeTable: ActiveTable;
  setActiveTable: (value: ActiveTable) => void;
  activePeriod: ActivePeriod;
  setActivePeriod: (value: ActivePeriod) => void;
}

export const useActiveTableStore = create<ActiveTableState>((set) => ({
  activeTable: 'holders',
  setActiveTable: (activeTable: ActiveTable) => set({ activeTable }),
  activePeriod: 'week',
  setActivePeriod: (activePeriod: ActivePeriod) => set({ activePeriod }),
}));
