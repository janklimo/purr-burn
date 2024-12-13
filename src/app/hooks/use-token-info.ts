import useSWR from 'swr';

interface TokenInfo {
  totalSupply: string;
  circulatingSupply: string;
  nonCirculatingUserBalances: [string, string][];
}

async function fetcher(url: string) {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      tokenId: '0xc1fb593aeffbeb02f85e0308e9956a90',
      type: 'tokenDetails',
    }),
  });

  if (!res.ok) {
    throw new Error('Network response was not ok');
  }

  return await res.json();
}

const useTokenInfo = () => {
  const { data, error } = useSWR<TokenInfo>(
    ['https://api.hyperliquid.xyz/info', 'fetchPurrTokenInfo'],
    ([url]) => fetcher(url),
    {
      refreshInterval: 1_500,
    },
  );

  return {
    tokenInfo: data,
    error,
    isLoading: !error && !data,
  };
};

export default useTokenInfo;
