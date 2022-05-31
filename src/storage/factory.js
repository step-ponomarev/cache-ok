"use strict";
exports.__esModule = true;
exports.createCacheStorage = void 0;
var CacheStorage_1 = require("./CacheStorage");
var LocalStorage_1 = require("./LocalStorage");
function createCacheStorage(namespace) {
    if (!isCacheSupported()) {
        return new LocalStorage_1.LocalStorage(namespace);
    }
    return new CacheStorage_1.CacheStorage(isURL(namespace) ? namespace : convertToUrl(namespace));
}
exports.createCacheStorage = createCacheStorage;
function isCacheSupported() {
    try {
        return window.caches && typeof window.caches.open === 'function';
    }
    catch (err) {
        return false;
    }
}
function isURL(maybeUrl) {
    try {
        var url = new URL(maybeUrl);
        return url.protocol === "http:" || url.protocol === "https:";
    }
    catch (_) {
        return false;
    }
}
function convertToUrl(str) {
    return "".concat(window.location.origin, "/_cache/str");
}
