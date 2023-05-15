import { $bash, $log, $prompts, $ver, prompts } from '@hulu/core';
/**
 * 安装repo的包
 */
const stepPackageInstall = async () => {
    /**
     * 设定npm源
     */
    const registry$source = $bash.exec('yarn config get npmRegistryServer', { type: 'line' });
    const registry = await $prompts.select({
        message: `? 选择npm包源管理器`,
        initialValue: registry$source,
        options: [
            {
                label: 'taobao ------- https://registry.npmmirror.com/',
                value: 'https://registry.npmmirror.com/',
                hint: '推荐'
            },
            {
                label: 'npm ---------- https://registry.npmjs.org/',
                value: 'https://registry.npmjs.org/'
            },
            {
                label: 'yarn --------- https://registry.yarnpkg.com/',
                value: 'https://registry.yarnpkg.com/'
            },
            {
                label: 'tencent ------ https://mirrors.cloud.tencent.com/npm/',
                value: 'https://mirrors.cloud.tencent.com/npm/'
            },
            {
                label: 'cnpm --------- https://r.cnpmjs.org/',
                value: 'https://r.cnpmjs.org/'
            },
            {
                label: 'npmMirror ---- https://skimdb.npmjs.com/registry/',
                value: 'https://skimdb.npmjs.com/registry/'
            }
        ]
    });
    $bash.exec(`yarn config set npmRegistryServer ${registry}`);
    const spin = prompts.spinner();
    spin.start('安装包 -> yarn install');
    $bash.exec('yarn install');
    spin.stop();
    const yarnVersion = $ver.bin('yarnVersion');
    $log.info([`hulu只支持Yarn`, `当前Yarn版本为: v${yarnVersion}`]);
};
export default stepPackageInstall;
