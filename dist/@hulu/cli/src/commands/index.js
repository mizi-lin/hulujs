import * as init from './init.js';
import * as genenate from './generate.js';
import * as repo from './repo/repo.js';
import * as git from './git/git.js';
import * as tools from './tools/tools.js';
const cmds = [genenate, init, repo, git, tools];
export default cmds;
