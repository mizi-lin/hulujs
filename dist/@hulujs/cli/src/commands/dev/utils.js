import { $repo, fsa, path } from '@hulujs/core';
const TsPath = {
    '@/*': ['src/*'],
    '~ck': ['hulu/.caokong/src']
};
/**
 * 获取超控ovrd的地址
 */
export const getOvrdSrcPath = (address) => {
    const address$ = srcToAliasWithCaoKong(address);
    const address$1 = address$.replace(/^~ck/, '@');
    return aliasToSrcWithCaoKong(address$1);
};
/**
 * 计算是否已安装CK
 */
export const isInstallCaoKong = (address) => {
    const address$1 = getOvrdSrcPath(address);
    return fsa.existsSync(address$1);
};
/**
 * 计算操控体系的实际地址
 */
export const getPathExistByCaoKong = (address) => {
    const caokongPath = $repo.hulu('.caokong', 'src');
    const sourcePath = $repo.cwd('src');
    const address$ = srcToAliasWithCaoKong(address);
    const address$1 = address$.replace(/^(@|~ck)/, sourcePath);
    if (fsa.existsSync(address$1)) {
        return address$1;
    }
    const address$2 = address$.replace(/^(@|~ck)/, caokongPath);
    return fsa.existsSync(address$2) ? address$2 : address$1;
};
// const relative = path.isAbsolute(address) ? path.relative(caokongPath, address) : address;
// const src = path.join(sourcePath, relative);
// return fsa.existsSync(src) ? src : path.join(caokongPath, relative);
/**
 * 别名路径转原路径
 */
export const aliasToSrcWithCaoKong = (address) => {
    const sourcePath = $repo.cwd('src');
    const caokongPath = $repo.hulu('.caokong', 'src');
    const assistsPath = $repo.hulu('.assists');
    const huluPath = $repo.hulu();
    const path$ = srcToAliasWithCaoKong(address);
    return path$
        .replace(/^@/, sourcePath)
        .replace(/^\~ck/, caokongPath)
        .replace(/^\~ass/, assistsPath)
        .replace(/^\~hulu/, huluPath);
};
/**
 * 原路径转别名路径
 */
export const srcToAliasWithCaoKong = (address) => {
    // 判断当前路径是否符为绝对路径
    // 判断是否路径是否为相对路径，相对路径的基准路径为 './src'
    // 判断路径为超简写路径, 基准路径位 '@/view'
    const sourcePath = $repo.cwd('src');
    const caokongPath = $repo.hulu('.caokong', 'src');
    const assistsPath = $repo.hulu('.assists');
    const huluPath = $repo.hulu();
    let path$;
    switch (true) {
        case path.isAbsolute(address):
            path$ = address;
            break;
        case /^(@\/|~ck|~ass)/.test(address):
            path$ = address;
            break;
        case /\.{0,2}\//.test(address):
            path$ = path.join(sourcePath, address);
            break;
        default:
            path$ = `${sourcePath}/views/${address}`;
            break;
    }
    return path$
        .replace(caokongPath, '~ck')
        .replace(assistsPath, '~ass')
        .replace(huluPath, '~hulu')
        .replace(sourcePath, '@');
};
/**
 * 输出适合 import path 的简短地址
 */
export const importAlias = (address) => {
    const path$ = srcToAliasWithCaoKong(address);
    return path$.replace(/\.(ts|tsx|js|jsx)$/, '').replace(/\/index$/, '');
};