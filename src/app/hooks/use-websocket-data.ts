import { useEffect, useState } from 'react';

interface MessageContext {
  prevDayPx: string;
  dayNtlVlm: string;
  markPx: string;
  midPx: string;
  circulatingSupply: string;
}

interface MessageData {
  channel: string;
  data: {
    coin: string;
    ctx?: MessageContext;
  };
}

const useWebSocketData = () => {
  const [data, setData] = useState<MessageContext | undefined>();

  useEffect(() => {
    const socket = new WebSocket('wss://api-ui.hyperliquid.xyz/ws');

    // Listen for the connection to open and send the message
    socket.addEventListener('open', () => {
      // Send the message to the server
      socket.send(
        JSON.stringify({
          method: 'subscribe',
          subscription: { type: 'activeAssetCtx', coin: 'PURR/USDC' },
        }),
      );
    });

    // Listen for messages
    socket.addEventListener('message', (event) => {
      const messageData: MessageData = JSON.parse(event.data);

      if (messageData.data.ctx) {
        setData(messageData.data.ctx);
      }
    });

    // Handle any errors that occur
    socket.addEventListener('error', (error) => {
      console.error('WebSocket Error: ', error);
    });

    // Clean up function
    return () => {
      socket.close();
    };
  }, []);

  return data;
};

export default useWebSocketData;
