export const command = 'repo';
export const aliases = ['init'];
export const describe = 'hulu init | repo';
export const builder = (yargs: any) => {
    return yargs
        .usage(`hulu init | repo 启动本地开发模式`)
        .demandCommand(0)
        .help('h')
        .example('hulu init | repo ', '葫芦系统初始化')
        .showHelpOnFail(true);
};

/**
 * 初始化葫芦系统, 创建 hulu repo
 * hulu repo 指 hulu project 运行的环境
 * 包括 eslint, prettier, stylelint, husky 等环境配置
 */
export const handler = async function (argv: Arguments<Record<string, any>>) {
    debug(`显示头部信息`);
    await getHeaders();

    $print.frame([
        'hulu init: 葫芦开发生态的初始化配置',
        '初始化配置分为两步',
        '---',
        '- 葫芦开发环境底座配置(hulu repo): ',
        '❯ 以工程化配置为主, 包括 git, eslint, stylelint, husky, CI/CD 等配置',
        '❯ 项目文件的管理方式，如 single repo, monorepo, mirco repo 等',
        '---',
        '- 项目配置(hulu project):',
        '❯ 项目所属类型, 如PC端, 移动端，大屏，小程序，桌面端等',
        '❯ 路由组织形式，如配置式路由，约定式路由等',
        '❯ Webpack 等配置'
    ]);

    $print.start(`第一步：正在配置 hulu repo 开发环境`);
    $print.emptyLine();

    /**
     * 判断 hulu-config.ts 文件是否存在
     * 如果存在，则认为已创建成功
     */
    debug(`判断是否初始化过`);
    initialized();

    debug(`检测文件名是否合法`);
    const repoName = await getRepoName();

    debug(`预生成package.json`);
    await $tpl.out(JSON.stringify({ name: repoName, version: '1.0.0' }), './package.json');

    debug(`引导用户生成创建repo的初始值`);
    const initConfig = await setInitConfig();

    $print.emptyLine();
    if (HuluSwitch.use === initConfig.useGit) {
        debug(`配置Git信息`);
        await initGit(initConfig);
    }

    signale.pending(`正在配置yarn v3`);
    await setupYarn(initConfig);

    signale.pending(`正在配置hulu-config.ts`);
    await createHuluConfig(initConfig);

    signale.pending(`正在配置tsconfig.json`);
    await createTsconfig(initConfig);

    signale.pending(`正在配置typings`);
    await createTypings();
    debug('createTypings done');

    $print.pending(`正在配置eslint/stylelint/prettier/husky/lint-staged`);
    await createLinter({
        log: signale.pending,
        initConfig
    });

    $print.pending(`正在生成.gitignore`);
    await createGitIgnore(initConfig);

    /**
     * single 项目配置结果，影响 package.json 的生成
     */
    $print.pending(`正在配置package.json`);
    await createPackage(initConfig);

    HuluSwitch.use === initConfig.useGit && (await $git.acp(`feat: create hulu repo success`));

    $print.success(`hulu repo 创建成功`);

    $print.start(`第二步：创建项目 hulu project`);

    // 创建项目
    await handlerProject(argv, 'repo');

    $print.emptyLine();
};
