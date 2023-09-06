import isFalsy from './is-falsy.js';

const isNotFalsy = (value: any, force?: boolean) => {
    return !isFalsy(value, force);
};

export default isNotFalsy;
