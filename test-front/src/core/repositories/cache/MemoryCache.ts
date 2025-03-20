import { Cache } from "../../types/Cache";

export class MemoryCache<T> implements Cache.Provider<T> {
  private cache = new Map<keyof T, { value: T[keyof T]; expiresAt: number | undefined }>();

  async get(key: keyof T): Promise<T[keyof T] | null> {
    const item = this.cache.get(key);
    if (!item) return null;

    if (item.expiresAt && item.expiresAt < Date.now()) {
      this.cache.delete(key);
      return null;
    }

    return item.value;
  }

  async set(key: keyof T, value: T[keyof T], ttl?: number): Promise<void> {
    const expiresAt = ttl ? Date.now() + ttl * 1000 : undefined;
    this.cache.set(key, { value, expiresAt: expiresAt });
  }

  async delete(key: keyof T): Promise<void> {
    this.cache.delete(key);
  }

  async clear(): Promise<void> {
    this.cache.clear();
  }

  async has(key: keyof T): Promise<boolean> {
    return this.cache.has(key);
  }
}
