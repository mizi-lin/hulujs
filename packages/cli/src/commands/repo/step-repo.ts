import { $log, $repo, $prompts, $tpl, path, someCase, globby } from '@hulu/core';

/**
 * 创建 hulu repo
 */
interface StepRepoArgs {
    compiler: 'vite' | string;
    dirname: string;
}

const stepRepo = async ({ compiler = 'vite', dirname }: StepRepoArgs) => {
    $log.info([
        'cyan::名词解释',
        `文件夹名称(repo name): 项目所在文件夹名称`,
        `包名称(pkg name): package.json 的name值，`,
        `建议3~8个字符，只能用英文字符，用作项目开发alias`,
        `---`,
        `大部分情况下，文件夹名称与包名称一致`
    ]);

    const pkg = $repo.closest($repo.cwd(), 'package.json');

    if (pkg) {
        await $prompts.confirm(
            {
                message: $log.text([
                    '? 待创建的项目，在已存在的项目下, 是否确认创建',
                    `- ${pkg}`,
                    `- 这是一个npm项目`
                ])
            },
            { message: '请切换到合适路径, 再创建项目' }
        );
    }

    const currentFiles = await globby($repo.pwd(), { onlyDirectories: true, deep: 1 });

    const isCurrent = dirname
        ? 'create'
        : await $prompts.select({
              message: $log.text([
                  '? 是否在当前目录下创建项目',
                  `- 建议项目创建在空文件夹下`,
                  `- 当前目录下拥有${currentFiles?.length ?? 0}个文件夹`
              ]),
              options: [
                  { value: 'create', label: '新建文件夹后创建项目' },
                  { value: 'none', label: '直接创建项目' }
              ]
          });

    const repo =
        isCurrent !== 'create'
            ? '.'
            : dirname
            ? dirname
            : await $prompts.text({
                  message: $log.text(['? 输入目录名']),
                  placeholder: '目录名',
                  require: true
              });

    const project = await $prompts.text({
        message: $log.text([
            '? 输入项目简称(package.name)',
            '名称尽量简短，建议3~8个字符',
            '可与目录名，项目名不一样'
        ]),
        placeholder: '项目简称(3~8字符)',
        require: true
    });

    const title = await $prompts.text({
        message: $log.text(['? 输入项目名称', '可为中文名']),
        placeholder: '用作浏览器Tab名称',
        require: true
    });

    const targetPath = path.join($repo.pwd(), repo as string);
    const params = {
        repo: someCase(repo as string),
        project: someCase(project as string),
        compiler,
        title,
        compilerVersion: '5.0.2'
    };

    const tplOptions = { globbyOptions: { dot: true } };
    await $tpl.dirout($repo.template('repo/base'), targetPath, params, tplOptions);
    await $tpl.dirout($repo.template(`repo/${compiler}`), targetPath, params, tplOptions);

    $log.success(['项目创建成功', `项目地址: ${targetPath}`]);

    return targetPath;
};

export default stepRepo;
