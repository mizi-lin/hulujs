import { RegKey, Regc } from '@hulujs/msc';
import { upArray } from '@hulujs/mu';
import { isDev } from '../env.js';

/**
 * 注册小工具组件
 */
export const registerTools = (tool) => {
    Regc.register(RegKey.MET_TOOLS, (store) => {
        const store$ = store ?? new Map();
        const tools = upArray(tool);
        tools.forEach((tool) => {
            const { name } = tool;
            if (isDev && store$.has(name)) {
                console.log(`[Regc]: ${name} 已注册，注册中心采用覆盖策略，请确认`);
            }
            store$.set(name, tool);
        });
        return store$;
    });
};

export const getTools = (name) => {
    return Regc.get<Map<string, any>>(RegKey.MET_TOOLS)?.get(name);
};
