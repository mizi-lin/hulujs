import { Arguments } from 'yargs';
/**
 * Git的某些操作结合的快捷命令
 */
export declare const command = "git";
export declare const aliases: never[];
export declare const describe = "Git\u7684\u67D0\u4E9B\u64CD\u4F5C\u7ED3\u5408\u7684\u5FEB\u6377\u547D\u4EE4";
export declare const builder: (yargs: any) => any;
export declare const handler: (argv: Arguments<Record<string, any>>) => Promise<any>;
