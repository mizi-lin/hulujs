import { $bash, $load, $log, $repo } from '@hulu/core';
import createDebug from 'debug';
import { stepGenerateCaoKong } from './step-generate-caokong.js';
import { stepGenerateCaoKongIndexFile } from './step-generate-caokong-index-file.js';
import { stepAssRouter } from './step-ass-router.js';
import { getCommandParamsString } from '../../utils.js';
const debug = createDebug('prod');
export const command = 'prod';
export const aliases = ['build'];
export const describe = 'hulu prod 构建生产版本';
export const builder = (yargs) => {
    return yargs
        .usage(describe)
        .demandCommand(0)
        .example('hulu prod', '构建生产版本')
        .example('hulu build', '构建生产版本')
        .showHelpOnFail(true);
};
export const handler = async function (argv) {
    $log.start(['hulu prod', '构建生产版本']);
    process.env.NODE_ENV ??= 'production';
    try {
        const configPath = $repo.config();
        $log.step([`正在读取配置文件`, configPath]);
        const config = await $load.ts(configPath);
        const { compiler } = config ?? {};
        const buildMap = { vite: 'vite build' };
        $log.step([`当前编译器`, compiler]);
        $log.step(`正在生成超控体系`);
        await stepGenerateCaoKong();
        await stepGenerateCaoKongIndexFile();
        $log.step(`正在生成辅助体系`);
        await stepAssRouter();
        const bin = $repo.cwd('node_modules', '.bin', buildMap[compiler]);
        const paramString = getCommandParamsString(argv, { logLevel: 'info' });
        const command = `${bin} --config ${configPath} ${paramString}`;
        $log.step([`正在启动服务`, command.replace(bin, buildMap[compiler])]);
        // 使用bin启动开发服务
        $bash.live(command, { silent: false });
        $log.end([`命令结束`]);
    }
    catch (err) {
        $log.error(err);
        $log.end([`命令结束`]);
    }
};