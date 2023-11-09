import { run } from '@hulu/mu';
import { $tpl } from '../../tpl.js';
export const getContentByFile = function (req, res) {
    const { filePath, line, col } = req.query;
    const path = decodeURIComponent(filePath);
    const content = $tpl.read(path) ?? '';
    res.send({
        data: {
            line: run(line, (line) => +line),
            col: run(col, (col) => +col),
            path,
            content
        }
    });
};
export const saveContentByFile = async function (req, res) {
    const { filePath } = req.query;
    const path = decodeURIComponent(filePath);
    const { content } = req.body;
    await $tpl.out(content, path);
    res.send({
        data: {
            path
        }
    });
};
