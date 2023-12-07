import { Arguments } from 'yargs';
/**
 * 根据codemod代码模版生成代码模块
 */
export declare const command = "generate";
export declare const aliases: string[];
export declare const describe = "\u6839\u636Ecodemod\u4EE3\u7801\u6A21\u7248\u751F\u6210\u4EE3\u7801\u6A21\u5757";
export declare const builder: (yargs: any) => any;
export declare const handler: (argv: Arguments<Record<string, any>>) => Promise<void>;
