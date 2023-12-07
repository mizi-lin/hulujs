import { getContentByFile, getImportsByFile, saveContentByFile } from './editor/content-by-file.js';
export const editorApi = (app) => {
    // 获取文件内容
    app.get('/montage/v1/content', getContentByFile);
    // 写入文件内容
    app.put('/montage/v1/content', saveContentByFile);
    // 获取文件导入的文件信息
    app.get('/montage/v1/imports', getImportsByFile);
};
