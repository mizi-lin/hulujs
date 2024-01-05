import { $bash, $load, $log, $repo } from '@hulujs/core';
import { Arguments } from 'yargs';
import createDebug from 'debug';
import { stepGenerateCaoKong } from './step-generate-caokong.js';
import { stepGenerateCaoKongIndexFile } from './step-generate-caokong-index-file.js';
import { stepAssRouter } from './step-ass-router.js';
import { getCommandParamsString } from '../../utils.js';
import { getCompiler } from '../repo/utils.js';
import { stepGenerateCompilerConfig } from './step-generate-compiler-config.js';

const debug = createDebug('prod');

export const command = 'prod';
export const aliases = ['build'];
export const describe = 'hulu prod 构建生产版本';
export const builder = (yargs: any) => {
    return yargs
        .usage(describe)
        .demandCommand(0)
        .option('outDir', {
            type: 'string'
        })
        .example('hulu prod', '构建生产版本')
        .example('hulu build', '构建生产版本')
        .showHelpOnFail(true);
};

export const handler = async function (argv: Arguments<Record<string, any>>) {
    $log.start(['hulu prod', '构建生产版本']);

    process.env.NODE_ENV ??= 'production';

    try {
        const configPath = $repo.config();
        $log.step([`正在读取配置文件`, configPath]);

        const config = await $load.ts(configPath);

        const { compiler } = config ?? {};
        const compilerOption = getCompiler(compiler);

        $log.step([`当前编译器`, compiler]);

        $log.step(`正在生成超控体系`);
        await stepGenerateCaoKong();
        await stepGenerateCaoKongIndexFile();

        $log.step(`正在生成辅助体系`);
        await stepAssRouter();
        // await stepGenerateCompilerConfig(compiler, compilerOption);

        const bin = $repo.cwd('node_modules', '.bin', compilerOption.build);
        const paramString = getCommandParamsString();
        // const command = `${bin} --config ${configPath} ${paramString}`;
        const command = `${bin}`;
        $log.step([`正在启动服务`, command.replace(bin, compilerOption.build)]);
        // 使用bin启动开发服务
        $bash.live(command, { silent: false });
        $log.end([`命令结束`]);
    } catch (err) {
        $log.error(err as Error);
        $log.end([`命令结束`]);
    }
};
