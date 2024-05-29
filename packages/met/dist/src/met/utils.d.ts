/// <reference types="react" />
/**
 * 使用 useCombinedRefs 高阶函数可以将多个 ref 合并为一个 ref对象，并返回该 ref 对象
 */
export declare function useCombinedRefs(...refs: any[]): import("react").MutableRefObject<undefined>;
/**
 * 删除连续的注释节点
 * @param element - 要删除注释的父元素
 */
export declare function removeTwiceComment(element: HTMLElement): void;
/**
 * 在指定的元素之前插入注释
 * @param element 要插入注释的元素
 * @param comment 注释内容
 */
export declare function insertComment(element: HTMLElement, comment: string): undefined;
