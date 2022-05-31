"use strict";
exports.__esModule = true;
exports.CacheStorage = void 0;
var CacheStorage = /** @class */ (function () {
    function CacheStorage(namespace) {
        this.namespace = namespace;
    }
    CacheStorage.prototype.get = function (key) {
        return window.caches.open(this.namespace)
            .then(function (cache) { return cache.match(key); })
            .then(function (resp) { return (typeof resp === 'undefined') ? null : resp.json().then(function (r) { return r; }); });
    };
    CacheStorage.prototype.put = function (key, value) {
        var resp = new Response(JSON.stringify(value), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return window.caches.open(this.namespace)
            .then(function (cache) { return cache.put(key, resp); });
    };
    CacheStorage.prototype["delete"] = function (key) {
        return window.caches.open(this.namespace)
            .then(function (cache) { return cache["delete"](key); });
    };
    CacheStorage.prototype.clear = function () {
        return window.caches["delete"](this.namespace);
    };
    return CacheStorage;
}());
exports.CacheStorage = CacheStorage;
