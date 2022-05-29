import {CacheStorage} from './types';

export function createCacheStorage<T extends object>(namespace: string): CacheStorage<T> {
    if (!isCacheSupported()) {
        throw new Error("Unsupported browser");
    }

    return {
        get: (key: string): Promise<T | null> => {
            return new Promise<T | null>((resolve, reject) => {
                window.caches.open(namespace)
                    .then(cache => cache.match(key))
                    .then(resp => typeof resp === 'undefined'
                        ? resolve(null)
                        : resp.json()
                            .then((r: unknown) => resolve(r as T))
                            .catch(reject))
                    .catch(reject);
            });
        },
        put: (key: string, data: T) => {
            const resp = new Response(JSON.stringify(data), {
                headers: {
                    'Content-Type': 'application/json'
                }
            });


            return new Promise(((resolve, reject) => {
                window.caches.open(namespace)
                    .then(cache => {
                        cache.put(key, resp)
                            .then(resolve)
                            .catch(reject);
                    }).catch(reject);
            }));
        },
        delete: (key: string) => {
            return new Promise(((resolve, reject) => {
                window.caches.open(namespace)
                    .then(cache => cache.delete(key)
                        .then(resolve)
                        .catch(reject)
                    ).catch(reject);
            }));
        }
    }
}

function isCacheSupported(): boolean {
    try {
        return window.caches && typeof window.caches.open === 'function';
    } catch (err) {
        return false;
    }
}