/**
 * 看过去像数值
 * @param value
 * @returns
 */
function isLikeNum(value) {
    if (!['string', 'number'].includes(typeof value)) return false;
    if (typeof value === 'number') return true;
    const regexp = /^(-?([1-9]\d*)|0)(\.\d+)?$/;
    return regexp.test(value.trim());
}

export default isLikeNum;
