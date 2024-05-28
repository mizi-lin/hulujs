/// <reference types="node" resolution-mode="require"/>
/// <reference types="node" resolution-mode="require"/>
import inquirer from 'inquirer';
import path from 'path';
export declare const fuzzypath: (question?: {}) => Promise<any>;
export { default as fs } from 'node:fs';
export { globby } from 'globby';
export { default as shell } from 'shelljs';
export { default as chalk } from 'chalk';
export { default as isUnicodeSupported } from 'is-unicode-supported';
export { default as semver } from 'semver';
export { SemVer } from 'semver';
export * as prompts from '@clack/prompts';
export * as tsImport from 'ts-import';
export { simpleGit, CleanOptions, SimpleGitOptions, SimpleGit } from 'simple-git';
export { inquirer, path };
