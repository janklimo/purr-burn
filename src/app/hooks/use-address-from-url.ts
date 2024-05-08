import { useSearchParams } from 'next/navigation';

const useAddressFromURL = () => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const setAddressParam = (address: string) => {
    params.set('address', address);
    window.history.pushState(null, '', `?${params.toString()}`);
  };

  const addressParam = params.get('address');

  return { addressParam, setAddressParam };
};

export default useAddressFromURL;
