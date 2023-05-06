import { Arguments } from 'yargs';
import { $log, $root, $ver, chalk, semver, prompts, isCancelPrompt } from '@hulu/core';

/**
 * 初始化葫芦系统, 创建 hulu init
 * hulu repo 指 hulu project 运行的环境
 * 包括 eslint, prettier, stylelint, husky 等环境配置
 */
export const command = 'repo';
export const aliases = [];
export const describe = 'hulu repo 创建标准的葫芦项目';
export const builder = (yargs: any) => {
    return yargs
        .usage(`hulu repo 创建标准的葫芦项目`)
        .option('select', {
            type: 'boolean',
            alias: 's',
            description: '按需'
        })
        .demandCommand(0)
        .example('hulu repo', '葫芦系统初始化')
        .showHelpOnFail(true);
};

export const handler = async function (argv: Arguments<Record<string, any>>) {
    $log.start([
        'hulu repo',
        '创建标准的葫芦项目',
        '---',
        '默认安装工程化辅助工具，如 eslint, stylelint, pritter等',
        '若需要按需安装',
        '请使用命令 "hulu repo -s" or "hulu repo --select" 进行按需安装'
    ]);

    $log.start('正在检测当前环境');

    const nodeVersion = $ver.bin('node');
    $log.step(['node版本号', `grey::v${nodeVersion}`]);
    if (semver.gt('16.10.0', nodeVersion)) {
        $log.error(['node版本最低要求为v16.10.0', 'grey::建议安装node偶数大版本']);
        $log.end(`命令结束`);
        process.exit(1);
    }

    const gitVersion = $ver.bin('git');
    $log.step(['Git版本号', `grey::v${gitVersion}`]);
    if (semver.gt('2.0.0', gitVersion)) {
        $log.error('Git版本最低要求为v2.0.0');
        $log.end(`命令结束`);
        process.exit(1);
    }

    const pkg = $root.closest($root.cwd(), 'package.json');

    if (pkg) {
        const isConfirm = await prompts.confirm({
            message: $log.text(['? 待创建的项目，在已存在项目下, 是否确认创建', `${pkg}`])
        });

        isCancelPrompt(isConfirm, '请切换到合适路径');
    }

    const isCurrent = await prompts.select({
        message: '？是否在当前目录下创建项目？',
        options: [
            { value: 'none', label: '直接创建' },
            { value: 'create', label: '创建目录后再创建项目' }
        ]
    });

    isCancelPrompt(isCurrent);

    if (isCurrent === 'create') {
        const directory = await prompts.text({
            message: $log.text(['? 输入目录名']),
            placeholder: '目录名',
            validate(value) {
                if (!value.length) return `Value is required!`;
            }
        });

        isCancelPrompt(directory);
    }

    const projectName = await prompts.text({
        message: $log.text(['? 输入项目别称', '名称尽量简短，建议3~8个字符', '可与目录名，项目名不一样']),
        placeholder: '项目简称(3~8字符)',
        validate(value) {
            if (!value.length) return `Value is required!`;
        }
    });

    isCancelPrompt(projectName);

    // Just pass a template literal to use super easy API.
    // console.log('npm_execpath', process.env.npm_execpath);
    // console.log('npm_config_user_agent', process.env.npm_config_user_agent);
    // console.log('argv', argv);
    // console.log('node argv', process.argv);
};
