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
export declare function objFlat(data: any): {};
export declare const tile: (obj: Record<string, any>, chainType?: PropPathType) => Record<string, any>;
export default tile;
