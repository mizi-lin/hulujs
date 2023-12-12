import { parisToEntries } from '@hulujs/mu';
import { getSubtype, isSubType } from './subtype.js';
import { EchartType } from '@hulujs/types';

/**
 * 梳理setting 数据
 */
export const transformSetting = (type: EchartType, setting: Record<string, any>, options: Record<string, any>) => {
    const entires$: any[] = [];
    const baseGetSetting = (setting) => {
        const entires = parisToEntries(setting);
        entires.forEach((item) => {
            const [key, value] = item;
            if (isSubType(key)) {
                const setting = getSubtype(type, key, value as Record<string, any>, options);
                baseGetSetting(setting);
            } else {
                entires$.push(item);
            }
        });
    };
    baseGetSetting(setting);
    return entires$;
};
