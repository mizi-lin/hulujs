import isNotFalsy from './is-not-falsy.js';
import sofunc from './sofunc.js';

function run(val: () => any, ...args);
function run(val: any, truefunc: (...args: any) => any, ...args);
function run(val: any, truefunc: (...args: any) => any, falsefunc: () => any, ...args: any[]);
function run(...args: any[]) {
    const [val, second, third, ...params] = args;

    if (typeof second !== 'function') {
        return sofunc(val, second, third, ...params);
    }

    if (typeof third !== 'function') {
        const rst = sofunc(val, third, ...params);
        return isNotFalsy(rst) ? sofunc(second, rst, third, ...params) : void 0;
    }

    const rst = sofunc(val, ...params);
    console.log('--->>>', rst, isNotFalsy(rst));
    return isNotFalsy(rst) ? sofunc(second, rst, ...params) : sofunc(third, ...params);
}

export default run;
