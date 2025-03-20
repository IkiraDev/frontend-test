import { Cache } from "@/core/types/Cache";
import IORedis, { Redis } from "ioredis";

export class RedisCache<T> implements Cache.Provider<T> {
  private client: Redis;

  constructor(options?: { host?: string; port?: number; password?: string }) {
    this.client = new IORedis({
      host: options?.host || "127.0.0.1",
      port: options?.port || 6379,
      password: options?.password,
      lazyConnect: true,
    });
  }

  async get(key: keyof T): Promise<T[keyof T] | null> {
    const data = await this.client.get(key as string);
    return data ? (JSON.parse(data) as T[keyof T]) : null;
  }

  async set(key: keyof T, value: T[keyof T], ttl?: number): Promise<void> {
    const serializedValue = JSON.stringify(value);
    if (ttl) {
      await this.client.set(key as string, serializedValue, "EX", ttl);
    } else {
      await this.client.set(key as string, serializedValue);
    }
  }

  async delete<T>(key: keyof T): Promise<void> {
    await this.client.del(key as string);
  }

  async clear(): Promise<void> {
    await this.client.flushdb();
  }

  async has<T>(key: keyof T): Promise<boolean> {
    const exists = await this.client.exists(key as string);
    return exists === 1;
  }

  async disconnect(): Promise<void> {
    await this.client.quit();
  }
}
