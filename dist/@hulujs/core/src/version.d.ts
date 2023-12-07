/**
 * 关于版本的获取和操作
 */
export declare class Version {
    static defaultValue: string;
    bin(cmd: string): string;
    pkg(name: string): void;
}
declare const $ver: Version;
export { $ver };
