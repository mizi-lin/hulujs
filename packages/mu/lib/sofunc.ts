const sofunc = (fn?: (...args) => any, ...args: any) => {
    return typeof fn === 'function' ? fn(...args) : fn;
};

export default sofunc;
