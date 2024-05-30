// @todo 使用 URLSearchParam() 替换方法
export function stringify(obj: Record<string, any>) {
    const str: string[] = [];
    for (const p in obj) {
        if (obj.hasOwnProperty(p)) {
            const exp = `${encodeURIComponent(p)}=${encodeURIComponent(obj[p])}`;
            str.push(exp);
        }
    }
    return str.join('&');
}
