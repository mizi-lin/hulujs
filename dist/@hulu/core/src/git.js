import { isNil } from '@hulu/mu';
import { CleanOptions, simpleGit } from './msc.js';
import { $root } from './root.js';
class Git {
    git;
    $_;
    constructor(projectCWD) {
        this.init(projectCWD);
    }
    async init(projectCWD) {
        projectCWD ??= process.env.GitCWD ?? $root.cwd();
        this.git = simpleGit({
            baseDir: projectCWD,
            binary: 'git',
            maxConcurrentProcesses: 6,
            trimmed: false
        });
        this.$_ = this.git;
    }
    async add(files = '.') {
        return await this.git.add(files);
    }
    /**
     * git add . && git commit -m `commitMsg` && git push
     */
    async acp(commitMsg, addFiles = '.') {
        const status = await this.status();
        const { isChange, current, tracking } = status;
        if (!isChange)
            return void 0;
        const remote = await this.getRemote();
        try {
            await this.pull([remote, current]);
        }
        catch (e) { }
        await this.$_.add(addFiles);
        await this.$_.commit(commitMsg);
        await this.$_.push(['-u', remote, tracking ? 'HEAD' : current]);
    }
    // 当前分支名
    async currentBranch() {
        const { current } = await this.status();
        return current;
    }
    async gitInit() {
        await this.git.init();
    }
    /**
     * git pull
     * 若没有tracking远程，则自动tracking
     */
    async pull(params) {
        const remote = await this.getRemote();
        try {
            await this.git.fetch([remote, '--prune']);
            await this.git.pull(params);
        }
        catch (e) {
            const { tracking, current } = await this.status();
            if ('HEAD' === current)
                return void 0;
            if (!isNil(tracking))
                await this.git.branch(['--unset-upstream']);
            await this.tracking();
            await this.git.clean(CleanOptions.FORCE);
            await this.pull(params);
        }
    }
    // --set-upstream-to
    async tracking() {
        const { tracking, current } = await this.status();
        if ('HEAD' === current)
            return void 0;
        if (!isNil(tracking))
            return void 0;
        const remote = await this.getRemote();
        try {
            // 远程拥有这个分支
            await this.git.branch(['--set-upstream-to', `${remote}/${current}`, { current }]);
        }
        catch (e) {
            // 远程没有分支，直接推送
            await this.git.push(['-u', remote, current]);
        }
    }
    /**
     * 当前状态
     */
    async status() {
        const status = await this.git.status();
        // 是否有文件改变
        const isChange = !!status.files?.length;
        // 当前分支是否推送到远程
        const isPushOrigin = !!status.tracking;
        // 当前是否有commit未提交
        const uncommited = !!status.ahead;
        // 拥有冲突文件
        const isConfilct = !!status.conflicted?.length;
        return { isChange, isConfilct, isPushOrigin, uncommited, ...status };
    }
    /**
     * 是否定义默认的remote
     * @todo hulu 仅支持单 remote, 或系统配置
     */
    async getRemote() {
        try {
            const remote = await this.git.getRemotes();
            return remote[0]?.name;
        }
        catch (e) {
            return void 0;
        }
    }
}
const $git = new Git();
const $_git = $git.$_;
export { Git, $git, $_git };
