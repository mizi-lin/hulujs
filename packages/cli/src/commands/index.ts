import * as init from './init.js';
import * as genenate from './generate.js';
import * as repo from './repo/repo.js';
import * as git from './git/git.js';
import * as tools from './tools/tools.js';
import * as dev from './dev/dev.js';
import * as prod from './dev/prod.js';
import * as montage from './montage.js';

const cmds = [dev, genenate, git, init, montage, repo, tools, prod];

export default cmds;
