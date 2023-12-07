import { FC } from 'react';
import { upArray } from '@hulujs/mu';
import { Params } from '@hulujs/types';
import { MetProps } from '../met/met.js';
import MetDynamic, { MetComponent } from '../met-dynamic/index.js';
import MetGene from '../met-gene/met-gene.js';

export interface MetNestProps extends MetProps {
    // 需要嵌套的组件
    // 且该组件需要支持 children 属性
    components: (MetComponent | [MetComponent, Params])[];
    // 属性覆盖
    propCover?: boolean;
    // 支持任意attr props
    [attr: string]: any;
}

/**
 * 嵌套组件
 * - 通常用于组件开发
 * @param props
 * @returns
 */
const MetNest: FC<MetNestProps> = (props) => {
    const { children, style = {}, className = '', components: comp, propCover, ...extra } = props;

    const components = upArray(comp).filter(Boolean);

    const nest = (components) => {
        if (!components?.length) return <>{children}</>;
        const [first, ...others] = components;
        const [component, props] = upArray(first);
        return (
            <MetGene dominant={extra} propCover={propCover}>
                <MetDynamic component={component} {...props} propCover={propCover}>
                    {nest(others)}
                </MetDynamic>
            </MetGene>
        );
    };

    return nest(components);
};

export default MetNest;
