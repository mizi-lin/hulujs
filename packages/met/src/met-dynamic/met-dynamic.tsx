import { ReactNode, FC, createElement, ReactElement } from 'react';
import MetGene from '../met-gene/met-gene.js';
import { isReactElement, type MetProps } from '../index.js';

export type RenderFunction = (...args: any) => ReactNode;
export type MetComponent = FC | ReactNode | RenderFunction;

export interface MetDynamicProps extends MetProps {
    // 需要自动
    component: ReactNode | ReactElement | RenderFunction;
    // 属性覆盖
    propCover?: boolean;
    // 该组件是否工作
    inactvie?: boolean;

    // 支持任意attr props
    [attr: string]: any;
}

const MetDynamic: FC<MetDynamicProps> = (props) => {
    const { component, children, propCover, inactvie, ...extra } = props;

    const children$ =
        typeof children === 'function' ? (children as RenderFunction)(props, children) : children;

    if (inactvie) {
        return <>{children$}</>;
    }

    let component$;

    if (isReactElement(component)) {
        if ((component as ReactElement)?.type) {
            component$ = (
                <MetGene dominant={{ ...extra, children: children$ }} propCover={propCover}>
                    {component}
                </MetGene>
            );
        } else {
            component$ = (component as any)?.render({ ...props, children: children$ });
        }
    } else {
        // 创建组件
        component$ = createElement(component as string, { ...props }, children$);
    }

    return <>{component$}</>;
};

export default MetDynamic;
