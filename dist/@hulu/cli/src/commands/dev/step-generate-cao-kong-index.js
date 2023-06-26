import { $repo, $tpl, fsa, globby, path } from '@hulu/core';
/**
 * 生成caokong体系的index文件
 * - index 操控文件的内核所在
 * - 体系通过 ~ck 来访问操控体系的所有引入
 */
export async function stepGenerateCaoKongIndex() {
    /**
     * - 读取 hulu/.caokong 下所有的文件
     * - 判断操控源文件是否存在
     * - 写入最终引用文件
     */
    const caokongPath = $repo.hulu('.caokong');
    const sourcePath = $repo.cwd('src');
    //-> 读取 hulu/.caokong 下所有的文件
    const ck = await globby(caokongPath, {
        expandDirectories: {}
    });
    //-> 判断操控源文件是否存在;
    const paths = ck.map((pwd) => {
        const relative = path.relative(caokongPath, pwd);
        const src = path.join(sourcePath, relative);
        if (fsa.existsSync(src)) {
            return src;
        }
        return pwd;
    });
    const caokongTplIndex = $repo.template('caokong', 'index.ts.ejs');
    const targetPath = $repo.hulu('.caokong', 'index.ts');
    await $tpl.dirout(caokongTplIndex, targetPath, { paths });
}
