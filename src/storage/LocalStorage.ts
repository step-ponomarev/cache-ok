import {IStorage} from './IStorage';

type StorageObject = {
    [key: string]: object
}

export class LocalStorage implements IStorage {
    private readonly namespace: string;
    private readonly storage: Storage;

    constructor(namespace: string) {
        this.namespace = namespace;
        this.storage = window.localStorage;
    }

    public get<T extends object>(key: string): Promise<T | null> {
        try {
            const storageObject = this.getStorageObject();
            const value = storageObject[key];

            return value ? Promise.resolve(value as T) : Promise.resolve(null);
        } catch (e) {
            return Promise.reject(e);
        }
    }

    public put<T extends object>(key: string, value: T): Promise<void> {
        try {
            const storageObject = this.getStorageObject();
            storageObject[key] = value;

            this.storage.setItem(
                this.namespace,
                JSON.stringify(storageObject)
            );

            return Promise.resolve();
        } catch (e) {
            return Promise.reject(e);
        }
    }

    public delete(key: string): Promise<boolean> {
        try {
            const storageObject = this.getStorageObject();
            delete storageObject[key];

            this.storage.setItem(
                this.namespace,
                JSON.stringify(storageObject)
            );

            return Promise.resolve(true);
        } catch (e) {
            return Promise.reject(e);
        }
    }

    public clear(): Promise<boolean> {
        this.storage.removeItem(this.namespace);

        return Promise.resolve(true);
    }

    private getStorageObject(): StorageObject {
        const namespaceStorage = this.storage.getItem(this.namespace);
        if (!namespaceStorage) {
            return {};
        }

        return JSON.parse(namespaceStorage) as StorageObject;
    }
}