import { ReactNode, FC, createElement } from 'react';
import MetGene from '../met-gene/met-gene.js';
import { MetProps } from 'src/met/met.js';

export type RenderFunction = (...args: any) => ReactNode;
export type MetComponent = FC | ReactNode | RenderFunction;

export interface MetDynamicProps extends MetProps {
    // 需要自动
    component: ReactNode | RenderFunction;
    // 属性覆盖
    propCover?: boolean;
    // 支持任意attr props
    [attr: string]: any;
}

const MetDynamic: FC<MetDynamicProps> = (props) => {
    const { component, children, style = {}, className = '', propCover, ...extra } = props;

    const children$ = typeof children === 'function' ? children(props, children) : children;

    let component$;

    if (typeof component === 'object' && !component?.type) {
        // 自定义组件
        props.children = children$;
        component$ = component?.render(props);
    } else if (typeof component === 'object') {
        // 通过基因组件透传props
        component$ = (
            <MetGene dominant={{ ...props, children: children$ }} propCover={propCover}>
                {component}
            </MetGene>
        );
    } else {
        // 创建组件
        component$ = createElement(component as any, { ...props }, children$);
    }

    return <>{component$}</>;
};

export default MetDynamic;
