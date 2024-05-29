declare class Git {
    private git;
    $_: any;
    constructor(projectCWD?: string);
    init(projectCWD?: string): Promise<void>;
    add(files?: string | string[]): Promise<any>;
    /**
     * git add . && git commit -m `commitMsg` && git push
     */
    acp(commitMsg: string, addFiles?: string | string[]): Promise<undefined>;
    currentBranch(): Promise<any>;
    gitInit(): Promise<void>;
    /**
     * git pull
     * 若没有tracking远程，则自动tracking
     */
    pull(params: string[]): Promise<undefined>;
    tracking(): Promise<undefined>;
    /**
     * 当前状态
     */
    status(): Promise<any>;
    /**
     * 是否定义默认的remote
     * @todo hulu 仅支持单 remote, 或系统配置
     */
    getRemote(): Promise<any>;
}
declare const $git: Git;
declare const $_git: any;
export { Git, $git, $_git };
