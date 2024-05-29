import isNotFalsy from './is-not-falsy.js';
import sofunc from './sofunc.js';
const ifrun = (value, trueValue, falseValue) => {
    return isNotFalsy(value) ? sofunc(trueValue, value) : sofunc(falseValue, value) ?? value;
};
export default ifrun;
