import { getMaterials } from './materials/get-materials.js';

export const materialsApi = (app) => {
    // 获取物料所有信息
    app.get('/montage/v1/content', getMaterials);
};
