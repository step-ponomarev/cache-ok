export type CacheStorage<T extends object> = {
    get: (key: string) => Promise<T | null>;
    put: (key: string, value: T) => Promise<void>;
    delete: (key: string) => Promise<boolean>;
}