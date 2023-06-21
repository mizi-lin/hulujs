import * as init from './init.js';
import * as genenate from './generate.js';
import * as repo from './repo/repo.js';
import * as git from './git/git.js';
import * as tools from './tools/tools.js';
import * as dev from './dev/dev.js';
const cmds = [dev, genenate, init, repo, git, tools];
export default cmds;
