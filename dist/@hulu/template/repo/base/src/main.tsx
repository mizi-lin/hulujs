/**
 * 入口文件，超控体系的文件
 * - 若不想使用超控体系的文件，则直接修改import导入地址
 * - 在Promise.all下，如果开启http/2, 可以获得最佳体验
 * - 使用TopLevel Await
 */
 
const [{ render }, { App }] = await Promise.all([import('~ck/root'), import('~ck/app')]);
export default render(App);
