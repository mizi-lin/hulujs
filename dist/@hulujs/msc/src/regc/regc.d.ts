declare class RegisterCenter {
    private store;
    private only;
    constructor();
    register<T>(key: string, func: ((val: T) => T) | any, type?: 'public' | 'readonly'): undefined;
    get<T>(key: string): T;
}
export declare const Regc: RegisterCenter;
export default RegisterCenter;
