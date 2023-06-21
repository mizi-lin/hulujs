import { $bash, $log, $prompts, $repo, globby, path } from '@hulu/core';
import yargs from 'yargs';

const canRemoveFiles = (pwd: string) => {
    if (!pwd) $log.error('文件目录不能为空');
    return pwd.split(path.sep).length > 2;
};

/**
 * 删除当前文件夹下的所有文件
 */
export const removeCurrentAll = (argv) => {
    $log.warn(`为了保证安装，该命令只删除第三级目录下的文件或文件夹`);
    const pwd = $repo.pwd();
    if (!canRemoveFiles(pwd)) return $log.error(`${pwd}文件层级过高，请手动删除`);
    $bash.exec(`rm -rf .[^.]* ./*`, { silent: false });
    $log.end('文件已删除');
};

export const removeCurrentFiles = async (argv) => {
    const { depth = 1, dot } = argv;
    const pwd = $repo.pwd();
    const files = await globby(pwd, { onlyFiles: true, deep: depth, dot });
    if (!canRemoveFiles(pwd)) return $log.error(`${pwd}文件层级过高，请手动删除`);
    if (!files.length) return $log.error(`当前目录下没有文件`);
    const selected = (await $prompts.multiselect({
        message: '请选择将要删除的文件',
        required: true,
        options: files.map((file) => {
            return { value: file, label: file };
        })
    })) as string[];
    $bash.exec(`rm -rf ${selected.join(' ')}`, { silent: false });
    $log.end(['文件已删除', ...selected]);
};

export const removeCurrentDir = async (argv) => {
    const { depth = 1, dot } = argv;
    const pwd = $repo.pwd();
    const directories = await globby(pwd, { onlyDirectories: true, deep: depth, dot });
    if (!canRemoveFiles(pwd)) return $log.error(`${pwd}文件层级过高，请手动删除`);
    if (!directories.length) return $log.error(`当前目录下没有文件夹`);
    const selected = (await $prompts.multiselect({
        message: '请选择将要删除的文件',
        required: true,
        options: directories.map((file) => {
            return { value: file, label: file };
        })
    })) as string[];
    $bash.exec(`rm -rf ${selected.join(' ')}`, { silent: false });
    $log.end(['文件已删除', ...selected]);
};
