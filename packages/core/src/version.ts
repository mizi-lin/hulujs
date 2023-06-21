import { isNil } from '@hulu/mu';
import { SemVer, semver, shell } from './msc.js';
import { $repo } from './root.js';

/**
 * 关于版本的获取和操作
 */
export class Version {
    static defaultValue = '0.0.0';

    // 获得命令的版本
    bin(cmd: string) {
        let { stdout } = shell.exec(`${cmd} -v`, { silent: true });
        if (!stdout.trim()) {
            const { stdout: stdout$1 } = shell.exec(`${cmd} --version`, { silent: true });
            stdout = stdout$1;
        }
        const ver = semver.coerce(stdout.trim());
        return ver?.version ?? Version.defaultValue;
    }

    // 获取npm包的版本
    pkg(name: string) {
        const cwd = $repo.pwd();
    }
}

const $ver = new Version();

export { $ver };
