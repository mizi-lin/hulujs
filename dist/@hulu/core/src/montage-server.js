import express from 'express';
import os from 'os';
import { editorApi } from './montage/editor-api.js';
import { materialsApi } from './montage/materials-api.js';
/**
 * 启动 Montage 服务
 */
export const startMontageServer = (argv) => {
    const app = express();
    app.use(express.json());
    app.all('*', function (req, res, next) {
        res.setHeader('Content-Security-Policy', "default-src '*'");
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        res.header('Access-Control-Allow-Methods', '*');
        next();
    });
    editorApi(app);
    materialsApi(app);
    app.get('/', (req, res) => {
        res.send('Hello World ooOoo');
    });
    const host = os.platform() === 'win32' ? '127.0.0.1' : '0.0.0.0';
    app.listen(4555, host);
};
