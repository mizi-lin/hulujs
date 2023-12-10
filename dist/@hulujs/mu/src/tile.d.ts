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
/**
 * cash to PropPath
 */
export declare const cashToPropPath: (cash: (string | number)[], type?: PropPathType) => string;
/**
 * 属性链扁平化对象
 */
declare const tile: (obj: Record<string, any>, type?: PropPathType) => Record<string, any>;
export default tile;
