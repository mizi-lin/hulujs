/**
 * 根据routes，生成 router
 */
import { $load, $repo, $tpl } from '@hulu/core';
import { existByCk } from './utils.js';
import { each, rowsToTree, stack, tile } from '@hulu/mu';
import path from 'path';
const transformViewPath = (value) => {
    const prefix = '@/views';
    const isAbsoulte = path.isAbsolute(value);
    const isAlias = /^[@~]/.test(value);
    return isAbsoulte ? value : isAlias ? value : path.join(prefix, value);
};
const generateAssistLayout = () => {
    const assLayoutPath = $repo.hulu('.assists', 'layout.tsx');
    const sourcePath = $repo.template('caokong/.assists', 'layout.ts.ejs');
    const layoutPath = existByCk('./layout.tsx');
    $tpl.fileout(sourcePath, assLayoutPath, { layoutPath });
    return assLayoutPath;
};
/**
 * 读取routes配置文件，hulu 配置版
 * 生成基于 react-router 基准的配置文件
 */
export const stepAssRouter = async () => {
    const sourcePath = $repo.template('caokong/.assists', 'routes.ts.ejs');
    const targetPath = $repo.hulu('.assists', 'routes.tsx');
    /**
     * 读取CK体系的routes配置
     * - src/routes.ts
     * - .caokong/routes.ts
     */
    const routesPath = existByCk('./routes.ts');
    const srcRoutes = await $load.ts(routesPath);
    const srcRoutes$tree = rowsToTree([...srcRoutes]);
    /**
     * 设置最外层layout
     * - src/layout.ts
     * - .caokong/layouts
     */
    const layoutPath = generateAssistLayout();
    // 判断是否拥有根下默认页面的配置项
    const hasStart = !!srcRoutes$tree.find(({ path }) => path === '*');
    const hasNoPermission = !!srcRoutes$tree.find(({ path }) => path === 'no-permission');
    const hasNoMatch = !!srcRoutes$tree.find(({ path }) => path === 'no-match');
    const presetRoutes = [
        !hasStart && { path: '*', view: existByCk('./views/no-match/index.ts') },
        !hasNoPermission && {
            path: 'no-permission',
            view: existByCk('./views/no-permission/index.ts')
        },
        !hasNoMatch && { path: 'no-match', view: existByCk('./views/no-match/index.ts') }
    ].filter(Boolean);
    const wrapperRoutes = [
        { path: '/', view: layoutPath, children: [...presetRoutes, ...srcRoutes$tree] }
    ];
    // 解析
    const routes$tile = tile({ routes: wrapperRoutes });
    const lazys = {};
    // 默认route组件均为异步加载
    each(routes$tile, (value, keyPath) => {
        const regex = /\.view$/;
        const isView = regex.test(keyPath);
        if (isView) {
            const lazyPath = keyPath.replace(regex, '.lazy');
            const importPath = transformViewPath(value);
            lazys[lazyPath] = `__FUNC_PLACEHOLDER_START__() => import('${importPath}')__FUNC_PLACEHOLDER_END__`;
        }
    });
    const routes$tile1 = { ...routes$tile, ...lazys };
    const routesSetting = stack(routes$tile1);
    // 生成 assist 文件
    $tpl.fileout(sourcePath, targetPath, routesSetting);
};
