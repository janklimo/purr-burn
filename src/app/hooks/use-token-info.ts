import useSWR from 'swr';

interface TokenInfo {
  totalSupply: string;
  circulatingSupply: string;
  nonCirculatingUserBalances: [string, string][];
}

const fetcher = (url: string) =>
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      tokenId: '0xc1fb593aeffbeb02f85e0308e9956a90',
      type: 'tokenDetails',
    }),
  }).then((res) => res.json());

const useTokenInfo = () => {
  const { data, error } = useSWR<TokenInfo>(
    'https://api.hyperliquid.xyz/info',
    fetcher,
    { refreshInterval: 3_000 },
  );

  return {
    tokenInfo: data,
    error,
    isLoading: !error && !data,
  };
};

export default useTokenInfo;
