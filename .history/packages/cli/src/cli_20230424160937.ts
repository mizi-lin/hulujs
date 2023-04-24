import yargs from 'yargs';

console.log(import.meta.url);

if (importLocal(import.meta.url)) {
    console.log('Using local version of this package');
} else {
    // Code for both global and local version here…
}

export const aa = () => {
    console.log('oooOOoo ... AAABBBCCCDDDEEEFFF', import.meta.url);
};

export const run = () => {
    ['SIGINT', 'SIGTERM'].forEach((sig) => {
        process.on(sig, function () {
            process.exit(0);
        });
    });

    return yargs
        .commandDir('./commands', {
            // commandDir默认只会加载目录下第一级的文件，不会递归加载, default false
            recurse: false,

            // 开发环境使用 ts，需指定
            extensions: cliRunLocal ? ['ts', 'js'] : ['js']
        })
        .showHelpOnFail(true)
        .demandCommand().argv;
};
