import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    CACHE_PROVIDER: "memory",
    CACHE_HOST: "127.0.0.1",
    CACHE_PORT: "6379",
    CACHE_PWD: "",
    NEXT_PUBLIC_WEBSOCKET_URL: "wss://stream.binance.com:9443",
    BINANCE_BASE_URL: "https://api.binance.com/api/v3",
    BINANCE_WEBSOCKET_URL: "wss://ws-api.binance.com:443/ws-api/v3",
  },
};

export default nextConfig;
