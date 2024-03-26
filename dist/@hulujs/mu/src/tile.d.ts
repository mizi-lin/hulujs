/// <reference types="lodash" resolution-mode="require"/>
/**
 * PropPathType
 * bracket: 中挂号链式
 * dot: 点式链式
 */
export type PropPathType = 'bracket' | 'dot';
export declare const PROPPATH_SIGN: {
    DOUBLE_QUOTES: string[];
    SINGLE_QUOTES: string[];
    LEFT_BRACKETS: string[];
    RIGHT_BRACKETS: string[];
    DOT: string[];
    STRIKE: string[];
};
export declare const canBracketRegex: () => RegExp;
export declare const bracketKey: (key: string | number) => string | number;
/**
 * cash to PropPath
 */
export declare const cashToPropPath: (cash: (string | number)[], type?: PropPathType) => string;
/**
 * 平铺对象
 * - 平铺对象的规则限定
 * -- 不平铺 dom
 * -- 不平铺  react component
 * - 针对循环引用的规则限定
 */
export declare const tile: (obj: Record<string, any>, chainType?: PropPathType, deep?: number) => Record<string, any>;
export declare const prefixTile: (prefix: string, obj: Record<string, any>, chainType?: PropPathType, deep?: number) => import("lodash").Dictionary<any>;
export default tile;
