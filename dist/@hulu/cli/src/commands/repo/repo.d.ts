import { Arguments } from 'yargs';
/**
 * 初始化葫芦系统, 创建 hulu init
 * hulu repo 指 hulu project 运行的环境
 * 包括 eslint, prettier, stylelint, husky 等环境配置
 */
export declare const command = "repo";
export declare const aliases: string[];
export declare const describe = "hulu repo \u521B\u5EFA\u6807\u51C6\u7684\u846B\u82A6\u9879\u76EE";
export declare const builder: (yargs: any) => any;
export declare const handler: (argv: Arguments<Record<string, any>>) => Promise<void>;
