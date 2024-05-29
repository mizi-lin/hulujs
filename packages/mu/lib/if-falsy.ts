import isFalsy from './is-falsy.js';

const iffalsy = (value: any, trueValue?: any, falseValue?: any) => {
    return isFalsy(value) ? trueValue : falseValue ?? value;
};

export default iffalsy;
