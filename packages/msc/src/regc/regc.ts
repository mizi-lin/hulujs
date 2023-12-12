import { RegKey } from './reg-key.js';

class RegisterCenter {
    private store: Map<string, any> = new Map<string, any>();
    private only = new Set();
    constructor() {}

    register<T>(key: RegKey | string, func: ((val: T) => T) | any, type: 'public' | 'readonly' = 'public') {
        if (this.only.has(key)) {
            console.warn(`${key}为只读, 不能设置值`);
            return void 0;
        }

        if (type === 'readonly') {
            this.only.add(key);
        }

        if (type === 'public') {
            this.store.set(key, typeof func === 'function' ? func(this.get(key)) : func);
        }
    }

    get<T>(key: RegKey | string): T {
        return this.store.get(key);
    }
}

export const Regc = new RegisterCenter();
export default RegisterCenter;
