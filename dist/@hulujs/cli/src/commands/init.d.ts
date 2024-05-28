import { Arguments } from 'yargs';
/**
 * 初始化葫芦系统, 创建 hulu init
 * hulu repo 指 hulu project 运行的环境
 * 包括 eslint, prettier, stylelint, husky 等环境配置
 */
export declare const command = "init";
export declare const aliases: string[];
export declare const describe = "hulu init \u521D\u59CB\u5316\u914D\u7F6E";
export declare const builder: (yargs: any) => any;
export declare const handler: (argv: Arguments<Record<string, any>>) => Promise<void>;
