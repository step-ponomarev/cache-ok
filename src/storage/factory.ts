import {IStorage} from './IStorage';
import {CacheStorage} from './CacheStorage';
import {LocalStorage} from './LocalStorage';

export function createCacheStorage<T extends object>(namespace: string): IStorage {
    const urlNameSpace = isURL(namespace) ? namespace : convertToUrl(namespace);
    if (!isCacheSupported()) {
        return new LocalStorage(urlNameSpace);
    }

    return new CacheStorage(urlNameSpace);
}

function isCacheSupported(): boolean {
    try {
        return window.caches && typeof window.caches.open === 'function';
    } catch (err) {
        return false;
    }
}

function isURL(maybeUrl: string): boolean {
    try {
        const url = new URL(maybeUrl);

        return url.protocol === "http:" || url.protocol === "https:";
    } catch (_) {
        return false;
    }
}

function convertToUrl(str: string) {
    return `${window.location.origin}/_cache/str`;
}