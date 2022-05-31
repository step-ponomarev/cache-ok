"use strict";
exports.__esModule = true;
exports.LocalStorage = void 0;
var LocalStorage = /** @class */ (function () {
    function LocalStorage(namespace) {
        this.namespace = namespace;
        this.storage = window.localStorage;
    }
    LocalStorage.prototype.get = function (key) {
        try {
            var storageObject = this.getStorageObject();
            var value = storageObject[key];
            return value ? Promise.resolve(value) : Promise.resolve(null);
        }
        catch (e) {
            return Promise.reject(e);
        }
    };
    LocalStorage.prototype.put = function (key, value) {
        try {
            var storageObject = this.getStorageObject();
            storageObject[key] = value;
            this.storage.setItem(this.namespace, JSON.stringify(storageObject));
            return Promise.resolve();
        }
        catch (e) {
            return Promise.reject(e);
        }
    };
    LocalStorage.prototype["delete"] = function (key) {
        try {
            var storageObject = this.getStorageObject();
            delete storageObject[key];
            this.storage.setItem(this.namespace, JSON.stringify(storageObject));
            return Promise.resolve(true);
        }
        catch (e) {
            return Promise.reject(e);
        }
    };
    LocalStorage.prototype.clear = function () {
        this.storage.removeItem(this.namespace);
        return Promise.resolve(true);
    };
    LocalStorage.prototype.getStorageObject = function () {
        var namespaceStorage = this.storage.getItem(this.namespace);
        if (!namespaceStorage) {
            return {};
        }
        return JSON.parse(namespaceStorage);
    };
    return LocalStorage;
}());
exports.LocalStorage = LocalStorage;
