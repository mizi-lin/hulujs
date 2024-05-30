import { kebabCase, omit } from 'lodash-es';
import { Arguments } from 'yargs';
import { hideBin } from 'yargs/helpers';

/**
 * 获取命令行参数的字符串表示
 *
 * @param argv 命令行参数对象
 * @returns 字符串表示的命令行参数
 */
export const getCommandParamsString = (omitKeys: string[] = []) => {
    const [command, ...args] = hideBin(process.argv);

    const omitKeys$ = omitKeys.map((key) => {
        return new RegExp(`-{1,2}(${key}|${kebabCase(key)})((=.*)|$)`);
    });

    const params = args.filter((arg) => {
        return !omitKeys$.some((omitKey) => {
            return omitKey.test(arg);
        });
    });

    return params.join(' ');
};

// export const getCommandParamsString = (
//     argv: Arguments<Record<string, any>>,
//     defaultValue: Record<string, string | number | boolean> = {}
// ) => {
//     const paramsObj = { ...defaultValue, ...argv };
//     const params = Object.entries(omit(paramsObj, '_', '$0')).map(([key, value]) => {
//         if (value === true) return `--${key}`;
//         return `--${key} ${value}`;
//     });
//     return params.join(' ');
// };
