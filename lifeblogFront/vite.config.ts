// Vite中文网：https://vitejs.cn/config/
import { ConfigEnv, loadEnv, UserConfig } from 'vite';
import { resolve } from 'path';
import uni from '@dcloudio/vite-plugin-uni';
import Unocss from 'unocss/vite';

export default ({ mode }: ConfigEnv): UserConfig => {
    const root = process.cwd();
    const env = loadEnv(mode, root);
    return {
        base: './',
        // 设置路径别名
        resolve: {
            alias: {
                '@': resolve('./src'),
            },
            extensions: ['.js', '.json', '.ts', '.vue'], // 使用路径别名时想要省略的后缀名，可以自己 增减
        },
        // 自定义全局变量
        define: {
            'process.env': {},
        },
        // 开发服务器配置
        server: {
            host: true,
            open: true,
            port: env.VITE_PORT as any,
            // proxy: {
            //     [env.VITE_BASE_URL]: {
            //         // target: env.VITE_BASE_URL,
            //         // target: 'https://mock.mengxuegu.com/mock/642f6ad832affa39a121cd95/moocblog',
            //         target: 'http://127.0.0.1:3000/api',
            //         changeOrigin: true,
            //         // rewrite: (path) => path.replace(/^\/api/, ''),
            //         rewrite: (path) => path.replace(new RegExp('^' + env.VITE_BASE_URL), ''),
            //     },
            //     '/upload': {
            //         target: env.VITE_BASE_URL,
            //         changeOrigin: true,
            //         rewrite: (path) => path.replace(/^\/upload/, ''),
            //     },
            // },
        },
        // 构建配置
        build: {
            outDir: 'dist',
            chunkSizeWarningLimit: 1500,
            rollupOptions: {
                output: {
                    entryFileNames: `assets/[name].${new Date().getTime()}.js`,
                    chunkFileNames: `assets/[name].${new Date().getTime()}.js`,
                    assetFileNames: `assets/[name].${new Date().getTime()}.[ext]`,
                    compact: true,
                    // manualChunks: {
                    //     vue: ['vue', 'vue-router', 'vuex'],
                    //     echarts: ['echarts'],
                    // },
                },
            },
        },
        // 插件
        plugins: [uni(), Unocss()],
        transpileDependencies: ['uview-plus'],
    };
};
