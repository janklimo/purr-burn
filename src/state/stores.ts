import { create } from 'zustand';

interface AddressState {
  address: string | undefined;
  setAddress: (address: string) => void;
}

export const useAddressStore = create<AddressState>((set) => ({
  address: undefined,
  setAddress: (address: string) => set({ address }),
}));
