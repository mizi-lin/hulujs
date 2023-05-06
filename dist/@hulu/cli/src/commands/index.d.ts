import * as init from './init.js';
import * as genenate from './generate.js';
import * as repo from './repo.js';
declare const cmds: (typeof init | typeof genenate | typeof repo)[];
export default cmds;
