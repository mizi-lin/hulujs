import { $repo, $load, $tpl, $root } from '@hulujs/core';
import { aliasToSrcWithCaoKong } from './utils.js';
import { omit } from 'lodash-es';
/**
 * 生成各编译器的配置文件
 */
export const stepGenerateCompilerConfig = async (compiler, option) => {
    /**
     * hulu拥有自己的配置文件
     * 而各编译器也拥有自己的配置文件，
     * 这样会造成开发人员的迷惑和冗余的操作，
     * 所以各编译器的配置文件会统一放到hulu的配置文件中，
     * 同时会自动生成各编译器的配置文件，
     * 放置在.assists中，供用户查看
     * - 个别编译器不支持自定义配置文件路径，而会放置在该编译器支持的位置
     * - 但其信息会被hulu的配置文件覆盖
     */
    // 读取配置文件
    const configPath = $repo.config();
    const config = await $load.ts(configPath);
    const { path: outPath, omitKeys = [] } = option.config ?? {};
    const tplPath = $root.template(`repo/config/${compiler}.config.ts.ejs`);
    const config$ = {
        ...(omit(config, ['dumiConfig', ...omitKeys]) ?? {}),
        ...(config.dumiConfig ?? {})
    };
    // @todo 控制 config 内容
    // 使用 ast 生成
    $tpl.fileout(aliasToSrcWithCaoKong(tplPath), aliasToSrcWithCaoKong(outPath), {
        config: JSON.stringify(config$, null, 2)
    });
};
