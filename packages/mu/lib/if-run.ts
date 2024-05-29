import isFalsy from './is-falsy.js';
import isNotFalsy from './is-not-falsy.js';
import sofunc from './sofunc.js';

const ifrun = (value: any, trueValue?: any, falseValue?: any) => {
    return isNotFalsy(value) ? sofunc(trueValue, value) : sofunc(falseValue, value) ?? value;
};

export default ifrun;
