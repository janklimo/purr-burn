import useSWR from 'swr';

interface Transaction {
  time: number;
  hash: string;
  delta: {
    type: string;
    token: string;
    amount: string;
    usdcValue: string;
    user: string;
    destination: string;
    fee: string;
  };
}

export interface PurrSender {
  address: string;
  totalSent: number;
  lastSent: number; // timestamp of last transaction
}

const address = '0x16b9d3859E5A152b9Fca5A6f5b6527dA37618841';

const fetcher = async ([url]: [string]) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      type: 'userNonFundingLedgerUpdates',
      user: address,
    }),
  });

  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

  const transactions: Transaction[] = await res.json();
  const senderMap = new Map<string, PurrSender>();

  transactions.forEach((tx) => {
    if (tx.delta.token !== 'PURR') return;

    const amount = parseFloat(tx.delta.amount);

    // Case 1: Someone sending PURR to our address
    if (tx.delta.destination.toUpperCase() === address.toUpperCase()) {
      const sender = tx.delta.user.toUpperCase();
      const current = senderMap.get(sender) || {
        address: sender,
        totalSent: 0,
        lastSent: 0,
      };

      senderMap.set(sender, {
        address: sender,
        totalSent: current.totalSent + amount,
        lastSent: Math.max(current.lastSent, tx.time),
      });
    }

    // Case 2: Our address sending PURR back to someone
    if (tx.delta.user.toUpperCase() === address.toUpperCase()) {
      const receiver = tx.delta.destination.toUpperCase();
      const current = senderMap.get(receiver) || {
        address: receiver,
        totalSent: 0,
        lastSent: 0,
      };

      senderMap.set(receiver, {
        address: receiver,
        totalSent: current.totalSent - amount,
        lastSent: current.lastSent,
      });
    }
  });

  // Convert map to array and sort
  return Array.from(senderMap.values())
    .filter((sender) => sender.totalSent > 0)
    .sort((a, b) => {
      // Primary sort by total amount sent
      const amountDiff = b.totalSent - a.totalSent;
      if (amountDiff !== 0) return amountDiff;
      // Secondary sort by most recent transaction
      return b.lastSent - a.lastSent;
    });
};

const usePurrSenders = () => {
  const { data, error, isLoading } = useSWR(
    ['https://api.hyperliquid.xyz/info', 'fetchPurrSenders'],
    fetcher,
    {
      refreshInterval: 3000,
      refreshWhenHidden: true,
    },
  );

  return {
    data: data ?? [],
    loading: isLoading,
    error,
  };
};

export default usePurrSenders;
