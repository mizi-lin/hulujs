import * as init from './init.js';
import * as genenate from './generate.js';
import * as repo from './repo/repo.js';
import * as git from './git/git.js';
import * as tools from './tools/tools.js';
declare const cmds: (typeof init | typeof genenate | typeof repo | typeof git | typeof tools)[];
export default cmds;
