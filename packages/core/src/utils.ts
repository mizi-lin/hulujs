import { camelCase, kebabCase, upperFirst, snakeCase } from 'lodash-es';
import { prompts } from './msc.js';
import { $log } from './log.js';
import { upArray } from '@hulu/mu';

interface SomeCase {
    camel: string;
    kebab: string;
    pascal: string;
    constant: string;
}

export function someCase(name: string): SomeCase {
    // 驼峰：abcDef
    const camel = camelCase(name);

    // 横杆线 abc-def
    const kebab = kebabCase(name);

    // 兼容路由
    // const routeKebab = routeKebab(name);
    // 帕斯卡 Abc-Def
    const pascal = upperFirst(camel);

    // constant 常量写法 ABC_DEF
    const constant = snakeCase(kebab).toUpperCase();

    return { camel, kebab, pascal, constant };
}
