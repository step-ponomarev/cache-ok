export class Cache<T> {
    private readonly namespace: string;
    constructor(namespace: string) {
        this.namespace = namespace;

        if (!isCacheSupported()) {
            throw new Error("Unsupported browser");
        }
    }

    public get(key: string): Promise<T> {
        window.caches.open(this.namespace).then()


        return new Promise<T>((resolve, reject) => {

        });
    }

    public put(key: string, data: T) {

    }
}

function isCacheSupported(): boolean {
    try {
        return window.caches && typeof window.caches.open === 'function';
    } catch (err) {
        return false;
    }
}