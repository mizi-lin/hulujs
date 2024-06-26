import { path, simpleGit } from '@hulujs/core';
import { Arguments } from 'yargs';
import createDebug from 'debug';
import { isFalsy, run, iffalsy, compact, isNil, tile, stack } from '@hulujs/mu';
import { isEmpty } from 'lodash-es';

const debug = createDebug('init');

/**
 * 初始化葫芦系统, 创建 hulu init
 * hulu repo 指 hulu project 运行的环境
 * 包括 eslint, prettier, stylelint, husky 等环境配置
 */

export const command = 'init';
export const aliases = ['i'];
export const describe = 'hulu init 初始化配置';
export const builder = (yargs: any) => {
    return yargs
        .usage(`hulu init 葫芦项目初始化`)
        .demandCommand(0)
        .example('hulu init | repo ', '葫芦系统初始化')
        .showHelpOnFail(true);
};

const TestRegex = () => {
    const demo = [
        'git@git-ext.mininglamp.com:yuntai/fe/mre-mts.git',
        'https://git-ext.mininglamp.com/yuntai/fe/mre-mts.git',
        'git@github.com:mizi-lin/hulujs.git',
        'https://github.com/mizi-lin/hulujs.git',
        'http://github.com/mizi-lin/hulujs.git',
        'httpss://github.com/mizi-lin/hulujs.git',
        'httpps://github.com/mizi-lin/hulujs.git'
    ];

    const regex = /^((https?:\/\/)|(git@)).*?\.git$/;

    demo.forEach((str) => {
        console.log(regex.test(str), str);
    });
};

const TestGit = async () => {
    // const remote = await $git.getRemote();
    // await $git.pull();
    // const status = await $git.status();
    // const files = (await $prompts.multiselect({
    //     message: 'aaa',
    //     options: status.not_added.map((file) => {
    //         return { label: file, value: file };
    //     })
    // })) as string[];
    // await $git.add(files);
    // console.log(await ggit.status());
};

export const handler = async function (argv: Arguments<Record<string, any>>) {
    //     console.log('hulu init');
    //     const git =  simpleGit();
    //    const a =  await git.init();
    //     console.log( a );
    // const relative = path.relative(process.cwd(), '/Users/Mizi');
    // console.log(relative);
    // TestRegex();
    // const yarnVersion = $ver.bin('yarn');
    // console.log('yarnVersion', yarnVersion);
    // const stdout = $bash.exec('yarn config get npmRegistryServer', { type: 'line' });
    // await TestGit();
    // debug('start');
    // const a = await tsImport.load('/Users/Mizi/minglamp/repo/fe/odemo/hulu/config.ts', {
    //     allowConfigurationWithComments: true
    // });
    // console.log(a);
    // await import('/Users/Mizi/minglamp/repo/fe/odemo/hulu/config.js');
    // debug('end');
    // console.log('isFalsy -> [] -> true', isEmpty([]));
    // console.log('isFalsy -> [1] -> false', isEmpty([1]));
    // console.log('isFalsy -> [0] -> false', isFalsy([0]));
    // console.log('isFalsy -> {} -> true', isEmpty({}));
    // console.log('isFalsy -> {a: 1} -> false', isEmpty({ a: 1 }));
    // console.log('isFalsy -> -> true', isEmpty(''));
    // console.log('isFalsy -> 0 -> true', isEmpty(0));
    // console.log('isFalsy -> set -> true', isEmpty(new Set()));
    // console.log('isFalsy -> set 1,2,3 -> false', isEmpty(new Set([1, 2, 3])));
    // console.log('isFalsy -> map -> true', isEmpty(new Set()));
    // console.log('isFalsy -> map 1,2 -> false', isEmpty(new Map([[1, 2]])));
    // console.log('isFalsy -> null -> true', isEmpty(null));
    // console.log('isFalsy -> undefined -> true', isEmpty(void 0));
    // console.log('isFalsy -> 1/0 Infinity -> false', isFalsy(1 / 0), 1 / 0);
    // console.log('isFalsy -> NaN -> true', isFalsy(Infinity / Infinity), Infinity / Infinity);
    // console.log('isFalsy -> false -> true', isEmpty(false));
    // console.log('isFalsy -> true -> false', isFalsy(true));
    // console.log('isFalsy -> 7 -> false', isFalsy(7));
    // console.log('isFalsy -> regex /a.*/ -> false', isFalsy(/a.*/gi));
    // console.log(
    //     'isFalsy -> regex empty -> false',
    //     isFalsy(new RegExp('')),
    //     new RegExp('').toString()
    // );
    // console.log('isFalsy force -> [{}] -> true', isFalsy([{}, null, void 0, '', 0], true));
    // console.log('isFalsy force -> {a: null} -> true', isFalsy({ a: null, b: '', c: void 0 }, true));
    // console.log('isFalsy force ->    -> true', isFalsy('   ', true));
    // console.log(
    //     'run -> [1,2,3]',
    //     run((...args) => args, 1, 2, 3)
    // );
    // console.log(
    //     'run -> 567',
    //     run(() => 567)
    // );
    // console.log(
    //     'run -> 568',
    //     run(
    //         () => 567,
    //         (value) => value + 1
    //     )
    // );
    // console.log(
    //     'run -> 22223',
    //     run(
    //         22222,
    //         (value, ...args) => {
    //             return value + 1;
    //         },
    //         (...args) => {
    //             return 'false ~';
    //         },
    //         1,
    //         2,
    //         3
    //     )
    // );
    // console.log(
    //     'run -> false ~',
    //     run(
    //         0,
    //         (value, ...args) => {
    //             return value + 1;
    //         },
    //         (...args) => {
    //             return 'false ~';
    //         }
    //     )
    // );
    // console.log('iffalsy 0 -> 1', iffalsy(0, 1));
    // console.log('iffalsy null -> 1', iffalsy(0, 1));
    // console.log('iffalsy [] -> 1', iffalsy([], 1));
    // console.log('iffalsy [1,2,3] -> [1,2,3]', iffalsy([1, 2, 3], 1));
    // console.log(
    //     'iffalsy function -> 1',
    //     iffalsy(() => 2, 1)
    // );
    // console.log(
    //     'iffalsy function -> function',
    //     iffalsy({}, () => 333)
    // );
    // console.log('compact array nil', compact([0, 1, 2, null, undefined, ''], 'nil'));
    // console.log('compact array nil a', compact({ a: [0, 1, 2, null, undefined, ''] }, 'nil'));
    // console.log(
    //     'compact nil',
    //     compact(
    //         { a: 1, b: null, c: { d: 0, e: void 0, f: { g: undefined }, h: [1, 2, undefined, 3] } },
    //         'nil'
    //     )
    // );
    // console.log(
    //     'compact undefined',
    //     compact({ a: 1, b: null, c: { d: 0, e: void 0, f: { g: undefined } } }, 'undefined')
    // );
    // console.log(
    //     'compact falsy',
    //     compact({ a: 1, b: null, c: { d: 0, e: void 0, f: { g: undefined } } }, 'falsy')
    // );
    // console.log(
    //     'compact 0',
    //     compact(
    //         { a: 1, b: null, c: { d: 0, e: void 0, f: { g: undefined } } },
    //         (value) => value === 0
    //     )
    // );
    // console.log(tile({ route: [{ a: 1, b: 2 }] }));
};
