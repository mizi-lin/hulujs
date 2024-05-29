const sofunc = (fn, ...args) => {
    return typeof fn === 'function' ? fn(...args) : fn;
};
export default sofunc;
