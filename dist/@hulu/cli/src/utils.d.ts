import { Arguments } from 'yargs';
/**
 * 获取命令行参数的字符串表示
 *
 * @param argv 命令行参数对象
 * @returns 字符串表示的命令行参数
 */
export declare const getCommandParamsString: (argv: Arguments<Record<string, any>>, defaultValue?: Record<string, string | number | boolean>) => string;
