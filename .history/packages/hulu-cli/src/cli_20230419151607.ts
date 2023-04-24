import importLocal from 'import-local';
import importLocal from 'import-local';
if (importLocal(import.meta.url)) {
    console.log('Using local version of this package');
} else {
    // Code for both global and local version here…
}
