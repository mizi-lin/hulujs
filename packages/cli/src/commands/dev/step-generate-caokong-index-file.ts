import { $repo, $tpl, globby } from '@hulu/core';
import { getPathExistByCaoKong } from './utils.js';
import { add } from 'lodash-es';

/**
 * 生成caokong体系的index文件
 * - index 操控文件的内核所在
 * - 体系通过 ~ck 来访问操控体系的所有引入
 */
export async function stepGenerateCaoKongIndexFile() {
    /**
     * - 读取 hulu/.caokong 下所有的文件
     * - 判断操控源文件是否存在
     * - 写入最终引用文件
     */
    const caokongPath = $repo.hulu('.caokong', 'src');

    //-> 读取 hulu/.caokong 下所有的文件
    const exports$1 = await globby(caokongPath, {
        expandDirectories: {
            extensions: ['ts', 'tsx', 'jsx', 'js', 'json']
        }
    });

    const exports = exports$1
        .map(getPathExistByCaoKong)
        .map((address) => {
            // 隐藏后缀名
            return address
                .split('.')
                .slice(0, -1)
                .join('.')
                .replace(/\/index$/, '');
        })
        .filter((address) => {
            // views 的组件不参与超控体系
            return !(/\/views\//.test(address) || /app$/.test(address) || /root$/.test(address));
        });

    const imports$1 = await globby(caokongPath, {
        expandDirectories: {
            extensions: ['less', 'css']
        }
    });

    const imports = imports$1.map(getPathExistByCaoKong);

    // @todo 支持图片模块
    // const modules = await globby(caokongPath, {
    //     expandDirectories: {
    //         extensions: ['jpg', 'jpeg', 'png', 'svg']
    //     }
    // });

    const caokongTplIndexPath = $repo.template('caokong', '.caokong', 'src/index.ts.ejs');
    const targetPath = $repo.hulu('.caokong', 'src/index.ts');

    await $tpl.dirout(caokongTplIndexPath, targetPath, { exports, imports });
}
