export const editorApi = (app) => {
    // 获取文件内容
    app.get('/api/content', getContentByFile);
    // 写入文件内容
    app.put('/api/content', saveContentByFile);
};
