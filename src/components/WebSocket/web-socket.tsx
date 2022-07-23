import React, { useEffect, useState } from 'react';

import { WebSocketProps } from './web-socket.props';

export const WS: React.FC<WebSocketProps> = (props) => {
  const [reconnect, setReconnect] = useState<boolean>(false);

  useEffect(() => {
    React.useCallback(() => {
      setReconnect(!!props.reconnect);
      const webSocket = new WebSocket(props.url);
      handleWebSocketSetup(webSocket);

      return () => {
        setReconnect(false);
        webSocket.close();
      };
    }, []);
  });
  useEffect(() => {});

  const handleWebSocketSetup = (webSocket: WebSocket) => {
    webSocket.onopen = () => {
      props.onOpen && props.onOpen(webSocket);
    };
    webSocket.onmessage = (event) => {
      props.onMessage && props.onMessage(event);
    };
    webSocket.onerror = (error) => {
      props.onError && props.onError(error);
    };
    webSocket.onclose = () => {
      reconnect
        ? handleWebSocketSetup(webSocket)
        : props.onClose && props.onClose();
    };
  };
  return null;
};
