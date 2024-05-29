class RegisterCenter {
    store = new Map();
    only = new Set();
    constructor() { }
    register(key, func, type = 'public') {
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
    get(key) {
        return this.store.get(key);
    }
}
export const Regc = new RegisterCenter();
export default RegisterCenter;
