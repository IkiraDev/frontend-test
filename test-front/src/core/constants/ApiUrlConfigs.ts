export const binance_config = {
  baseUrl: process.env.BINANCE_BASE_URL,
  websocketURL: process.env.BINANCE_WEBSOCKET_URL,
  queries: {
    exchangeInfo: "/exchangeInfo",
  },
  listeners: {},
};
