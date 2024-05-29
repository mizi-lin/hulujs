/**
 * 判断一个一个 地址是否为绝对URL
 * @param url - 要测试的 URL。
 * @returns 一个布尔值。
 */
export const isAbsolute = (url) => {
    return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};
/**
 * 如果传递给它的字符串以正斜杠开头，则返回 true
 * @param {string} uri - 要检查的 URI。
 * @returns 一个接受字符串并返回布尔值的函数。
 */
export const isURI = (uri) => {
    return /^\//.test(uri);
};
/**
 * 它接受一个 URI 和一个前缀，并返回一个带有前缀的 URI
 * @param {string} uri - 要格式化的 URI。
 * @param [prefix] - 附加到 URI 的前缀。
 * @param [base=/] - 应用程序的基本路径。
 * @returns 一个接受 uri 并返回字符串的函数。
 */
export const prependPrefixURI = (uri, prefix = '') => {
    if (isAbsolute(uri)) {
        return uri;
    }
    if (/^\^.*/.test(uri)) {
        return uri.replace('^', '');
    }
    const uri$1 = uri.replace(/^\.\//, '');
    if (!prefix) {
        return uri$1;
    }
    const uri$2 = uri$1.replace(/^\//, '');
    const prefix$1 = prefix.replace(/\/$/, '');
    return `${prefix$1}/${uri$2}`;
};
export const toFormatMarker = (uri) => {
    const uri$1 = uri.replace(/^:([^/#?{}:\-_@%]*)/g, '{$1}');
    return uri$1.replace(/\/:([^/#?{}:\-_@%]*)/g, '{/:$1}');
};
