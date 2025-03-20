import { CryptoStreamEventReturn, IWebsocketContext } from "@/core/interfaces/IWebsocketContext";
import { createContext, PropsWithChildren, useContext, useRef, useState } from "react";

const initialValue: IWebsocketContext<WebSocket | null> = {
  socket: null,
  connected: false,
  getSymbolUpdates: () => null,
  closeSocketUpdates: () => null,
};

export const WebsocketContext = createContext<IWebsocketContext<WebSocket | null>>(initialValue);

export const WebsocketProvider = ({ children, url }: PropsWithChildren<{ url?: string }>) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [connected, setConnected] = useState<boolean>(false);
  const wsRef = useRef<WebSocket | null>(null);

  const getSymbolUpdates = (
    symbols: string[],
    updaterCallback?: (ev: CryptoStreamEventReturn) => void
  ) => connect({ symbols, updaterCallback });

  const closeSocketUpdates = () => wsRef.current?.close();

  const connect = ({ symbols = [], updaterCallback }: connectProps) => {
    closeSocketUpdates();

    const queryString = `/stream`;
    wsRef.current = new WebSocket(
      (url || (process.env.NEXT_PUBLIC_WEBSOCKET_URL as string)) + queryString
    );

    wsRef.current.onopen = (open) => {
      setConnected(true);
      setSocket(wsRef.current);

      const request = {
        id: Date.now(),
        method: "SUBSCRIBE",
        params: symbols.map((symbol) => `${symbol.toLowerCase()}@ticker`),
      };

      wsRef.current?.send(JSON.stringify(request));
    };

    wsRef.current.onmessage = (ev) => {
      const message: CryptoStreamEventReturn & { ping?: any } = JSON.parse(ev.data);
      if (!message?.data?.s || message?.ping) return;
      updaterCallback?.(message);
    };

    wsRef.current.onclose = (ev) => {
      setConnected(false);
    };
  };

  return (
    <WebsocketContext.Provider value={{ socket, connected, getSymbolUpdates, closeSocketUpdates }}>
      {children}
    </WebsocketContext.Provider>
  );
};

export const useSocket = () => useContext(WebsocketContext);

type connectProps = {
  symbols?: string[];
  updaterCallback?: (ev: CryptoStreamEventReturn) => void;
};
