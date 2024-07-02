import * as fs from 'fs';
import * as path from 'path';
import * as events from 'events';
import { sync as writeSync } from 'write-file-atomic';

const KEY_FOR_EMPTY_STRING = '---.EMPTY_STRING.---'; // Chose something that no one is likely to ever use

function _emptyDirectory(target: string): void {
    const files = fs.readdirSync(target);
    for (const file of files) {
        _rm(path.join(target, file));
    }
}

function _rm(target: string): void {
    if (fs.statSync(target).isDirectory()) {
        _emptyDirectory(target);
        fs.rmdirSync(target);
    } else {
        fs.unlinkSync(target);
    }
}

function _escapeKey(key: string): string {
    if (key === '') {
        return KEY_FOR_EMPTY_STRING;
    } else {
        return key;
    }
}

class QUOTA_EXCEEDED_ERR extends Error {
    constructor(message: string = 'Unknown error.') {
        super();
        if (Error.captureStackTrace != null) {
            Error.captureStackTrace(this, this.constructor);
        }
        this.name = this.constructor.name;
        this.message = message;
    }

    toString() {
        return `${this.name}: ${this.message}`;
    }
}

class StorageEvent {
    constructor(
        public key: string | null,
        public oldValue: any,
        public newValue: any,
        public url: string,
        public storageArea: string = 'localStorage'
    ) {}
}

class MetaKey {
    constructor(
        public key: string,
        public index: number
    ) {}
}

function createMap(): any {
    return new Map();
}

class _EventEmitter {}

const EventEmitter = events?.EventEmitter ?? _EventEmitter;

class LocalStorage extends EventEmitter {
    _location: string;
    quota: number;
    length: number;
    _bytesInUse: number;
    _keys: string[];
    _metaKeyMap: any;
    _eventUrl: string;
    private _QUOTA_EXCEEDED_ERR: typeof QUOTA_EXCEEDED_ERR;

    constructor(_location: string, quota: number = 5 * 1024 * 1024) {
        super();
        this._location = _location;
        this.quota = quota;
        this._location = path.resolve(this._location);
        this.length = 0;
        this._bytesInUse = 0;
        this._keys = [];
        this._metaKeyMap = createMap();
        this._eventUrl = 'pid:' + process.pid;
        this._init();
        this._QUOTA_EXCEEDED_ERR = QUOTA_EXCEEDED_ERR;
    }

    _init() {
        try {
            const stat = fs.statSync(this._location);
            if (stat != null && !stat.isDirectory()) {
                throw new Error(`A file exists at the location '${this._location}' when trying to create/open localStorage`);
            }
            this._sync();
        } catch (error: any) {
            if (error.code !== 'ENOENT') {
                throw error;
            }
            try {
                fs.mkdirSync(this._location, {
                    recursive: true
                });
            } catch (error: any) {
                if (error.code !== 'EEXIST') {
                    throw error;
                }
            }
        }
    }

    _sync() {
        this._bytesInUse = 0;
        this.length = 0;
        const _keys = fs.readdirSync(this._location);
        for (let index = 0; index < _keys.length; index++) {
            const k = _keys[index];
            this._keys.push(decodeURIComponent(k));
            const _MetaKey = new MetaKey(encodeURIComponent(k), index);
            this._metaKeyMap[decodeURIComponent(k)] = _MetaKey;
            const stat = this._getStat(encodeURIComponent(k));
            if (stat?.size != null) {
                // @ts-ignore
                _MetaKey.size = stat.size;
                this._bytesInUse += stat.size;
            }
        }
        this.length = _keys.length;
    }

    setItem(key: string, value: any) {
        let hasListeners = this.listenerCount('storage');
        let oldValue: string;
        if (hasListeners) {
            oldValue = this.getItem(key)!;
        }
        key = _escapeKey(key);
        const encodedKey = encodeURIComponent(key)
            .replace(/[!'()]/g, escape)
            .replace(/\*/g, '%2A');
        const filename = path.join(this._location, encodedKey);
        const valueString = String(value);
        const valueStringLength = valueString.length;
        const metaKey = this._metaKeyMap[key];
        let existsBeforeSet = !!metaKey;

        const oldLength = existsBeforeSet ? metaKey.size : 0;
        if (this._bytesInUse - oldLength + valueStringLength > this.quota) {
            throw new QUOTA_EXCEEDED_ERR();
        }
        writeSync(filename, valueString, {
            encoding: 'utf8'
        });
        if (!existsBeforeSet) {
            const newMetaKey = new MetaKey(encodedKey, this._keys.push(key) - 1);
            // @ts-ignore
            newMetaKey.size = valueStringLength;
            this._metaKeyMap[key] = newMetaKey;
            this.length += 1;
            this._bytesInUse += valueStringLength;
        }
        if (hasListeners) {
            const evnt = new StorageEvent(key, oldValue!, value, this._eventUrl);
            this.emit('storage', evnt);
        }
    }

    getItem(key: string) {
        key = _escapeKey(key);
        const metaKey = this._metaKeyMap[key];
        if (!!metaKey) {
            const filename = path.join(this._location, metaKey.key);
            return fs.readFileSync(filename, 'utf8');
        } else {
            return null;
        }
    }

    _getStat(key: string) {
        const filename = path.join(this._location, encodeURIComponent(key));
        try {
            return fs.statSync(filename);
        } catch (error) {
            return null;
        }
    }

    removeItem(key: string) {
        key = _escapeKey(key);
        const metaKey = this._metaKeyMap[key];
        if (!!metaKey) {
            let hasListeners = this.listenerCount('storage');
            let oldValue: string;
            if (hasListeners) {
                oldValue = this.getItem(key)!;
            }
            delete this._metaKeyMap[key];
            this.length -= 1;
            this._bytesInUse -= metaKey.size;
            const filename = path.join(this._location, metaKey.key);
            this._keys.splice(metaKey.index, 1);
            for (const k in this._metaKeyMap) {
                const v = this._metaKeyMap[k];
                const meta = this._metaKeyMap[k];
                if (meta.index > metaKey.index) {
                    meta.index -= 1;
                }
            }
            _rm(filename);
            if (hasListeners) {
                const evnt = new StorageEvent(key, oldValue!, null, this._eventUrl);
                this.emit('storage', evnt);
            }
        }
    }

    key(n: number) {
        const rawKey = this._keys[n];
        if (rawKey === KEY_FOR_EMPTY_STRING) {
            return '';
        } else {
            return rawKey;
        }
    }

    clear() {
        _emptyDirectory(this._location);
        this._metaKeyMap = createMap();
        this._keys = [];
        this.length = 0;
        this._bytesInUse = 0;
        if (this.listenerCount('storage')) {
            const evnt = new StorageEvent(null, null, null, this._eventUrl);
            this.emit('storage', evnt);
        }
    }

    _getBytesInUse() {
        return this._bytesInUse;
    }

    _deleteLocation() {
        // @ts-ignore
        delete this._location;
        _rm(this._location);
        this._metaKeyMap = {};
        this._keys = [];
        this.length = 0;
        this._bytesInUse = 0;
    }
}

class JSONStorage extends LocalStorage {
    setItem(key: string, value: any): void {
        const newValue = JSON.stringify(value);
        super.setItem(key, newValue);
    }

    getItem(key: string): any {
        return JSON.parse(super.getItem(key)!);
    }
}

export { LocalStorage, JSONStorage, QUOTA_EXCEEDED_ERR };
