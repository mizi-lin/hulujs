import {
    useNavigate as useNavi,
    NavigateOptions,
    useLocation,
    generatePath,
    useParams
} from 'react-router-dom';
import type { Location } from 'history';
import { each, format, isNil, map, run } from '@hulu/mu';
import { useRoute } from '~ck';

type HuluNavigateOptions = NavigateOptions & {
    query?: Record<string, string | number | undefined>;
    params?: Record<string, string | number | undefined>;
};

/**
 * 当前URL替换符,
 * 使用该替换符，即从URL中获取路由等信息
 */
const CURRENT_URL_SIGN = '-';

/**
 * current route
 */
const CURRENT_ROUTE_SIGNS = ['.', './'];

/**
 * 弹出窗判断符
 */
const MODAL_REGEX = /~[^/]/g;

/**
 * 根据用户需求，获得实际的toURL
 * @param to
 * @param location
 * @param isModal
 */
const getToURL = (to: string, location: Location, isModal = false) => {
    const { pathname, search } = location;
    if (CURRENT_URL_SIGN === to) {
        return `${pathname}${search}`;
    }

    if (isModal) {
        return `${to}${search}`;
    }

    return to;
};

/**
 * 获得 navigate 配置参数
 */
export const getNavigate = (to, options, { srcParams, location, route }) => {
    const { params = {}, query = {}, ...navigateOptions } = options;
    const isModal = MODAL_REGEX.test(to);

    if ('string' !== typeof to) {
        return { lastTo: to, navigateOptions: options };
    }

    let [pathname, search] = getToURL(to, location, isModal).split(/[?#]/);
    const usp = new URLSearchParams(search);

    // 匹配 query
    each(query, (value, name: string) => {
        usp.set(name, value);
    });

    // 如果用户有传入params
    // 我们姑且认为当前route为动态路由
    // 参数覆盖现有参数
    run(params, () => {
        const dynamicRoutePath = [CURRENT_URL_SIGN, ...CURRENT_ROUTE_SIGNS].includes(to)
            ? route.path
            : pathname;
        const generateParams = map({ ...(srcParams ?? {}), ...params }, (value) => {
            return isNil(value) ? '::break' : value.toString();
        });
        pathname = generatePath(dynamicRoutePath, generateParams);
    });

    // 最终的search
    const lastSearch = usp.toString();

    // 弹出窗需要
    if (isModal) {
        // modal 需要记录 query 信息
        navigateOptions.state = { ...(navigateOptions?.state ?? {}), modalBgLocation: location };
    }

    // 最终的URL
    const lastTo = format(`{pathname}{?:lastSearch}`, { pathname, lastSearch }, '');

    return { lastTo, navigateOptions };
};

/**
 * 强化 navigate
 */
const useNavigate = (globalOptions: HuluNavigateOptions = {}) => {
    const navigate = useNavi();
    const location = useLocation();
    const srcParams = useParams();
    const { route } = useRoute();
    return (to: string | number, options: HuluNavigateOptions = {}) => {
        const { lastTo, navigateOptions } = getNavigate(
            to,
            { ...options, ...globalOptions },
            { srcParams, location, route }
        );
        navigate(lastTo, navigateOptions);
    };
};

export { useNavigate };
