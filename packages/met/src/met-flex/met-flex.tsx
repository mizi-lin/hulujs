import { FC } from 'react';
import clx from 'classnames';
import Met, { MetProps } from '../met/met.js';
import { Property } from 'csstype';
import { compact, isFalsy, run } from '@hulu/mu';
import { MetGene } from '../index.js';

export type MetPlacement =
    | 'top'
    | 'left'
    | 'right'
    | 'bottom'
    | 'topLeft'
    | 'topRight'
    | 'bottomLeft'
    | 'bottomRight'
    | 'leftTop'
    | 'leftBottom'
    | 'rightTop'
    | 'rightBottom'
    | 'center'
    | 'betweenTop'
    | 'betweenMiddle'
    | 'betweenBottom';

export interface MetFlexProps extends MetProps {
    // 在绝大部分情况下flex布局应用与固定尺寸
    // 但也在部分模式下，需要跟随父元素的尺寸变化而变化
    inline?: boolean;
    // flex 模式纵向布局
    vertical?: boolean;
    // 是否支持滚动
    // 在flex弹性布局，为百分百布局模式，即子元素宽度的和超过父元素的宽度时
    // 在flex默认模式下，会产生压缩效果，子元素按比例进行压缩宽度
    // 所以期望在flex中需要出现滚动轴，需要将子元素的 flex-shrink 配置为0
    // if scroll === true & inline then -> 'overflowX: auto'
    // if scroll === true & !inline then -> 'overflowY: auto'
    // if scroll === false then -> 'overflow: hidden'
    // if scroll === 'scroll' then -> 'overflow: scroll'
    // @mark scroll 下，flex 配置失效
    scroll?: boolean | 'overflowY' | 'overflowX' | 'overflow' | 'scroll';
    // 位置的快捷配置
    placement?: MetPlacement;
    // 是否换行
    wrap?: Property.FlexWrap;
    // 主轴位置
    justify?: Property.JustifyContent;
    // 交叉轴位置
    align?: Property.AlignItems;
    // 宽高默认100%
    full?: boolean;
}

const placementStyleMap = {
    row: {
        top: { justifyContent: 'center', alignItems: 'flex-start' },
        topLeft: { justifyContent: 'flex-start', alignItems: 'flex-start' },
        topRight: { justifyContent: 'flex-end', alignItems: 'flex-start' },
        left: { justifyContent: 'flex-start', alignItems: 'center' },
        leftTop: { justifyContent: 'flex-start', alignItems: 'flex-start' },
        leftBottom: { justifyContent: 'flex-start', alignItems: 'flex-end' },
        right: { justifyContent: 'flex-end', alignItems: 'center' },
        rightTop: { justifyContent: 'flex-end', alignItems: 'flex-start' },
        rightBottom: { justifyContent: 'flex-end', alignItems: 'flex-end' },
        bottom: { justifyContent: 'center', alignItems: 'flex-end' },
        bottomLeft: { justifyContent: 'flex-start', alignItems: 'flex-end' },
        bottomRight: { justifyContent: 'flex-end', alignItems: 'flex-end' },
        center: { justifyContent: 'center', alignItems: 'center' },
        betweenTop: { justifyContent: 'space-between', alignItems: 'flex-start' },
        betweenMiddle: { justifyContent: 'space-between', alignItems: 'center' },
        betweenBottom: { justifyContent: 'space-between', alignItems: 'flex-end' }
    },

    column: {
        top: { alignItems: 'center', justifyContent: 'flex-start' },
        topLeft: { alignItems: 'flex-start', justifyContent: 'flex-start' },
        topRight: { alignItems: 'flex-end', justifyContent: 'flex-start' },
        left: { alignItems: 'flex-start', justifyContent: 'center' },
        leftTop: { alignItems: 'flex-start', justifyContent: 'flex-start' },
        leftBottom: { alignItems: 'flex-start', justifyContent: 'flex-end' },
        right: { alignItems: 'flex-end', justifyContent: 'center' },
        rightTop: { alignItems: 'flex-end', justifyContent: 'flex-start' },
        rightBottom: { alignItems: 'flex-end', justifyContent: 'flex-end' },
        bottom: { alignItems: 'center', justifyContent: 'flex-end' },
        bottomLeft: { alignItems: 'flex-start', justifyContent: 'flex-end' },
        bottomRight: { alignItems: 'flex-end', justifyContent: 'flex-end' },
        center: { alignItems: 'center', justifyContent: 'center' },
        betweenTop: { alignItems: 'flex-start', justifyContent: 'space-between' },
        betweenMiddle: { alignItems: 'center', justifyContent: 'space-between' },
        betweenBottom: { alignItems: 'flex-end', justifyContent: 'space-between' }
    }
};

const MetFlex: FC<MetFlexProps> = (props) => {
    const {
        children,
        style = {},
        className = '',
        placement = 'left',
        vertical,
        inline,
        scroll,
        full,
        wrap = 'nowrap',
        justify,
        align = placement ? 'stretch' : 'normal',
        flexWrap = wrap,
        flexDirection = vertical ? 'column' : 'row',
        justifyContent = justify,
        alignItems = align,
        ...extra
    } = props;

    const overflow = scroll
        ? typeof scroll === 'string'
            ? scroll === 'scroll'
                ? { overflow: 'scroll' }
                : { [scroll]: 'auto' }
            : { overflow: 'auto' }
        : { overflow: 'hidden' };

    // @mark 需要使用权重最小的属性，若使用权重大的属性，则会覆盖小属性值
    const size = full ? { w: '100%', h: '100%' } : {};

    const extra$: MetProps = {
        display: inline ? 'inline-flex' : 'flex',
        ...overflow,
        ...size,
        ...(placementStyleMap[flexDirection]?.[placement] ?? {}),
        ...compact({ flexDirection, flexWrap, justifyContent, alignItems }),
        ...extra
    };

    return (
        <Met tag={'section'} className={clx('met-flex', className)} {...extra$}>
            <MetGene dominant={scroll ? { flexShrink: 0 } : {}}>{children}</MetGene>
        </Met>
    );
};

export default MetFlex;
