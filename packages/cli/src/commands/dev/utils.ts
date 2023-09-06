import { $repo, fsa, path } from '@hulu/core';

/**
 * 判断操控体系实际文件存在地址
 */
export const existByCk = (address: string) => {
    const caokongPath = $repo.hulu('.caokong', 'src');
    const sourcePath = $repo.cwd('src');
    const relative = path.isAbsolute(address) ? path.relative(caokongPath, address) : address;
    const src = path.join(sourcePath, relative);
    return fsa.existsSync(src) ? src : path.join(caokongPath, relative);
};
