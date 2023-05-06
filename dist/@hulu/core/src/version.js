import { semver, shell } from './msc.js';
import { $root } from './root.js';
/**
 * 关于版本的获取和操作
 */
class Version {
    static defaultValue = '0.0.0';
    // 获得命令的版本
    bin(cmd) {
        let { stdout } = shell.exec(`${cmd} -v`, { silent: true });
        if (!stdout.trim()) {
            const { stdout: stdout$1 } = shell.exec(`${cmd} --version`, { silent: true });
            stdout = stdout$1;
        }
        const ver = semver.coerce(stdout.trim());
        return ver?.version ?? Version.defaultValue;
    }
    // 获取npm包的版本
    pkg(name) {
        const cwd = $root.cwd(false);
    }
}
export { Version };
const $ver = new Version();
export { $ver };
