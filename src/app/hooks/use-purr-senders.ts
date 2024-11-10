import { useEffect, useState } from 'react';

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

interface ApiResponse {
  data: PurrSender[];
  loading: boolean;
  error: Error | null;
}

const address = '0x16b9d3859E5A152b9Fca5A6f5b6527dA37618841';

const usePurrSenders = (): ApiResponse => {
  const [data, setData] = useState<PurrSender[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchAndProcessTransactions = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://api.hyperliquid.xyz/info', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: 'userNonFundingLedgerUpdates',
            user: address,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const transactions: Transaction[] = await response.json();

        // Process transactions
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
        const sortedSenders = Array.from(senderMap.values())
          .filter((sender) => sender.totalSent > 0)
          .sort((a, b) => {
            // Primary sort by total amount sent
            const amountDiff = b.totalSent - a.totalSent;
            if (amountDiff !== 0) return amountDiff;
            // Secondary sort by most recent transaction
            return b.lastSent - a.lastSent;
          });

        setData(sortedSenders);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error
            ? err
            : new Error('An error occurred while fetching data'),
        );
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAndProcessTransactions();
  }, [address]);

  return { data, loading, error };
};

export default usePurrSenders;
