/**
 * 环境检测
 */
import { $log, $ver, semver } from '@hulu/core';
const stepEnv = () => {
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
};
export default stepEnv;
