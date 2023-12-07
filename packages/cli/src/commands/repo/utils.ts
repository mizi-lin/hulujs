import { groupBy } from 'lodash-es';
import { compilerOptions } from '../../compiler-options.js';

export const getCompiler = (compiler: string): Record<string, any> => {
    return groupBy(compilerOptions, 'value')[compiler][0];
};
