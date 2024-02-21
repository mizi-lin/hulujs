import { FC, ReactNode, forwardRef, useEffect } from 'react';
import {
    Met,
    MetBox,
    MetCenter,
    MetDynamic,
    MetFlex,
    MetGene,
    MetLeft,
    MetProps,
    MetRuyi,
    MetRuyiProps,
    isReactElement
} from '@hulujs/met';
import { isFalsy, upArray } from '@hulujs/mu';
import { Tooltip } from 'antd';
import { curry } from 'lodash-es';
import {
    RecoilRoot,
    atom,
    atomFamily,
    useRecoilBridgeAcrossReactRoots_UNSTABLE,
    useRecoilCallback,
    useRecoilState,
    useSetRecoilState
} from 'recoil';
import { getTools, registerTools } from './register-tools.js';

export interface MetPanelTitleTextProps extends MetProps {
    text: ReactNode;
}

export interface MetPanelTitleProps extends MetProps {
    title: ReactNode | MetPanelTitleTextProps;
    sub: ReactNode | MetPanelTitleTextProps;
    description: ReactNode | MetPanelTitleTextProps;
    tip: ReactNode | (MetPanelTitleTextProps & { icon: ReactNode; position?: 'left' | 'right' });
    orders: { title: number; sub: number; tip: number };
}

export interface MetBaseToolEventParams {
    toolState: Record<string, any>;
    setToolState: (state: Record<string, any>) => void;
    state: Promise<(name: string) => [Record<string, any>, (state: Record<string, any>) => void]>;
    commonState: Record<string, any>;
}

export interface MetPanelTool extends Omit<MetProps, 'onClick'> {
    icon: ReactNode;
    tip?: string;
    title: string;
    show: 'onlyIcon' | 'onlyTitle' | 'all';
    // 分组模式下自动分组依据
    group?: string;
    onClick?: (params: MetBaseToolEventParams) => void;
    active?: MetProps;
}

export interface MetPanelToolbarGroup extends MetProps {
    icon: ReactNode;
    title: string;
    tip?: string;
    show: 'onlyIcon' | 'onlyTitle' | 'all';
    trigger?: 'click' | 'hover';
    tools: string[];
}

export interface MetPanelToolbar extends MetProps {
    tools: string[] | MetPanelTool[];
    // 是否使用默认的tool
    useDefault?: boolean;
    // 分组信息
    group: MetPanelToolbarGroup[];
    // tool的个数超过count限制，进入到分组模式，
    // 即 count = 0 的时候，直接进入分组模式
    count?: number;
}

export interface MetPanelProps extends MetProps {
    header: false | MetProps;
    main: false | MetProps;
    footer: false | MetProps;
    title: false | ReactNode | MetPanelTitleProps;
    toolbar: false | ReactNode | MetPanelToolbar;
    ruyi?: MetRuyiProps;
    // 边框配置
    bordered?: boolean | 'all' | 'wrapper' | 'inner' | 'none';
    // 主体
    theme?: {
        borderColor: '#dedede';
        padding: 8;
        raduis: 8;
    };
}

export const themeConfigAtom = atom<Record<string, any>>({
    key: 'themeConfigAtom',
    default: {}
});

export const useThemeConfig = (config?: Record<string, any>) => {
    const [themeConfig, setThemeConfig] = useRecoilState(themeConfigAtom);
    useEffect(() => {
        if (config) {
            setThemeConfig(config);
        }
    }, []);
    return themeConfig;
};

const MetQuestionIcon = () => {
    const theme = useThemeConfig();
    return (
        <MetCenter span={16} w={16} h={16} br={'50%'} color={'#666'} bd={`2px solid #666`}>
            ?
        </MetCenter>
    );
};

registerTools({
    name: 'download',
    component: () => {
        return <MetQuestionIcon />;
    }
});

const analysisBorder = (theme, bordered, target) => {
    const bordered$ = typeof bordered === 'string' ? bordered : bordered ? 'all' : 'none';
    const borderColor = theme?.borderColor ?? '#dedede';

    if (bordered$ === 'none') return {};

    if (target === 'wrapper' && ['all', 'wrapper'].includes(bordered$)) {
        return { border: `1px solid ${borderColor}` };
    }

    if (target === 'header' && ['all', 'inner'].includes(bordered$)) {
        return { borderBottom: `1px solid ${borderColor}` };
    }

    if (target === 'footer' && ['all', 'inner'].includes(bordered$)) {
        return { borderTop: `1px solid ${borderColor}` };
    }
};

/**
 * 解构title
 * @param anys
 * @returns
 */
const analysisTitle = (anys: ReactNode | MetPanelTitleProps) => {
    if (typeof anys === 'string' || Array.isArray(anys)) {
        const [title, sub, tip] = typeof anys === 'string' ? anys.split('::') : anys;
        return { title, sub, tip } as MetPanelTitleProps;
    }

    if (isReactElement(anys)) {
        return { title: anys } as MetPanelTitleProps;
    }

    return anys as MetPanelTitleProps;
};

const MetPanelTitleText = (props) => {
    const { theme, options, type, order = {}, ...extra } = props;

    const config = {
        title: { fs: 18, fw: 400, order: 10 },
        sub: { fs: 14, fw: 200, color: '#777', order: 20 },
        tip: { order: 30 },
        description: { fs: 14, color: '#555' }
    };

    if (typeof options === 'string') {
        if (type === 'tip') {
            return (
                <Tooltip title={options} placement={'right'}>
                    <Met tag={'span'} order={order[type]} {...config[type]}>
                        <MetQuestionIcon />
                    </Met>
                </Tooltip>
            );
        }

        return (
            <Met tag={'span'} order={order[type]} {...config[type]}>
                {options}
            </Met>
        );
    }

    if (isReactElement(options)) {
        // @todo 传递样式
        return <>{options}</>;
    }

    const { text, ...rest } = options;

    if (type === 'tip') {
        return (
            <Tooltip title={text} placement={'right'}>
                <Met tag={'span'} {...extra} {...config[type]} {...rest}>
                    <MetQuestionIcon />
                </Met>
            </Tooltip>
        );
    }

    return (
        <Met tag={'span'} {...extra} {...config[type]} {...rest}>
            {text}
        </Met>
    );
};

const MetPanelTitle: FC<{ title: ReactNode | MetPanelTitleProps }> = (props) => {
    const analysis = analysisTitle(props.title);
    const { title, sub, tip, orders = {}, description } = analysis;
    return (
        <MetBox>
            <MetLeft tag={'div'}>
                {!isFalsy(title) && <MetPanelTitleText options={title} type={'title'} order={orders} />}
                {!isFalsy(sub) && <MetPanelTitleText options={sub} type={'sub'} order={orders} />}
                {!isFalsy(tip) && <MetPanelTitleText options={tip} type={'tip'} order={orders} />}
            </MetLeft>
            {!isFalsy(description) && <MetPanelTitleText options={description} type={'description'} />}
        </MetBox>
    );
};

const metToolState = atomFamily({
    key: 'met-panel/tool',
    default: {}
});

const MetBaseTool = (props) => {
    const { icon = {}, tip, name, onClick, ...extra } = props;
    const [toolState, setToolState] = useRecoilState<Record<string, any>>(metToolState(name));
    const [commonState] = useRecoilState<Record<string, any>>(metToolState('MetToolsCommon'));
    const icon$ = upArray(icon)[toolState?.active ? 1 : 0];
    const state = useRecoilCallback(({ snapshot, set }) => async (name: string) => {
        const get = await snapshot.getPromise(metToolState(name));
        const set$ = curry(set)(metToolState(name));
        return [get, set$];
    });
    const component = (
        <MetGene
            dominant={{
                ...extra,
                toolState,
                setToolState,
                state,
                commonState,
                onClick: () => {
                    onClick?.({ toolState, setToolState, commonState, state });
                }
            }}
        >
            {icon$}
        </MetGene>
    );
    const tip$ = analysisTip(tip);
    return tip$ ? <Tooltip {...tip$}>{component}</Tooltip> : <>{component}</>;
};

const analysisToolbar = (toolbar) => {
    const { tools } = toolbar;
    return tools
        .map((tool) => {
            if (typeof tool === 'string') {
                const component = getTools(tool)?.component;
                // @todo 注入的参数
                return <MetDynamic component={component} />;
            }

            if (isReactElement(tool)) {
                return tool;
            }

            const { icon, name, ...rest } = tool;
            return <MetBaseTool key={name} icon={icon} name={name} {...rest} />;
        })
        .filter(Boolean);
};

const analysisTip = (tip, defauleValue = {}) => {
    if (!tip) return false;

    if (typeof tip === 'string') {
        return {
            ...defauleValue,
            title: tip,
            placement: 'left'
        };
    }

    return { ...defauleValue, ...tip };
};

const MetPanelToolbar: FC<MetProps> = (props) => {
    const { toolbar } = props;
    return toolbar ? (
        <MetCenter gap={8} tag={'div'}>
            {...analysisToolbar(toolbar)}
        </MetCenter>
    ) : (
        <></>
    );
};

const MetPanelHeader: FC<MetProps> = (props) => {
    const { title, toolbar, header, ...extra } = props;
    return (
        <MetCenter placement="between" tag={'header'} gap={16} {...extra}>
            {!!title && <MetPanelTitle title={title} />}
            {!!toolbar && <MetPanelToolbar flex={1} toolbar={toolbar} />}
        </MetCenter>
    );
};

const MetPanelFooter: FC<MetProps> = (props) => {
    const { children, ...extra } = props;
    return children ? (
        <Met tag={'footer'} {...extra}>
            {children}
        </Met>
    ) : (
        <></>
    );
};

const MetPanelInner = forwardRef<HTMLElement, MetPanelProps>((props, ref) => {
    const { RecoilBridge, children, header = {}, footer, main = {}, title, toolbar, bordered, theme: theme$ = {}, ruyi, ...extra } = props;
    const theme = useThemeConfig({ padding: 8, raduis: 8, borderColor: '#dedede', ...theme$ });
    const setCommonState = useSetRecoilState(metToolState('MetToolsCommon'));
    const setBorder = curry(analysisBorder)(theme, bordered);
    const footer$ = isReactElement(footer) ? { children: footer } : footer;

    return (
        <MetBox
            tag={'article'}
            className={'met-panel'}
            ref={ref}
            pl={theme?.padding}
            pr={theme?.padding}
            br={theme.raduis}
            gap={theme?.padding}
            overflowY={'none'}
            {...setBorder('wrapper')}
            {...extra}
        >
            {!!header && (
                <MetPanelHeader theme={theme} title={title} toolbar={toolbar} p={theme?.padding} {...setBorder('header')} {...header} />
            )}
            {!!main && children && (
                <Met tag={'main'} flex={1} p={theme?.padding} {...main}>
                    <RecoilBridge>
                        {isFalsy(ruyi) ? (
                            children
                        ) : (
                            <MetRuyi
                                {...ruyi}
                                callback={(data) => {
                                    setCommonState({ data });
                                }}
                            >
                                {children}
                            </MetRuyi>
                        )}
                    </RecoilBridge>
                </Met>
            )}
            {!!footer && <MetPanelFooter theme={theme} p={theme?.padding} {...setBorder('footer')} {...footer$} />}
        </MetBox>
    );
});

const MetPanel = forwardRef<HTMLElement, MetPanelProps>((props, ref) => {
    const RecoilBridge = useRecoilBridgeAcrossReactRoots_UNSTABLE();
    return (
        <RecoilRoot>
            <MetPanelInner ref={ref} RecoilBridge={RecoilBridge} {...props} />
        </RecoilRoot>
    );
});

export default MetPanel;
