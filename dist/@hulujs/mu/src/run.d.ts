declare function run(val: () => any, ...args: any[]): any;
declare function run(val: any, truefunc: (...args: any) => any, ...args: any[]): any;
declare function run(val: any, truefunc: (...args: any) => any, falsefunc: () => any, ...args: any[]): any;
export default run;
