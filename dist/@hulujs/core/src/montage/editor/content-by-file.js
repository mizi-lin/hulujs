import { $tpl } from '../../tpl.js';
import { getImports } from './utils.js';
export const getContentByFile = function (req, res) {
    const { filePath } = req.query;
    const filepath = decodeURIComponent(filePath);
    const content = $tpl.read(filepath) ?? '';
    res.send({
        data: { path: filepath, content }
    });
};
export const getImportsByFile = function (req, res) {
    const { filePath } = req.query;
    const filepath = decodeURIComponent(filePath);
    const content = $tpl.read(filepath) ?? '';
    const imports = getImports(content, filepath);
    res.send({
        data: { path: filepath, content, imports }
    });
};
export const saveContentByFile = async function (req, res) {
    const { filePath } = req.query;
    const path = decodeURIComponent(filePath);
    const { content } = req.body;
    await $tpl.out(content, path);
    res.send({
        data: { path }
    });
};
