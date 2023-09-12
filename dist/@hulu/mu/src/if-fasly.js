import isFalsy from './is-falsy.js';
const iffasly = (value, trueValue, falseValue) => {
    const truefunc = typeof trueValue === 'function' ? trueValue : () => trueValue;
    const falsefunc = typeof falseValue === 'function' ? trueValue : () => trueValue;
    return isFalsy(value) ? truefunc() : falsefunc(value);
};
export { iffasly };
