import isFalsy from './is-falsy.js';
const isNotFalsy = (value, force) => {
    return !isFalsy(value, force);
};
export default isNotFalsy;
