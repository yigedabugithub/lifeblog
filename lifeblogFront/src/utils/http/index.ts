import { createAlova } from 'alova';
import AdapterUniapp from '@alova/adapter-uniapp';
import { getBaseUrl, isUseMock, getMockUrl } from '@/utils/env';
import { assign } from 'lodash-es';
import { useAuthStore } from '@/store/modules/auth';
import { checkStatus } from '@/utils/http/checkStatus';
import { ContentTypeEnum, ResultEnum } from '@/enums/httpEnum';
import { Toast } from '@/utils/uniapi/prompt';
import { API } from '@/api/model/baseModel';

const BASE_URL = getBaseUrl();
const mockUrl = getMockUrl();
const HEADER = {
    'Content-Type': ContentTypeEnum.JSON,
    Accept: 'application/json, text/plain, */*',
};

/**
 * alova 请求实例
 * @link https://github.com/alovajs/alova
 */
const alovaInstance = createAlova({
    baseURL: BASE_URL,
    ...AdapterUniapp({
        mockRequest: isUseMock() ? mockUrl : undefined, //
    }),
    timeout: 5000,

    beforeRequest: (method) => {
        const authStore = useAuthStore();
        method.config.headers = assign(method.config.headers, HEADER, authStore.getAuthorization);
    },
    // 全局的响应拦截器
    responsed: {
        /**
         * 请求成功的拦截器
         * 第二个参数为当前请求的method实例，你可以用它同步请求前后的配置信息
         * @param response
         * @param method
         */
        onSuccess: async (response, method) => {
            const { config } = method;
            const { enableDownload, enableUpload } = config;
            // @ts-ignore
            const { statusCode, data: rawData } = response;

            const { code, msg, data } = rawData as API;
            if (statusCode === 200) {
                if (enableDownload) {
                    // 下载处理
                    return rawData;
                }
                if (enableUpload) {
                    // 上传处理
                    return rawData;
                }
                if (code === ResultEnum.SUCCESS) {
                    return rawData as any;
                }
                msg && Toast(msg);
                return Promise.reject(rawData);
            }
            checkStatus(statusCode, msg || '');
            return Promise.resolve(rawData);
        },

        /**
         * 请求失败的拦截器，请求错误时将会进入该拦截器。
         * 第二个参数为当前请求的method实例，你可以用它同步请求前后的配置信息
         * @param err
         * @param method
         */
        onError: (err, method) => {
            // error('Request Error!');
            return Promise.reject({ err, method });
        },
    },
});

export const request = alovaInstance;
