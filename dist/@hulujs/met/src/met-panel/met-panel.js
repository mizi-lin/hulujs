import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef } from 'react';
import { Met, MetBox, MetCenter, MetDynamic, MetGene, MetLeft, MetRuyi, isReactElement } from '@hulujs/met';
import { isFalsy, upArray } from '@hulujs/mu';
// import { Tooltip } from 'antd';
import { curry } from 'lodash-es';
import { RecoilRoot, atomFamily, useRecoilBridgeAcrossReactRoots_UNSTABLE, useRecoilCallback, useRecoilState, useSetRecoilState } from 'recoil';
import { getTools, registerTools } from './register-tools.js';
import { RegKey, Regc } from '@hulujs/msc';
const Tooltip = ({ children, title, placement }) => {
    return _jsx(_Fragment, { children: children });
};
const getThemeConfig = (module, latestConfig = {}) => {
    const config = Regc.get(RegKey.THEME_CONFIG);
    return { padding: 8, raduis: 8, borderColor: '#dedede', ...(config ?? {}), ...(config?.[module] ?? {}), ...latestConfig };
};
const MetQuestionIcon = () => {
    return (_jsx(MetCenter, { span: 16, w: 16, h: 16, br: '50%', color: '#666', bd: `2px solid #666`, children: "?" }));
};
registerTools({
    name: 'download',
    component: () => {
        return _jsx(MetQuestionIcon, {});
    }
});
const analysisBorder = (theme, bordered, target) => {
    const bordered$ = typeof bordered === 'string' ? bordered : bordered ? 'all' : 'none';
    const borderColor = theme?.borderColor ?? '#dedede';
    if (bordered$ === 'none')
        return {};
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
const analysisTitle = (anys) => {
    if (typeof anys === 'string' || Array.isArray(anys)) {
        const [title, sub, tip] = typeof anys === 'string' ? anys.split('::') : anys;
        return { title, sub, tip };
    }
    if (isReactElement(anys)) {
        return { title: anys };
    }
    return anys;
};
const MetPanelTitleText = (props) => {
    const { options, type, order = {}, ...extra } = props;
    const theme = getThemeConfig('MetPanel');
    const config = {
        title: { fs: theme.titleFontSize ?? 18, fw: theme.titleFontWeight ?? 500, order: 10 },
        sub: { fs: theme.subFontSize ?? 14, fw: theme.subFontWeight ?? 200, color: theme.subFontColor ?? '#777', order: 20 },
        tip: { order: 30 },
        description: { fs: 14, color: '#555' }
    };
    if (typeof options === 'string') {
        if (type === 'tip') {
            return (_jsx(Tooltip, { title: options, placement: 'right', children: _jsx(Met, { tag: 'span', order: order[type], w: '100%', ...extra, ...config[type], children: _jsx(MetQuestionIcon, {}) }) }));
        }
        return (_jsx(Met, { tag: 'span', order: order[type], w: '100%', ...extra, ...config[type], children: options }));
    }
    if (isReactElement(options)) {
        // @todo 传递样式
        return _jsx(_Fragment, { children: options });
    }
    const { text, ...rest } = options;
    if (type === 'tip') {
        return (_jsx(Tooltip, { title: text, placement: 'right', children: _jsx(Met, { tag: 'span', ...extra, ...config[type], ...rest, children: _jsx(MetQuestionIcon, {}) }) }));
    }
    return (_jsx(Met, { tag: 'span', ...extra, ...config[type], ...rest, children: text }));
};
const MetPanelTitle = (props) => {
    const analysis = analysisTitle(props.title);
    const { title, sub, tip, orders = {}, description } = analysis;
    return (_jsxs(MetBox, { children: [_jsxs(MetLeft, { tag: 'div', children: [!isFalsy(title) && _jsx(MetPanelTitleText, { className: 'met-panel-title', options: title, type: 'title', order: orders }), !isFalsy(sub) && _jsx(MetPanelTitleText, { className: 'met-panel-sub', options: sub, type: 'sub', order: orders }), !isFalsy(tip) && _jsx(MetPanelTitleText, { className: 'met-panel-tip', options: tip, type: 'tip', order: orders })] }), !isFalsy(description) && _jsx(MetPanelTitleText, { className: 'met-panel-description', options: description, type: 'description' })] }));
};
const metToolState = atomFamily({
    key: 'met-panel/tool',
    default: {}
});
const MetBaseTool = (props) => {
    const { icon = {}, tip, name, onClick, ...extra } = props;
    const [toolState, setToolState] = useRecoilState(metToolState(name));
    const [commonState] = useRecoilState(metToolState('MetToolsCommon'));
    const icon$ = upArray(icon)[toolState?.active ? 1 : 0];
    const state = useRecoilCallback(({ snapshot, set }) => async (name) => {
        const get = await snapshot.getPromise(metToolState(name));
        const set$ = curry(set)(metToolState(name));
        return [get, set$];
    });
    const component = (_jsx(MetGene, { dominant: {
            ...extra,
            toolState,
            setToolState,
            state,
            commonState,
            onClick: () => {
                onClick?.({ toolState, setToolState, commonState, state });
            }
        }, children: icon$ }));
    const tip$ = analysisTip(tip);
    return tip$ ? _jsx(Tooltip, { ...tip$, children: component }) : _jsx(_Fragment, { children: component });
};
const analysisToolbar = (toolbar) => {
    const { tools } = toolbar;
    return tools
        .map((tool) => {
        if (typeof tool === 'string') {
            const component = getTools(tool)?.component;
            // @todo 注入的参数
            return _jsx(MetDynamic, { component: component });
        }
        if (isReactElement(tool)) {
            return tool;
        }
        const { icon, name, ...rest } = tool;
        return _jsx(MetBaseTool, { icon: icon, name: name, ...rest }, name);
    })
        .filter(Boolean);
};
const analysisTip = (tip, defauleValue = {}) => {
    if (!tip)
        return false;
    if (typeof tip === 'string') {
        return {
            ...defauleValue,
            title: tip,
            placement: 'left'
        };
    }
    return { ...defauleValue, ...tip };
};
const MetPanelToolbar = (props) => {
    const { toolbar } = props;
    return toolbar ? (_jsxs(MetCenter, { gap: 8, tag: 'div', children: [...analysisToolbar(toolbar)] })) : (_jsx(_Fragment, {}));
};
const MetPanelHeader = (props) => {
    const { title, toolbar, header, ...extra } = props;
    return (_jsxs(MetCenter, { w: '100%', placement: "between", tag: 'header', gap: 16, ...extra, children: [!!title && _jsx(MetPanelTitle, { title: title }), !!toolbar && _jsx(MetPanelToolbar, { flex: 1, toolbar: toolbar })] }));
};
const MetPanelFooter = (props) => {
    const { children, ...extra } = props;
    return children ? (_jsx(Met, { tag: 'footer', ...extra, children: children })) : (_jsx(_Fragment, {}));
};
const MetPanelInner = forwardRef((props, ref) => {
    const { RecoilBridge, children, header = {}, footer, main = {}, title, toolbar, bordered, theme: theme$ = {}, ruyi, ...extra } = props;
    const theme = getThemeConfig('MetPanel', theme$);
    const setCommonState = useSetRecoilState(metToolState('MetToolsCommon'));
    const setBorder = curry(analysisBorder)(theme, bordered);
    const footer$ = isReactElement(footer) ? { children: footer } : footer;
    return (_jsxs(MetBox, { tag: 'article', className: 'met-panel', ref: ref, pl: theme?.padding, pr: theme?.padding, br: theme.raduis, gap: theme?.padding, overflowY: 'none', ...setBorder('wrapper'), ...extra, children: [!!header && (_jsx(MetPanelHeader, { w: '100%', theme: theme, title: title, toolbar: toolbar, p: theme?.padding, ...setBorder('header'), ...header })), !!main && children && (_jsx(Met, { tag: 'main', flex: 1, p: theme?.padding, ...main, children: _jsx(RecoilBridge, { children: isFalsy(ruyi) ? (children) : (_jsx(MetRuyi, { ...ruyi, callback: (data) => {
                            setCommonState({ data });
                        }, children: children })) }) })), !!footer && _jsx(MetPanelFooter, { theme: theme, p: theme?.padding, ...setBorder('footer'), ...footer$ })] }));
});
const MetPanel = forwardRef((props, ref) => {
    const RecoilBridge = useRecoilBridgeAcrossReactRoots_UNSTABLE();
    return (_jsx(RecoilRoot, { children: _jsx(MetPanelInner, { ref: ref, RecoilBridge: RecoilBridge, ...props }) }));
});
export default MetPanel;
