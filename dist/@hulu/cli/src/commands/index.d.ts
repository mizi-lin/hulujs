import * as init from './init.js';
import * as genenate from './generate.js';
declare const cmds: (typeof init | typeof genenate)[];
export default cmds;
