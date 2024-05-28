import { map } from '@hulujs/mu';
import parser from '@babel/parser';
import { traverse } from '@babel/core';
import path from 'path';
import { $root } from '@hulujs/core';
import fse from 'fs-extra';
export const getImports = (content, currentPath) => {
    const ast = parser.parse(content, {
        sourceType: 'module',
        plugins: ['typescript', 'jsx']
    });
    // 遍历AST并收集import语句
    const imports = [];
    traverse(ast, {
        ImportDeclaration(p) {
            const { node } = p;
            if (node.importKind === 'value') {
                imports.push(node.source.value);
            }
        }
    });
    const imports$ = map(imports, (filepath) => {
        const dirname = path.dirname(currentPath);
        const root = $root.cwd();
        // 排除npm包
        if (!/^(\.|@\/|\~)/.test(filepath)) {
            return '::break';
        }
        const filePath$ = /^@\//.test(filepath) ? filepath.replace(/^@\//, `${root}/src/`) : path.join(dirname, filepath);
        if (fse.existsSync(filePath$)) {
            return filePath$;
        }
        for (const ext of ['.ts', '.tsx', './index.ts', './index.tsx']) {
            const filePath$1 = [filePath$.replace(/\/$/, ''), ext].join('');
            if (fse.existsSync(filePath$1)) {
                return filePath$1;
            }
        }
        return '::break';
    });
    return imports$;
};
