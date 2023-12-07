import { useEffect, useRef } from 'react';
/**
 * 使用 useCombinedRefs 高阶函数可以将多个 ref 合并为一个 ref对象，并返回该 ref 对象
 */
export function useCombinedRefs(...refs) {
    const targetRef = useRef();
    useEffect(() => {
        refs.forEach((ref) => {
            if (!ref)
                return;
            if (typeof ref === 'function') {
                ref(targetRef.current);
            }
            else {
                ref.current = targetRef.current;
            }
        });
    }, [refs]);
    return targetRef;
}
/**
 * 删除连续的注释节点
 * @param element - 要删除注释的父元素
 */
export function removeTwiceComment(element) {
    try {
        // 获取父元素
        const parent = element.parentElement;
        // 将父元素的子节点转换为数组
        const nodes = Array.from(parent.childNodes);
        // 遍历父元素的子节点
        for (const node of nodes) {
            // 判断是否为注释节点且下一个节点为注释节点
            const isTwice = node.nodeType === Node.COMMENT_NODE &&
                node.nextSibling?.nodeType === Node.COMMENT_NODE;
            // 如果是连续的注释节点，则从父元素中移除
            if (isTwice) {
                node.parentElement?.removeChild(node);
            }
            else {
                // 如果不是连续的注释节点，则停止遍历
                break;
            }
        }
    }
    catch (e) {
        // 异常处理
    }
}
/**
 * 在指定的元素之前插入注释
 * @param element 要插入注释的元素
 * @param comment 注释内容
 */
export function insertComment(element, comment) {
    const prev = element.previousSibling;
    // 判断是否已经写入comment
    const exist = prev?.nodeType === Node.COMMENT_NODE && prev.nodeValue === comment;
    if (exist)
        return void 0;
    // 创建comment node
    const comment$ = document.createComment(comment);
    element.before(comment$);
}
