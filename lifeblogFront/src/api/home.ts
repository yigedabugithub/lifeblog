// import { request } from '@/utils/http';
import { request } from '@/utils/http/index';

// home
export function homeApi(params: any) {
    return request.Get('/life/home', { params });
}
// 文章列表
export function articlesApi(params: any) {
    return request.Get(`/life/articles`, { params });
}
