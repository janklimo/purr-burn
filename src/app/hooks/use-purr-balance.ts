import useSWR from 'swr';

type Balance = {
  coin: string;
  token: number;
  total: string;
  hold: string;
  entryNtl: string;
};

const fetcher = async ([url]: [string]) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      type: 'spotClearinghouseState',
      user: '0x16b9d3859E5A152b9Fca5A6f5b6527dA37618841',
    }),
  });

  if (!res.ok) throw new Error('Network response was not ok');

  const data = await res.json();
  const purrData = data.balances.find((b: Balance) => b.coin === 'PURR');
  return purrData ? parseFloat(purrData.total) : 0;
};

export const usePurrBalance = () => {
  const {
    data: purrBalance,
    error,
    isLoading,
  } = useSWR(
    ['https://api.hyperliquid.xyz/info', 'fetchPurrBalance'],
    fetcher,
    {
      refreshInterval: 3000, // Refresh every 3 seconds
      refreshWhenHidden: true, // Continue refreshing when the page is in the background
    },
  );

  return {
    purrBalance: purrBalance ?? 0,
    loading: isLoading,
    error,
  };
};
