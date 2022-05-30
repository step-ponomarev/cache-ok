import {IStorage} from './IStorage';

export class CacheStorage implements IStorage {
    private readonly namespace: string;

    constructor(namespace: string) {
        this.namespace = namespace;
    }

    public get<T extends object>(key: string): Promise<T | null> {
        return window.caches.open(this.namespace)
            .then(cache => cache.match(key))
            .then(resp => (typeof resp === 'undefined') ? null : resp.json().then((r: unknown) => r as T));
    }

    public put<T extends object>(key: string, value: T): Promise<void> {
        const resp = new Response(JSON.stringify(value), {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return window.caches.open(this.namespace)
            .then(cache => cache.put(key, resp));
    }

    public delete(key: string): Promise<boolean> {
        return window.caches.open(this.namespace)
            .then(cache => cache.delete(key));
    }

    public clear(): Promise<boolean> {
        return window.caches.delete(this.namespace);
    }
}