import axios from 'axios';
import { RegKey, Regc } from '../index.js';
import { compact, each, format, ifrun, map, run, storage, tile, upArray } from '@hulujs/mu';
import { toFormatMarker } from './uri.js';
import { cloneDeep } from 'lodash-es';
import { stringify } from './utils.js';
export var RuyiMethod;
(function (RuyiMethod) {
    RuyiMethod["GET"] = "get";
    RuyiMethod["POST"] = "post";
    RuyiMethod["PUT"] = "put";
    RuyiMethod["DELETE"] = "delete";
    RuyiMethod["PATCH"] = "patch";
    RuyiMethod["HEAD"] = "head";
    RuyiMethod["OPTIONS"] = "options";
    RuyiMethod["DOWN"] = "down";
    RuyiMethod["UPLOAD"] = "upload";
})(RuyiMethod || (RuyiMethod = {}));
let isRequestInterceptor = false;
let isResponseInterceptor = false;
const responseHandler = function (response, options) {
    const { responseDataType } = options;
    /**
     * 返回值支持精简模式
     */
    const res = responseDataType === 'normal' ? response?.data : responseDataType === 'simple' ? response?.data?.data : response;
    return Promise.resolve(res);
};
/**
 * 处理URL参数与search之间的关系
 * 即：在URL中使用到的参数在search params中不再显示
 */
const transformUrlSearchParams = function (url, search) {
    const uri = toFormatMarker(url);
    const tile$ = tile(search);
    let mapping = uri.match(/{(.+?)}/g) ?? [];
    if (mapping.length) {
        mapping = map(mapping, (part) => {
            const [prefix, content, suffix] = part.replace(/{(.+?)}/, '$1').split(':');
            return suffix ? content : content ? content : prefix;
        });
        each(mapping, (key) => {
            delete tile$[key];
        });
    }
    return {
        url: format(uri, search, ''),
        params: tile$
    };
};
/**
 * 支持 自动嗅探到相同请求,
 * 若前一个请求，未返回数据，则前一个请求退出请求
 */
const cancelStore = {};
const cancelRequestSignal = function (ruyiMethod, ruyiUrl, search = {}, payload = {}) {
    if (!Regc.get(RegKey.RUYI_CANCEL)) {
        return void 0;
    }
    const key = `${ruyiMethod}_${ruyiUrl}_${JSON.stringify(search)}_${JSON.stringify(payload)}`;
    ifrun(cancelStore[key], (controller) => {
        // 若当前请求存在
        controller.abort();
    });
    const controller = new AbortController();
    cancelStore[key] = controller;
    return controller.signal;
};
/**
 * 客户端连接到Web服务器
 * ->发送Http请求
 * ->服务器接受请求并返回HTTP响应
 * ->释放连接TCP连接
 * ->客户端浏览器解析HTML内容
 */
export const Request = function (ruyiMethod, ruyiUrl, search = {}, payload = {}, options = {}) {
    const customRuyiOptions = Regc.get(RegKey.RUYI_OPTIONS) ?? {};
    // 权重高低原则分配
    const method = options.method ?? options?.methodCompatible?.[ruyiMethod] ?? customRuyiOptions?.methodCompatible?.[ruyiMethod] ?? ruyiMethod;
    const { url, params } = transformUrlSearchParams(ruyiUrl, search);
    // console.log('url/params', url, params);
    const config = {
        signal: cancelRequestSignal(ruyiMethod, ruyiUrl, search, payload),
        ...(Regc.get(RegKey.RUYI_OPTIONS) ?? {}),
        ...options,
        url,
        method,
        params,
        data: payload
    };
    /**
     * 配置config headers 支持函数体
     * - 同时修复 header 不识 'Content-Type' 只识别 'content-type' 的问题
     */
    run(() => {
        const contentTypeKey = 'content-type';
        const charset = 'charset=utf-8';
        config.headers ??= {};
        // 配置 accept-language
        // @ts-ignore
        config.headers['Accept-Language'] = () => {
            const language = storage('lang') || 'zh_CN';
            const area = language.split('_').at(0) ?? 'zh';
            const lang = language.replace('_', '-');
            return `${lang}, ${area};q=0.9`;
        };
        // 处理自定义headers的配置
        config.headers = map(config.headers, (item, key) => {
            const val$ = typeof item === 'function' ? item(cloneDeep(config)) : item;
            const key$ = new RegExp(contentTypeKey, 'i').test(key.toString()) ? contentTypeKey : key;
            return { '::key': key$, '::value': val$ };
        });
        // 处理值为undefined的属性
        config.headers = compact(config.headers, 'undefined');
        // 处理contentType
        let contentType = config.headers[contentTypeKey] ?? 'application/json';
        contentType = new RegExp(charset, 'i').test(charset) ? contentType : `${contentType}; ${charset};`;
        contentType = contentType.replace(/;+/gi, ';');
        // 处理表单提交数据转换
        if (contentType.indexOf('application/x-www-form-urlencoded') > -1) {
            if (!(payload instanceof FormData)) {
                config.data = stringify(payload);
            }
        }
        config.headers[contentTypeKey] = contentType;
    });
    /**
     * 配置请求拦截器
     */
    !isRequestInterceptor &&
        ifrun(Regc.get(RegKey.RUYI_REQUEST_INTERCEPTORS), (interceptors) => {
            interceptors = upArray(interceptors);
            axios.interceptors.request.use(...interceptors);
            isRequestInterceptor = true;
        });
    /**
     * 配置返回拦截器
     */
    !isResponseInterceptor &&
        ifrun(Regc.get(RegKey.RUYI_RESPONSE_INTERCEPTORS), (interceptors) => {
            interceptors = upArray(interceptors);
            // 如果配置了ERROR_CATCH, 则权重比较大
            ifrun(Regc.get(RegKey.RUYI_ERROR_CATCH), (errorCatch) => {
                interceptors[1] = errorCatch;
            });
            axios.interceptors.response.use(...interceptors);
            isResponseInterceptor = true;
        }, () => {
            const interceptors = [(res) => res];
            ifrun(Regc.get(RegKey.RUYI_ERROR_CATCH), (errorCatch) => {
                interceptors[1] = errorCatch;
            });
            axios.interceptors.response.use(...interceptors);
            isResponseInterceptor = true;
        });
    return axios(config)
        .then((response) => {
        return responseHandler(response, { responseDataType: 'normal', ...options });
    })
        .catch((error) => {
        const { config = {} } = error;
        const { headers = {} } = config;
        const { Authorization } = headers;
        const storageKey = 'hulu-error-token-stacks';
        let huluErrorTokenStack = storage(storageKey) ?? [];
        Authorization && huluErrorTokenStack.push(Authorization);
        huluErrorTokenStack = huluErrorTokenStack.filter(Boolean);
        const len = huluErrorTokenStack.length;
        if (len > 20) {
            huluErrorTokenStack = huluErrorTokenStack.slice(len - 20, len);
        }
        storage(storageKey, huluErrorTokenStack);
        return Promise.reject(error);
    });
};
export const Ruyi = function (url, ruyiOptions = {}) {
    return {
        __url: url,
        /**
         * 发送一个请求来获取服务器上某个资源，返回给客户端，包括HTTP头信息和数据
         * GET方法提交数据，可能会带来安全性的问题，数据被浏览器缓存
         * GET请求在浏览器中有长度限制
         */
        get: (search, options = {}) => {
            // console.log('get', search);
            return Request(RuyiMethod.GET, url, search, {}, { ...ruyiOptions, ...options });
        },
        /**
         * 新建资源
         * 向服务器发送资源，不指定资源的存放位置，存放位置由服务器自己决定
         */
        post: (payload, options = {}) => {
            return Request(RuyiMethod.POST, url, {}, payload, { ...ruyiOptions, ...options });
        },
        /**
         * 全量更新资源
         * 向服务器发送资源，并指定资源的存放位置
         */
        put: (payload, search, options = {}) => {
            return Request(RuyiMethod.PUT, url, search, payload, { ...ruyiOptions, ...options });
        },
        /**
         * 对已知资源的局部更新
         */
        patch: (payload, search, options = {}) => {
            return Request(RuyiMethod.PATCH, url, search, payload, { ...ruyiOptions, ...options });
        },
        /**
         * 删除资源
         * DELETE请求一般返回3种码
         * 200（OK）—— 删除成功，同时返回已经删除的资源。
         * 202（Accepted）—— 删除请求已经接受，但没有被立即执行（资源也许已经被转移到了待删除区域）。
         * 204（No Content）—— 删除请求已经被执行，但是没有返回资源（也许是请求删除不存在的资源造成的）。
         */
        delete: (search, options = {}) => {
            return Request(RuyiMethod.DELETE, url, search, {}, { ...ruyiOptions, ...options });
        },
        /**
         * 类似于get请求，只不过返回的响应中没有具体的内容，用于获取报头。
         */
        head: (search, options = {}) => {
            return Request(RuyiMethod.HEAD, url, search, {}, { ...ruyiOptions, ...options });
        },
        /**
         * 允许客户端查看服务器的性能
         */
        // options: (payload, search, options) => {},
        /**
         * 自定义方法区
         */
        /**
         * 传统 form 表单添加
         */
        form: (payload, search, options = {}) => {
            options.headers ??= {};
            options.headers['content-type'] = 'application/x-www-form-urlencoded';
            return Request(RuyiMethod.POST, url, search, payload, {
                ...ruyiOptions,
                ...options
            });
        },
        /**
         * Hulu 自定义方法，
         * 与后端约定参数，
         * 默认get请求
         * 返回二进制流，下载文件
         * 当 search 中有 downloadName 时，表明是下载请求
         * 当 directDownload 为 true 时，返回二进制流
         * 当 directDownload 为 false 时，返回下载链接
         */
        down: (search, options = {}) => {
            const { downloadName, directDownload = true } = search;
            if (!downloadName) {
                throw new Error(`下载接口必须提供downloadName`);
            }
            if (!/\..+$/.test(downloadName)) {
                throw new Error(`没有指定downloadName的下载类型`);
            }
            options.responseType = directDownload ? 'blob' : 'json';
            return Request(RuyiMethod.GET, url, search, {}, { ...ruyiOptions, ...options }).then((res) => {
                // @todo use xiaz
                // download(res, search.downloadName);
            });
        },
        /**
         * Hulu 自定义方法，
         * 与后端约定参数，
         * 默认post请求
         * 返回二进制流，下载文件
         * 当 search 中有 downloadName 时，表明是下载请求
         * 当 directDownload 为 true 时，返回二进制流
         * 当 directDownload 为 false 时，返回下载链接
         */
        postdown: (payload, search, options = {}) => {
            const { downloadName, directDownload = true } = search;
            if (!downloadName) {
                throw new Error(`下载接口必须提供downloadName`);
            }
            if (!/\..+$/.test(downloadName)) {
                throw new Error(`没有指定downloadName的下载类型`);
            }
            options.responseType = directDownload ? 'blob' : 'json';
            return Request(RuyiMethod.POST, url, {}, payload, { ...ruyiOptions, ...options }).then((res) => {
                // download(res, search.downloadName);
            });
        },
        /**
         * Hulu 自定义方法，
         * 与后端约定参数，
         * 默认post请求
         * 返回二进制流，下载文件
         * 当 search 中有 downloadName 时，表明是下载请求
         * 当 directDownload 为 true 时，返回二进制流
         * 当 directDownload 为 false 时，返回下载链接
         */
        patchdown: (payload, search, options = {}) => {
            const { downloadName, directDownload = true, ...search$1 } = search;
            if (!downloadName) {
                throw new Error(`下载接口必须提供downloadName`);
            }
            if (!/\..+$/.test(downloadName)) {
                throw new Error(`没有指定downloadName的下载类型`);
            }
            options.responseType = directDownload ? 'blob' : 'json';
            return Request(RuyiMethod.POST, url, search$1, payload, {
                ...ruyiOptions,
                ...options
            }).then((res) => {
                // @todo use xiaz
                // download(res, search.downloadName);
            });
        },
        /**
         * 上传文件
         */
        upload: (form, search, options = {}) => {
            options.headers ??= {};
            options.headers['content-type'] = 'multipart/form-data';
            return Request(RuyiMethod.POST, search, form, { ...ruyiOptions, ...options });
        }
    };
};
