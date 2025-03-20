import { Cache } from "@/core/types/Cache";
import { MemoryCache } from "./MemoryCache";
import { RedisCache } from "./RedisCache";

export class CacheManager {
  static memory<T>(): Cache.Provider<T> {
    console.log("Cache local inicializado");
    return new MemoryCache<T>();
  }

  static redis<T>(options?: Cache.ProviderProps): Cache.Provider<T> {
    console.log("Redis inicializado");
    return new RedisCache<T>(options);
  }
}
