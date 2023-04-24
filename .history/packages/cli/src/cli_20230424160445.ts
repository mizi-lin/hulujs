if (importLocal(import.meta.url)) {
    console.log('Using local version of this package');
} else {
    // Code for both global and local version here…
}

export const aa = () => {
    console.log('oooOOoo ... AAABBBCCCDDDEEEFFF', import.meta.url);
};
