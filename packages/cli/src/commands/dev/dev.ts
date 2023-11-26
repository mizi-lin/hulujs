import { $bash, $load, $log, $repo } from '@hulu/core';
import { Arguments } from 'yargs';
import createDebug from 'debug';
import { stepGenerateCaoKong } from './step-generate-caokong.js';
import { stepGenerateCaoKongIndexFile } from './step-generate-caokong-index-file.js';
import { stepAssRouter } from './step-ass-router.js';
import { getCommandParamsString } from '../../utils.js';

const debug = createDebug('dev');

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
    $log.start(['hulu dev', '启动本地开发服务']);

    process.env.NODE_ENV ??= 'development';

    try {
        const configPath = $repo.config();
        $log.step([`正在读取配置文件`, configPath]);

        const config = await $load.ts(configPath);

        const { compiler } = config ?? {};

        $log.step([`当前编译器`, compiler]);

        $log.step(`正在生成超控体系`);
        await stepGenerateCaoKong();
        await stepGenerateCaoKongIndexFile();

        $log.step(`正在生成辅助体系`);
        await stepAssRouter();

        const paramString = getCommandParamsString(argv);

        const bin = $repo.cwd('node_modules', '.bin', compiler);
        const command = `${bin} --config ${configPath} ${paramString}`;
        $log.step([`正在启动服务`, command.replace(bin, compiler)]);
        $bash.live(command, { silent: false });
        $log.end([`命令结束`]);
    } catch (err) {
        console.log(err);
        $log.error(err as Error);
        // $log.error([`red::当前目录下没找到葫芦的配置文件`, 'hulu/config.ts']);
        // @todo 配置服务
        $log.end([`命令结束`]);

        // const compilers = ['vite', 'umi', 'dumi'];
        // $log.start([`正嗅探到其它的编译器`, compilers.join(',')]);
        // const bin = compilers
        //     .map((compiler) => {
        //         return $repo.cwd('node_modules', '.bin', compiler);
        //     })
        //     .find((path) => {
        //         return existsSync(path);
        //     });
        // if (!bin) {
        //     $log.error([`未嗅探到编译器`, compilers.join(',')]);
        //     return void 0;
        // }
        // // 使用bin启动开发服务
        // $log.step([`嗅探到编译服务`, bin]);
        // $log.step(`正在启动编译服务`);
        // $bash.live(`${bin} dev`, { silent: false });
    }
};
