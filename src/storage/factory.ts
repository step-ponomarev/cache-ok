import {IStorage} from './IStorage';
import {CacheStorage} from './CacheStorage';
import {LocalStorage} from './LocalStorage';


export function createCacheStorage<T extends object>(namespace: string): IStorage {
    if (!isCacheSupported()) {
        return new LocalStorage(namespace);
    }

    return new CacheStorage(namespace);
}

function isCacheSupported(): boolean {
    try {
        return window.caches && typeof window.caches.open === 'function';
    } catch (err) {
        return false;
    }
}