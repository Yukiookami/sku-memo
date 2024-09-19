# 自用笔记小软件

## 1. 介绍

这是一个自用的备忘录手机 APP 小软件，主要功能有：

- todoLit
- 日程安排
- 笔记记录

## 技术栈

- Vue3.x
- javascript
- pinia 状态管理
- vue-router 路由管理
- nutui UI 框架 <https://nutui.jd.com/h5/vue/4x/#/zh-CN/component/button>
- axios 网络请求（暂无后台）
- indexDB 本地存储数据库
- cordova 跨平台打包

## 项目启动

```bash
npm install
npm run dev
```

## 项目结构

```shell
SkuMemo
├── dist # 打包后的文件
├── node_modules # 依赖包
├── public # 静态资源（不会被构建工具处理，直接复制到构建目录中）
│   ├── favicon.ico # 网站图标
│   ├── index.html # 入口html文件
│   └── vite.svg # Vite 图标
├── src # 源码
│   ├── assets # 静态资源（会被打包工具处理）
│   │   ├── images # 图片
│   │   ├── styles # 样式
│   │   └── vue.svg # Vue 图标
│   ├── components # 组件
│   │   ├── common # 公共组件
│   │  │  └─ SkuTask # 任务组件
│   │  │     ├─ SkuTaskForm.vue # 任务表单组件
│   │  │     └─ SkuTaskItem.vue # 任务项组件
│   │   ├── layout # 布局组件
│   │   │   ├── mainLayout.vue # 布局组件
│   │   │   ├── SkuFooter.vue # 底部组件
│   │   │   └── SkuHeader.vue # 头部组件
│   │   └── ui # UI组件
│   │       ├── SkuButton.vue # 按钮组件
│   │       ├── SkuCheckBox.vue # 复选框组件
│   │       └── SkuDivider.vue # 分割线组件
│   ├── mockApiForIndexDB # 模拟 API 数据
│   │   ├── task # 任务相关 API
│   │   │   ├── index.js # 任务 API 入口
│   │   │   └── schema.js # 任务 API 模式
│   │   └── test # 测试相关 API
│   │       └── index.js # 测试 API 入口
│   ├── router # 路由
│   │   └── index.js # 路由配置
│   ├── store # 状态管理
│   ├── utils # 工具函数
│   │   └── indexedDB.js # IndexedDB 工具函数
│   ├── views # 视图（页面级组件）
│   │   ├── SkuMemoHome.vue # 首页视图
│   │   └── Test.vue # 测试视图
│   ├── App.vue # 根组件
│   ├── main.js # 入口文件
│   └── style.css # 全局样式
├── index.html # 入口 HTML 文件
├── package-lock.json # 锁定文件
├── package.json # 项目配置文件
├── README.md # 项目说明
├── vite.config.js # Vite 配置文件
├── .env # 环境变量配置
└── .eslintrc.js # ESLint 配置文件
```

### 安装 router

```bash
npm install vue-router@4
```

### 使用 idb 来操作 indexDB

```bash
npm install idb
```

### 安装 scss

```bash
npm install sass
```
