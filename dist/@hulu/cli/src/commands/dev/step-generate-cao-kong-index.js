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
    const caokongPath = $repo.hulu('.caokong', 'src');
    const sourcePath = $repo.cwd('src');
    const exist = (pwd) => {
        const relative = path.relative(caokongPath, pwd);
        const src = path.join(sourcePath, relative);
        if (fsa.existsSync(src)) {
            return src;
        }
        return pwd;
    };
    //-> 读取 hulu/.caokong 下所有的文件
    const exports$1 = await globby(caokongPath, {
        expandDirectories: {
            extensions: ['ts', 'tsx', 'jsx', 'js']
        }
    });
    const exports = exports$1.map(exist).map((pwd) => {
        // 隐藏后缀名
        return pwd.split('.').slice(0, -1).join('.');
    });
    const imports$1 = await globby(caokongPath, {
        expandDirectories: {
            extensions: ['less', 'css']
        }
    });
    const imports = imports$1.map(exist);
    // @todo 支持图片模块
    // const modules = await globby(caokongPath, {
    //     expandDirectories: {
    //         extensions: ['jpg', 'jpeg', 'png', 'svg']
    //     }
    // });
    const caokongTplIndex = $repo.template('caokong', 'src/index.ts.ejs');
    const targetPath = $repo.hulu('.caokong', 'src/index.ts');
    await $tpl.dirout(caokongTplIndex, targetPath, { exports, imports });
}
