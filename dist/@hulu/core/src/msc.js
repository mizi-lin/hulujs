import { includes } from '@hulu/mu';
import inquirer from 'inquirer';
import path from 'path';
import inquirerFuzzyPath from './extra/inquirer-fuzzy-path.js';
inquirer.registerPrompt('fuzzypath', inquirerFuzzyPath);
export const fuzzypath = async (question = {}) => {
    const answer = await inquirer.prompt([
        {
            type: 'fuzzypath',
            name: 'path',
            excludePath: (nodePath) => {
                const compare = [
                    '.git',
                    '.github',
                    '.husky',
                    '.next',
                    '.history',
                    '.idea',
                    '.yarn',
                    '.vscode',
                    'cache',
                    'dist',
                    'docs',
                    'node_modules'
                ];
                return includes(nodePath.split(path.sep), compare);
            },
            // excludePath :: (String) -> Bool
            // excludePath to exclude some paths from the file-system scan
            excludeFilter: (nodePath) => nodePath == '.',
            // excludeFilter :: (String) -> Bool
            // excludeFilter to exclude some paths from the final list, e.g. '.'
            itemType: 'any',
            // itemType :: 'any' | 'directory' | 'file'
            // specify the type of nodes to display
            // default value: 'any'
            // example: itemType: 'file' - hides directories from the item list
            rootPath: 'app',
            // rootPath :: String
            // Root search directory
            message: 'Select a target directory for your component:',
            // default: 'components/',
            suggestOnly: false,
            // suggestOnly :: Bool
            // Restrict prompt answer to available choices or use them as suggestions
            depthLimit: 5,
            // depthLimit :: integer >= 0
            // Limit the depth of sub-folders to scan
            // Defaults to infinite depth if undefined
            pageSize: 15,
            ...question
        }
    ]);
    return answer;
};
export * from 'globby';
export { inquirer, path };
