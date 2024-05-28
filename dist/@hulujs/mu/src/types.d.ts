/**
 * 类型判断
 */
import { LangType } from '@hulujs/types';
declare function types(value: any): LangType;
declare function types(value: any, ...types: LangType[]): boolean;
export default types;
