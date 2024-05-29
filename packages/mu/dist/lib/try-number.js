/**
 * tryNumber 与 toNumber 不同的是
 * 当源尝试转为number类型的时候，如果不可转则输出源数据
 * 而toNumber会输出NaN
 */
const tryNumber = (value) => {
    if (typeof value !== 'string')
        return value;
    const regexp = /^(-?([1-9]\d*)|0)(\.\d+)?$/;
    return regexp.test(value.trim()) ? +value : value;
};
export default tryNumber;
