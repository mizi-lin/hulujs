/**
 * tryNumber 与 toNumber 不同的是
 * 当源尝试转为number类型的时候，如果不可转则输出源数据
 * 而toNumber会输出NaN
 */
declare const tryNumber: (value: any) => any;
export default tryNumber;
