import { $repo, $tpl } from '@hulu/core';
import { NodeEnvEnum } from '@hulu/types';
import { rmSync } from 'fs';

export const stepGenerateCaoKong = async () => {
    const sourcePath = $repo.template('caokong/.caokong');
    const targetPath = $repo.cwd('hulu/.caokong');
    const params = {
        isDev: process.env.NODE_ENV === NodeEnvEnum.development
    };
    const tplOptions = { globbyOptions: { dot: true } };
    rmSync(targetPath, { recursive: true, force: true });
    await $tpl.dirout(sourcePath, targetPath, params, tplOptions);
};
