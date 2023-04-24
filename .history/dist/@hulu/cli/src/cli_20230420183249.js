// if (importLocal(import.meta.url)) {
//     console.log('Using local version of this package');
// } else {
//     // Code for both global and local version here…
// }

// import { bbb } from '@hulu/core';
// export const aa = () => {
//     console.log(bbb);
// };

import chalk from 'chalk';

export const aa = () => {
    console.log(chalk.green('bbb'));
};
