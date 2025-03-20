export namespace Cache {
  export interface Provider<T> {
    get: GET<T>;
    set: SET<T>;
    delete: DELETE<T>;
    clear: CLEAR;
    has: HAS<T>;
  }

  export type ProviderNames = "memory" | "redis";
  export type ProviderProps = { port: number; host: string; password: string };

  export type GET<T> = (key: keyof T) => Promise<T[keyof T] | null>;
  export type SET<T> = (key: keyof T, value: T[keyof T], ttl?: number) => Promise<void>;
  export type DELETE<T> = (key: keyof T) => Promise<void>;
  export type CLEAR = () => Promise<void>;
  export type HAS<T> = (key: keyof T) => Promise<boolean>;
}
