import { Cache } from "../types/Cache";

export const CacheProviderOption: Cache.ProviderNames = process.env
  .CACHE_PROVIDER as Cache.ProviderNames;

export const CacheProviderProps: Cache.ProviderProps = {
  host: process.env.CACHE_HOST as string,
  port: +(process.env.CACHE_PORT || 6379),
  password: process.env.CACHE_PWD as string,
};

export const CacheDefaultTTL = 60 * 5; // seconds * minutes
