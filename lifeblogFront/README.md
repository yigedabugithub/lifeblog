# 🌈 uni-app Vue3 Vite4 pinia2 TypeScript 基础框架

<p align="center">
    <a href="https://cn.vuejs.org/" target="_blank">
        <img src="https://img.shields.io/badge/-Vue3.2-34495e?logo=vue.js" />
    </a>
    <a href="https://pinia.vuejs.org/zh/" target="_blank">
        <img src="https://img.shields.io/badge/-Vite4-646cff?logo=vite&logoColor=white" />
    </a>
    <a href="https://www.typescriptlang.org/zh/" target="_blank">
        <img src="https://img.shields.io/badge/-TypeScript5.0-blue?logo=typescript&logoColor=white" />
    </a>
    <a href="https://eslint.org/" target="_blank">
        <img src="https://img.shields.io/badge/-ESLint8-4b32c3?logo=eslint&logoColor=white" />
    </a>
    <a href="https://pnpm.io/" target="_blank">
        <img src="https://img.shields.io/badge/-pnpm8-F69220?logo=pnpm&logoColor=white" />
    </a>
    <a href="https://unocss.dev/" target="_blank">
        <img src="https://img.shields.io/badge/-UnoCss-4d4d4d?logo=unocss" />
    </a>
    <a href="https://iconify.design/" target="_blank">
        <img src="https://img.shields.io/badge/-Iconify-1769aa?logo=Iconify" />
    </a>
    <a href="https://github.com/yigedabugithub/lifeblog" target="_blank">
    	<img src="https://github.com/yigedabugithub/lifeblog"/>
    </a>
</p>

## 简介

-   **uni-app Vue3 Vite4 pinia2 TypeScript 基础框架**
-   cli 创建的 Vue3/Vite4 项目 请直接访问 [项目地址](https://github.com/yigedabugithub/lifeblog)

### 说明

-   框架完全基于 Vue3 SFC `<script setup>` 写法,不支持 Vue2;
-   可用于学习与交流;
-   目前只测试微信小程序其他平台暂未测试,后续会增加;

## 特性

-   **最新技术栈**：使用 Vue3/Vite4/pinia ,TypeScript 等前端前沿技术开发;
-   **[Unocss](https://github.com/unocss/unocss)**: 原子化 CSS, [iconify](https://github.com/iconify/iconify)图标
-   **Eslint/Prettier**: 规范代码格式,统一编码;
-   **路由拦截**: 基于 uni.addInterceptor 进行路由拦截;
-   **请求拦截**: 使用[alova 请求](https://github.com/alovajs/alova),支持请求和响应拦截等;
-   **Mock 数据**: 配合 alova 请求的[@alova/mock](https://github.com/alovajs/mock)，模拟 api 请求(App 不支持);

## 目录结构

```shell
.
├─ src
│   ├─assets # 静态资源目录
│   │
│   ├─components # 组件目录
│   │   ├─ Button
│   │   │    ├─index.vue
│   │   │    └─prpos.ts
│   │   └─...
│   │
│   ├─enums # 枚举/常量
│   │   ├─ cacheEnum.ts
│   │   └─...
│   │
│   ├─pages # 页面
│   │   ├─ index
│   │   │    └─index.vue
│   │   └─...
│   │
│   ├─api # 接口相关
│   │   ├─ auth.ts
│   │   ├─ ...
│   │   │
│   │   └─ model # 数据模型
│   │        ├─authModel.d.ts
│   │        └─...
│   │
│   ├─settings # 设置
│   │   
│   │
│   ├─store # 状态管理模式(pinia)
│   │   ├─ modules # 数据模块
│   │   │    ├─auth.ts
│   │   │    └─...
│   │   │
│   │   └─ index.ts
│   │
│   ├─static # 静态公共文件
│   │   ├─ css # 样式文件
│   │   ├─ images # 图片
│   │   │    ├─avatar.png
│   │   │    └─...
│   │   │
│   │   └─ ...
│   │
│   ├─types # 类型文件
│   │   ├─ http.d.ts
│   │   └─ ...
│   │
│   └─utils # 工具类
│       ├─ cache # 缓存相关目录
│       ├─ http  # request相关目录
│       ├─ interceptors  # 拦截器相关目录
│       └─ ...
│
├─ .env
├─ .env.development
├─ .env.production
├─ .eslintignore
├─ .eslintrc.js
├─ .gitignore
├─ .prettierignore
├─ .prettierrc.js
├─ favicon.ico
├─ index.html
├─ package.json
├─ npm-lock.yaml
├─ README.md
├─ tree.txt
├─ tsconfig.json
└─ vite.config.ts

```

## 安装使用

-   安装依赖

```bash
npm install
```

-   运行

```bash
npm dev:mp-weixin
```

-   打包

```bash
npm build:mp-weixin
```

### 提交类型

| 提交类型   | 标题               | 描述                                                                                  |
| ---------- | ------------------ | ------------------------------------------------------------------------------------- |
| `feat`     | 特征               | 新功能、新特性                                                                        |
| `fix`      | Bug 修复           | bug 修复                                                                              |
| `docs`     | 文档               | 仅文档更改                                                                            |
| `style`    | 风格               | 不影响代码含义的更改（空格、格式、缺少分号等）                                        |
| `refactor` | 代码重构           | 重构，在不影响代码内部行为，功能下的代码修改                                          |
| `perf`     | 性能改进           | 更改代码，以提高性能                                                                  |
| `test`     | 测试               | 添加缺失的测试或纠正现有的测试                                                        |
| `build`    | 构建               | 影响构建系统或外部依赖项的更改（示例范围：gulp、broccoli、npm）                       |
| `ci`       | 持续集成           | 对我们的 CI 配置文件和脚本的更改（示例范围：Travis、Circle、BrowserStack、SauceLabs） |
| `chore`    | 其他文件修改       | 不修改 src 或测试文件的其他更改                                                       |
| `revert`   | 还原               | 恢复之前的提交                                                                        |
| `release`  | 发布新版本         | \-                                                                                    |
| `workflow` | 工作流相关文件修改 | \-                                                                                    |

### 提交别名

| 提交类型           | 映射到  | 标题     | 描述                       |
| ------------------ | ------- | -------- | -------------------------- |
| `initial`          | `feat`  | 最初的   | 初始提交                   |
| `dependencies`     | `fix`   | 依赖项   | 更新依赖项                 |
| `peerDependencies` | `fix`   | 对等依赖 | 更新对等依赖项             |
| `devDependencies`  | `chore` | 开发依赖 | 更新开发依赖               |
| `metadata`         | `fix`   | 元数据   | 更新元数据（package.json） |

### 快捷别名提示

1.  resolve a conflict：解决冲突
2.  merge branch：合并分支
3.  feat: [...] : 添加的新功能说明
4.  fix: [...] : 修复的 bug 说明
5.  initial project：初始化项目
6.  style: [...] : 修改的样式范围
7.  perf：[...] : 优化的范围
8.  release : 发布新版本
9.  docs: 文档修改
10. refactor： 代码重构
11. revert： 还原之前的版本
12. dependencies： 依赖项修改
13. devDependencies： 开发依赖修改
14. review：复习，回顾
15. strengthen: 加强，巩固
