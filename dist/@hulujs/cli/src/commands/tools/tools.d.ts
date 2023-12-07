import { Arguments } from 'yargs';
/**
 * Git的某些操作结合的快捷命令
 */
export declare const command = "tools";
export declare const aliases: string[];
export declare const describe = "\u4E00\u4E9Bshell\u5C0F\u547D\u4EE4\u6216\u6269\u5C55\u7684\u5DE5\u5177\u96C6\u5408";
export declare const builder: (yargs: any) => any;
export declare const handler: (argv: Arguments<Record<string, any>>) => Promise<void>;
