import importLocal from 'import-local';
import { a } from '@hulu/core';
if (importLocal(import.meta.url)) {
    console.log('Using local version of this package');
}
else {
    // Code for both global and local version here…
}
export const aa = () => {
    console.log(a);
};
