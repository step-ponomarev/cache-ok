export class MyCache<T> {
    private readonly namespace: string;
    constructor(namespace: string) {
        this.namespace = namespace;

        if (!isCacheSupported()) {
            throw new Error("Unsupported browser");
        }
    }

    public get(key: string): Promise<T | null> {
        return new Promise<T | null>((resolve, reject) => {
            window.caches.open(this.namespace)
                .then(cache => cache && cache.match(key))
                .then(resp => {
                    if (!resp) {
                        return resolve(null);
                    }

                    resp.json()
                        .then(r => {
                            resolve(r as T);
                        }).catch(reject);
                }).catch(reject)
        });
    }

    public put(key: string, data: T) {
        const resp = new Response(JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        window.caches.open(this.namespace)
            .then(cache => {
                cache.put(key, resp);
            });
    }
}

function isCacheSupported(): boolean {
    try {
        return window.caches && typeof window.caches.open === 'function';
    } catch (err) {
        return false;
    }
}