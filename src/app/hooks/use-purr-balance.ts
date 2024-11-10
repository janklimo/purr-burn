import { useEffect, useState } from 'react';

type Balance = {
  coin: string;
  token: number;
  total: string;
  hold: string;
  entryNtl: string;
};

export const usePurrBalance = () => {
  const [purrBalance, setPurrBalance] = useState<number>(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPurrBalance = async () => {
      try {
        const response = await fetch('https://api.hyperliquid.xyz/info', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: 'spotClearinghouseState',
            user: '0x16b9d3859E5A152b9Fca5A6f5b6527dA37618841',
          }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const purrData = data.balances.find((b: Balance) => b.coin === 'PURR');
        setPurrBalance(purrData ? parseFloat(purrData.total) : 0);
      } catch (err: any) {
        setError(err.message);
        console.error('Error fetching PURR balance:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPurrBalance();
  }, []);

  return { purrBalance, loading, error };
};
