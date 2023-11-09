import { AxiosRequestConfig } from 'axios';
export interface RuyiOptions extends AxiosRequestConfig {
    methodCompatible?: Record<'put' | 'patch' | 'down' | 'upload' | 'delete', 'get' | 'post'>;
    responseDataType?: 'normal' | 'simple' | 'all';
    [x: string]: any;
}
export declare enum RuyiMethod {
    'GET' = "get",
    'POST' = "post",
    'PUT' = "put",
    'DELETE' = "delete",
    'PATCH' = "patch",
    'HEAD' = "head",
    'OPTIONS' = "options",
    'DOWN' = "down",
    'UPLOAD' = "upload"
}
/**
 * 客户端连接到Web服务器
 * ->发送Http请求
 * ->服务器接受请求并返回HTTP响应
 * ->释放连接TCP连接
 * ->客户端浏览器解析HTML内容
 */
export declare const Request: (ruyiMethod: RuyiMethod, ruyiUrl: any, search?: Record<string, any>, payload?: Record<string, any>, options?: RuyiOptions) => Promise<any>;
export declare const Ruyi: (url: string, ruyiOptions?: RuyiOptions) => {
    __url: string;
    /**
     * 发送一个请求来获取服务器上某个资源，返回给客户端，包括HTTP头信息和数据
     * GET方法提交数据，可能会带来安全性的问题，数据被浏览器缓存
     * GET请求在浏览器中有长度限制
     */
    get: (search?: Record<string, any>, options?: RuyiOptions) => Promise<any>;
    /**
     * 新建资源
     * 向服务器发送资源，不指定资源的存放位置，存放位置由服务器自己决定
     */
    post: (payload?: Record<string, any>, options?: RuyiOptions) => Promise<any>;
    /**
     * 全量更新资源
     * 向服务器发送资源，并指定资源的存放位置
     */
    put: (payload: Record<string, any>, search: Record<string, any>, options?: RuyiOptions) => Promise<any>;
    /**
     * 对已知资源的局部更新
     */
    patch: (payload: Record<string, any>, search: Record<string, any>, options?: RuyiOptions) => Promise<any>;
    /**
     * 删除资源
     * DELETE请求一般返回3种码
     * 200（OK）—— 删除成功，同时返回已经删除的资源。
     * 202（Accepted）—— 删除请求已经接受，但没有被立即执行（资源也许已经被转移到了待删除区域）。
     * 204（No Content）—— 删除请求已经被执行，但是没有返回资源（也许是请求删除不存在的资源造成的）。
     */
    delete: (search?: Record<string, any>, options?: RuyiOptions) => Promise<any>;
    /**
     * 类似于get请求，只不过返回的响应中没有具体的内容，用于获取报头。
     */
    head: (search?: Record<string, any>, options?: RuyiOptions) => Promise<any>;
    /**
     * 允许客户端查看服务器的性能
     */
    /**
     * 自定义方法区
     */
    /**
     * 传统 form 表单添加
     */
    form: (payload: Record<string, any>, search?: Record<string, any>, options?: RuyiOptions) => Promise<any>;
    /**
     * Hulu 自定义方法，
     * 与后端约定参数，
     * 默认get请求
     * 返回二进制流，下载文件
     * 当 search 中有 downloadName 时，表明是下载请求
     * 当 directDownload 为 true 时，返回二进制流
     * 当 directDownload 为 false 时，返回下载链接
     */
    down: (search: Record<string, any>, options?: RuyiOptions) => Promise<void>;
    /**
     * Hulu 自定义方法，
     * 与后端约定参数，
     * 默认post请求
     * 返回二进制流，下载文件
     * 当 search 中有 downloadName 时，表明是下载请求
     * 当 directDownload 为 true 时，返回二进制流
     * 当 directDownload 为 false 时，返回下载链接
     */
    postdown: (payload: Record<string, any>, search: Record<string, any>, options?: RuyiOptions) => Promise<void>;
    /**
     * Hulu 自定义方法，
     * 与后端约定参数，
     * 默认post请求
     * 返回二进制流，下载文件
     * 当 search 中有 downloadName 时，表明是下载请求
     * 当 directDownload 为 true 时，返回二进制流
     * 当 directDownload 为 false 时，返回下载链接
     */
    patchdown: (payload: Record<string, any>, search: Record<string, any>, options?: RuyiOptions) => Promise<void>;
    /**
     * 上传文件
     */
    upload: (form: any, search?: Record<string, any>, options?: RuyiOptions) => Promise<any>;
};
