/**
 * 获取超控ovrd的地址
 */
export declare const getOvrdSrcPath: (address: string) => string;
/**
 * 计算是否已安装CK
 */
export declare const isInstallCaoKong: (address: string) => any;
/**
 * 计算操控体系的实际地址
 */
export declare const getPathExistByCaoKong: (address: string) => string;
/**
 * 别名路径转原路径
 */
export declare const aliasToSrcWithCaoKong: (address: string) => string;
/**
 * 原路径转别名路径
 */
export declare const srcToAliasWithCaoKong: (address: string) => string;
/**
 * 输出适合 import path 的简短地址
 */
export declare const importAlias: (address: string) => string;
