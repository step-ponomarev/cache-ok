export interface IStorage {
    get: <T extends object>(key: string) => Promise<T | null>;
    put: <T extends object>(key: string, value: T) => Promise<void>;
    delete: (key: string) => Promise<boolean>;
    clear: () => Promise<boolean>
}