import createDebug from 'debug';
import { $log, $repo, globby } from '@hulujs/core';
import { getOvrdSrcPath, isInstallCaoKong, srcToAliasWithCaoKong } from '../dev/utils.js';
import { select, confirm } from '@clack/prompts';
import fse from 'fs-extra';
/**
 * 将操控体系的文件安装到前台(ovrd层)
 */
const debug = createDebug('caokong');
export const command = 'caokong';
export const aliases = ['ck'];
export const describe = 'hulu dev 启动本地开发服务';
export const builder = (yargs) => {
    return yargs
        .usage(describe)
        .demandCommand(0)
        .example('hulu caokong', '安装操控体系文件')
        .example('hulu ck', '安装操控体系文件')
        .showHelpOnFail(true);
};
export const handler = async function (argv) {
    try {
        $log.start(['hulu caokong', '安装超控文件', '别名: hulu ck']);
        /**
         * 从 template/generator 提取信息
         */
        const caokongPath = $repo.hulu('.caokong/src');
        /**
         * 获得文件夹平铺路径
         */
        const files = await globby(caokongPath, {
            onlyFiles: true,
            ignore: ['**/views/**', '**/index.ts']
        });
        const views = await globby(`${caokongPath}/views`, {
            onlyDirectories: true,
            markDirectories: false
        });
        const paths = [...files, ...views].map((value) => {
            const install = isInstallCaoKong(value);
            const label = srcToAliasWithCaoKong(value);
            return {
                value,
                label: `${label} ${install ? '(已安装)' : ''}`,
                hint: install ? '覆盖原文件' : ''
            };
        });
        const caokongPath$ = (await select({
            message: '选择需安装到前台的超控文件',
            options: paths
        }));
        const ovrdPath = getOvrdSrcPath(caokongPath$);
        const alias = srcToAliasWithCaoKong(ovrdPath);
        if (isInstallCaoKong(ovrdPath)) {
            const can = await confirm({
                message: `${alias}已存在，是否覆盖安装`
            });
            if (!can) {
                $log.end([`退出安装超控文件`]);
                return void 0;
            }
        }
        fse.copySync(caokongPath$, ovrdPath, {
            overwrite: true
        });
        $log.end([`文件已安装`, alias]);
    }
    catch (e) {
        $log.end([`命令中断`]);
    }
};
