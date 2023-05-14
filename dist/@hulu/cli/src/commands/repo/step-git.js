/**
 * 配置Git信息
 */
import { $log, $prompts, Git, chalk } from '@hulu/core';
import { Regex } from '@hulu/mu';
const setGit = async (projectPWD) => {
    $log.info([
        `cyan::Git服务代理`,
        `hulu推荐开启Git服务代理`,
        `它可以帮助用户`,
        `- 不定时自动拉取(pull)远程代码, 避免代码冲突`,
        `- 可以自动清理远程删除的分支`,
        `- 可以配合自动推送(push)系统升级文件`,
        `- 可以配合GitFlow管理系统`,
        `- 可以更好的管理版本`
    ]);
    const useGit = await $prompts.confirm({
        message: `? 是否委托hulu代理管理Git`
    });
    if (!useGit) {
        $log.info([
            `不使用代理管理Git`,
            `可以在hulu/config开启服务`,
            `或使用命令 ${chalk.white('hulu git --useGit')} 开启`
        ]);
        return void 0;
    }
    // const isGitInit = fsa.existsSync(path.join(projectPWD, '.git'));
    const git = new Git(projectPWD);
    await git.gitInit();
    await git.$_.rebase([false]);
    const origin = await git.getRemote();
    if (!origin) {
        const gitURL = await $prompts.text({
            message: `? 请输入Git地址(ssh/url)`,
            validate: (value) => {
                if (!value?.length)
                    return `地址不能为空`;
                if (!Regex.Git.test(value))
                    return `Git地址错误`;
            }
        });
        await git.$_.addRemote('origin', gitURL);
    }
    await git.init(projectPWD);
    await git.acp('hulu repo init');
};
export default setGit;
