import { $bash, $load, $log, $repo, simpleGit } from '@hulu/core';
import { Arguments } from 'yargs';
import createDebug from 'debug';

const debug = createDebug('init');

export const command = 'dev';
export const aliases = ['start'];
export const describe = 'hulu dev 启动本地开发服务';
export const builder = (yargs: any) => {
    return yargs
        .usage(describe)
        .demandCommand(0)
        .example('hulu dev', '启动本地开发服务')
        .example('hulu start', '启动本地开发服务')
        .showHelpOnFail(true);
};

export const handler = async function (argv: Arguments<Record<string, any>>) {
    $log.start([
        'hulu dev',
        '启动本地开发服务'
    ]);

    const configPath = $repo.config()
    $log.step([`正在读取配置文件`, configPath]);  

    const config = await $load.ts(configPath);

    const { compiler } = config;

    $log.step([`当前编译器`, compiler]);

    $log.step(`正在生产超控体系`);

    $log.step(`正在启动服务`);

    const bin = $repo.cwd('node_modules', '.bin', compiler);

    // 使用bin启动开发服务
    $bash.live(`${bin} --config ${configPath}`, { silent: false })

};
