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
├── dist # 打包后的文件
├── node_modules # 依赖包
├── public # 静态资源（不会被构建工具处理，直接复制到构建目录中）
│   ├── favicon.ico # 网站图标
│   ├── index.html # 入口html文件
├── src # 源码
│   ├── assets # 静态资源（会被打包工具处理）
│   │   ├── images # 图片
│   │   ├── styles # 样式
│   ├── components # 组件
│   │   ├── HelloWorld.vue # 示例组件
│   ├── views # 视图（页面级组件）
│   │   ├── Home.vue # 首页视图
│   │   ├── About.vue # 关于页视图
│   ├── router # 路由
│   │   ├── index.js # 路由配置
│   ├── store # 状态管理
│   │   ├── index.js # 状态管理配置
│   ├── App.vue # 根组件
│   ├── main.js # 入口文件
├── .gitignore # git忽略文件
├── package.json # 项目配置文件
├── README.md # 项目说明
├── yarn.lock # yarn锁定文件/也有可能是package-lock.json
├── vite.config.js # Vite配置文件
├── .env # 环境变量配置
├── .eslintrc.js # ESLint配置文件
```

### 安装 router

```bash
npm install vue-router@4
```
