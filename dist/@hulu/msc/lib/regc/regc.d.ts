import { RegKey } from './reg-key.js';
declare class RegisterCenter {
    private store;
    private only;
    constructor();
    register<T>(key: RegKey | string, func: ((val: T) => T) | any, type?: 'public' | 'readonly'): undefined;
    get<T>(key: RegKey | string): T;
}
export declare const Regc: RegisterCenter;
export default RegisterCenter;
