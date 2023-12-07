import isFalsy from './is-falsy.js';
const iffalsy = (value, trueValue, falseValue) => {
    return isFalsy(value) ? trueValue : falseValue ?? value;
};
export default iffalsy;
