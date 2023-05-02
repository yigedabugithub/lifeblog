import { assign } from 'lodash-es';
import pagesJson from '@/pages.json';
import { Route } from '@/types/router/route';

const { pages, tabBar } = pagesJson;

// 将pages.json转换成Map对象,path为key
const pagesMap = new Map<string, Route>();

pages.forEach((page) => {
    pagesMap.set(page.path, page as Route);
});

if (tabBar) {
    const tabBarList = tabBar.list;
    if (Array.isArray(tabBarList)) {
        tabBarList.forEach((el) => {
            if (pagesMap.has(el.pagePath)) {
                const page = pagesMap.get(el.pagePath);
                const meta = page?.meta || {};
                // @ts-ignore
                meta.tabBar = true;
                // @ts-ignore
                page.meta = assign({}, meta);
                pagesMap.set(el.pagePath, page as Route);
            }
        });
    }
}

export { pagesMap };
