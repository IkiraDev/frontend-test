import { CacheProviderOption } from "../constants/CacheConfigs";
import { CacheManager } from "./cache/CacheManager";

export const CacheInstance = CacheManager[CacheProviderOption];
