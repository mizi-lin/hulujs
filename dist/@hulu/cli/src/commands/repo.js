import { $log, $repo, $ver, semver, $prompts, $tpl, path, someCase, globby } from '@hulu/core';
/**
 * 初始化葫芦系统, 创建 hulu init
 * hulu repo 指 hulu project 运行的环境
 * 包括 eslint, prettier, stylelint, husky 等环境配置
 */
export const command = 'repo';
export const aliases = [];
export const describe = 'hulu repo 创建标准的葫芦项目';
export const builder = (yargs) => {
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
export const handler = async function (argv) {
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
    /**
     * repo 项目文件夹名称
     * project 项目名称
     * projectAlias 项目简称
     *
     * 三者可以不一样
     * 大部分情况下 repo 与 projectAlias 名称一样
     * 极小部分的情况下 三者一样
     */
    $log.info([
        'cyan::名词解释',
        `文件夹名称(repo name): 项目所在文件夹名称`,
        `包名称(pkg name): package.json 的name值，建议3~8个字符，只能用英文字符，用作项目开发alias`,
        `---`,
        `大部分情况下，文件夹名称与包名称一致`
    ]);
    const pkg = $repo.closest($repo.cwd(), 'package.json');
    if (pkg) {
        await $prompts.confirm({ message: $log.text(['? 待创建的项目，在已存在的项目下, 是否确认创建', `- ${pkg}`, `- 这是一个npm项目`]) }, { message: '请切换到合适路径, 再创建项目' });
    }
    const currentFiles = await globby($repo.pwd(), { onlyDirectories: true, deep: 1 });
    const isCurrent = await $prompts.select({
        message: $log.text([
            '? 是否在当前目录下创建项目',
            `- 建议项目创建在空文件夹下`,
            `- 当前目录下拥有${currentFiles?.length ?? 0}个文件夹`
        ]),
        options: [
            { value: 'none', label: '直接创建' },
            { value: 'create', label: '新建目录后再创建项目' }
        ]
    });
    const repo = isCurrent !== 'create'
        ? '.'
        : await $prompts.text({
            message: $log.text(['? 输入目录名']),
            placeholder: '目录名',
            require: true
        });
    const project = await $prompts.text({
        message: $log.text(['? 输入项目简称', '名称尽量简短，建议3~8个字符', '可与目录名，项目名不一样']),
        placeholder: '项目简称(3~8字符)',
        require: true
    });
    const targetPath = path.join($repo.pwd(), repo);
    await $tpl.dirout($repo.template('repo/base'), targetPath, {
        repo: someCase(repo),
        project: someCase(project)
    });
    $log.success(['项目创建成功', `项目地址: ${targetPath}`]);
    // isCancelPrompt(projectName);
    // Just pass a template literal to use super easy API.
    // console.log('npm_execpath', process.env.npm_execpath);
    // console.log('npm_config_user_agent', process.env.npm_config_user_agent);
    // console.log('argv', argv);
    // console.log('node argv', process.argv);
};
