#!/usr/bin/env node

import { $log, startMontageServer } from '@hulujs/core';
import { Arguments } from 'yargs';

/**
 * Montage低代码服务
 */
export const command = 'montage';
export const aliases = [];
export const describe = 'Montage低代码服务';
export const builder = (yargs: any) => {
    return yargs
        .usage(`hulu montage Montage低代码服务`)
        .demandCommand(0)
        .example('hulu montage', '代码生成')
        .example('hulu g', '代码生成')
        .showHelpOnFail(true);
};

export const handler = async function (argv: Arguments<Record<string, any>>) {
    $log.start(['hulu montage', 'Montage Server']);

    startMontageServer();

    $log.end([`服务已启动`, `127.0.0.1:4555`], false);
};
