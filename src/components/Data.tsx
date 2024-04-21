// pages/index.js
import { useEffect, useState } from 'react';

const Data = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const socket = new WebSocket('wss://api-ui.hyperliquid.xyz/ws');

    // Listen for the connection to open and send the message
    socket.addEventListener('open', () => {
      // Send the message to the server
      socket.send(
        JSON.stringify({
          method: 'subscribe',
          subscription: { type: 'activeSpotAssetCtx', coin: 'PURR/USDC' },
        }),
      );
    });

    // Listen for messages
    socket.addEventListener('message', (event) => {
      console.log('Message from server ', event.data);
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

  return (
    <div>
      <h1>Real-Time Chat</h1>
      <div>
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
    </div>
  );
};

export default Data;
