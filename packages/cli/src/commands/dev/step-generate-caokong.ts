import { $load, $repo, $tpl } from '@hulujs/core';
import { NodeEnvEnum } from '@hulujs/types';
import { rmSync } from 'fs';

export const stepGenerateCaoKong = async () => {
    const sourcePath = $repo.template('caokong/.caokong');
    const targetPath = $repo.cwd('hulu/.caokong');
    const configPath = $repo.config();
    const config = await $load.ts(configPath);
    const params = {
        isDev: process.env.NODE_ENV === NodeEnvEnum.development,
        config
    };
    const tplOptions = {
        globbyOptions: { dot: true, ignore: ['**/index.ts.ejs'] }
    };
    // 删除旧文件
    rmSync(targetPath, { recursive: true, force: true });

    // 文件对文件
    await $tpl.dirout(sourcePath, targetPath, params, tplOptions);
};
