const isLikePovitiveInt = (value) => {
    if (!['string', 'number'].includes(typeof value)) {
        return false;
    }
    const regexp = /^(0|([1-9]\d*))$/;
    return regexp.test(value?.toString().trim());
};
export default isLikePovitiveInt;
