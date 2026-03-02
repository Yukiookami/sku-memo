# 自用笔记小软件

## 版本号

v0.6.1 - **Bug 修复**

- 🐛 修复优先级显示数字问题（旧数据 key 类型兼容处理）
- 🐛 修复编辑任务组优先级后子任务消失的问题
- 🐛 修复添加/编辑面板重置后优先级显示 `06` 的问题
- ✨ 添加/编辑弹出框底部增加间距，避免被导航栏遮挡
- 🔒 全局禁用长按复制和文本选择（输入框除外）

v0.6.0 - **重大更新**：从 Cordova 迁移到 Capacitor，技术栈全面升级

- 🚀 集成 Capacitor 8.0 跨平台框架，替代 Cordova
- ⬆️ 升级 Vue 到 3.5.26（最新稳定版）
- ⬆️ 升级 Vite 到 5.4.21
- ⬆️ 升级 Pinia 到 2.3.1
- ⬆️ 升级 Vue Router 到 4.6.4
- ⬆️ 升级所有 UI 框架和开发工具依赖
- 🔧 修复安全漏洞，提升项目安全性

v0.5.7 - 修正单个任务无法修改问题，修改已完成删除为真删除

v0.5.6 一键删除完了任务，修复任务组更新会丢失子任务数据的问题，修复优先级与状态初始值不正确导致初期渲染不正确的问题。修复重置不正确的问题

v0.5.5 添加任务组完了，任务组编辑

v0.5.4 追加排序优先级，任务组同级别内最高，同优先级按照时间排序

v0.5.3 追加子任务的优先级排序, 追加子任务后任务组自动展开

v0.5.2 补全注释，追加每个组件的功能注释，确保单一职责，更新文档目录结构

v0.5.1 任务组功能完成，动画追加完成

V0.5.0 追加任务组功能，引入 UUID 作为子任务的唯一 ID
引入工具函数库 lodash

V0.4.3 追加注释说明,标明影响范围

v0.4.2 追加 SkuCard 组件 转移 SkuTaskItem 组件的阴影样式到 SkuCard 组件

## 介绍

这是一个自用的备忘录手机 APP 小软件，主要功能有：

- todoList

## 技术栈

- Vue 3.5.26 (最新稳定版)
- JavaScript (ES Module)
- Pinia 2.3.1 状态管理
- Vue Router 4.6.4 路由管理
- NutUI 4.3.14 UI 框架 <https://nutui.jd.com/h5/vue/4x/#/zh-CN/component/button>
- Vant 4.9.22 UI 框架 <https://vant-ui.github.io/vant/#/zh-CN/quickstart>
- IndexedDB 本地存储数据库 (使用 idb 8.0.3)
- **Capacitor 8.0** 跨平台打包框架（支持 iOS/Android）
- Vite 5.4.21 构建工具
- 字体图标转换 <https://icomoon.io/>
- 工具函数库 lodash 4.17.21

## 项目启动

> 💡 **Capacitor 详细使用说明**：查看 [CAPACITOR.md](./CAPACITOR.md) 了解所有脚本的详细说明和使用流程

### 开发环境

```bash
npm install
npm run dev
```

### 构建和打包

```bash
# 构建 Web 版本
npm run build

# 同步代码到原生平台（构建 + 同步）
npm run cap:sync

# 在 iOS 模拟器运行
npm run cap:run:ios

# 在 Android 模拟器运行
npm run cap:run:android

# 打开 Xcode（iOS）
npm run cap:open:ios

# 打开 Android Studio
npm run cap:open:android
```

### Capacitor 相关命令

```bash
# 手动同步 Web 代码到原生项目
npx cap sync

# 更新 Capacitor 依赖
npx cap update

# 查看已安装的插件
npx cap ls
```

## 项目结构

```shell
SkuMemo
    ├─ public                             # 公共静态资源
    │    ├─ iosBuildIcon                    # iOS构建图标
    │    │    ├─ ios_icon_1024x1024.png       # iOS 1024x1024 图标
    │    │    ├─ ios_icon_120x120.png         # iOS 120x120 图标
    │    │    ├─ ios_icon_152x152.png         # iOS 152x152 图标
    │    │    ├─ ios_icon_180x180.png         # iOS 180x180 图标
    │    │    ├─ ios_icon_20x20.png           # iOS 20x20 图标
    │    │    ├─ ios_icon_29x29.png           # iOS 29x29 图标
    │    │    ├─ ios_icon_40x40.png           # iOS 40x40 图标
    │    │    ├─ ios_icon_58x58.png           # iOS 58x58 图标
    │    │    ├─ ios_icon_60x60.png           # iOS 60x60 图标
    │    │    ├─ ios_icon_76x76.png           # iOS 76x76 图标
    │    │    ├─ ios_icon_80x80.png           # iOS 80x80 图标
    │    │    └─ ios_icon_87x87.png           # iOS 87x87 图标
    │    └─ vite.svg                        # Vite 图标
    ├─ src                                # 源码
    │    ├─ assets                          # 静态资源（会被打包工具处理）
    │    │    ├─ data                         # 数据文件
    │    │    │    ├─ componentsData.js         # 组件相关数据
    │    │    │    ├─ requiedKeys.js            # 必需的键值
    │    │    │    └─ status.js                 # 状态数据
    │    │    ├─ font                         # 字体文件
    │    │    │    ├─ iconfont                  # 图标字体
    │    │    │    │    ├─ fonts                  # 字体文件夹
    │    │    │    │    │    ├─ icomoon.eot         # IcoMoon字体文件（EOT格式）
    │    │    │    │    │    ├─ icomoon.svg         # IcoMoon字体文件（SVG格式）
    │    │    │    │    │    ├─ icomoon.ttf         # IcoMoon字体文件（TTF格式）
    │    │    │    │    │    └─ icomoon.woff        # IcoMoon字体文件（WOFF格式）
    │    │    │    │    ├─ selection.json         # IcoMoon选择文件
    │    │    │    │    └─ style.css              # IcoMoon样式文件
    │    │    │    ├─ chinese-font-en.ttf       # 英文字体
    │    │    │    ├─ chinese-font.ttf          # 中文字体
    │    │    │    ├─ numberFont.ttf            # 数字字体
    │    │    │    └─ PermanentMarker-Regular.ttf  # PermanentMarker字体
    │    │    ├─ images                       # 图片
    │    │    │    ├─ checkList                 # 选择列表相关图片
    │    │    │    │    ├─ 未选中.svg               # 未选中图标
    │    │    │    │    └─ 选中.svg                 # 选中图标
    │    │    │    ├─ sideBar                   # 侧边栏相关图片
    │    │    │    │    ├─ 工作-选中.svg             # 选中的工作图标
    │    │    │    │    ├─ 工作.svg                 # 工作图标
    │    │    │    │    ├─ 生活-选中.svg             # 选中的生活图标
    │    │    │    │    └─ 生活.svg                 # 生活图标
    │    │    │    └─ skuAddTask                # 添加任务相关图片
    │    │    │         └─ 添加.svg                 # 添加图标
    │    │    ├─ styles                       # 样式文件
    │    │    │    ├─ cssrest.scss              # CSS重置样式
    │    │    │    ├─ font.scss                 # 字体样式
    │    │    │    ├─ global.scss               # 全局样式
    │    │    │    └─ variable.scss             # 变量样式
    │    │    └─ vue.svg                      # Vue 图标
    │    ├─ components                      # 组件
    │    │    ├─ common
    │    │    │    ├─ SkuAddTask
    │    │    │    │    ├─ SkuAddSubTask.vue      # 添加子任务组件
    │    │    │    │    └─ SkuAddTask.vue         # 添加任务组件
    │    │    │    ├─ SkuSideBar
    │    │    │    │    ├─ SkuSideBar.vue         # 侧边栏组件
    │    │    │    │    └─ SkuSideItem.vue        # 侧边栏项组件
    │    │    │    └─ SkuTask
    │    │    │         ├─ SkuTask.vue            # 任务组件
    │    │    │         ├─ SkuTaskGruop.vue       # 任务组组件
    │    │    │         └─ SkuTaskItem.vue        # 任务项组件
    │    │    ├─ layout
    │    │    │    ├─ SkuContextSwipe.vue       # 上下文滑动组件
    │    │    │    ├─ SkuFooter.vue             # 底部组件
    │    │    │    ├─ SkuHeader.vue             # 头部组件
    │    │    │    └─ SkuMainlayout.vue         # 主布局组件
    │    │    └─ ui
    │    │         ├─ SkuCard.vue               # 卡片组件
    │    │         ├─ SkuCollapse.vue           # 折叠组件
    │    │         ├─ SkuIcon.vue               # 图标组件
    │    │         ├─ SkuPriorityText.vue       # 优先级文本组件
    │    │         ├─ SkuSwipe.vue              # 滑动组件
    │    │         └─ SkuText.vue               # 文本组件
    │    ├─ directives                      # 自定义指令
    │    │    └─ longPress.js                 # 长按指令
    │    ├─ mockApiForIndexDB               # 模拟 API 数据（基于IndexDB）
    │    │    └─ task                         # 任务相关 API
    │    │         ├─ index.js                  # 任务 API 入口
    │    │         └─ schema.js                 # 任务 API 模式
    │    ├─ router                          # 路由
    │    │    └─ index.js                     # 路由配置
    │    ├─ stores                          # 状态管理
    │    │    └─ index.js                     # 状态管理入口文件
    │    ├─ utils                           # 工具函数
    │    │    ├─ index.js                     # 工具函数入口
    │    │    ├─ indexedDB.js                 # IndexedDB 工具函数
    │    │    └─ viewport.js                  # 视口工具函数
    │    ├─ views                           # 视图（页面级组件）
    │    │    └─ SkuMemoHome.vue              # 首页视图
    │    ├─ App.vue                         # 根组件
    │    └─ main.js                         # 入口文件
    ├─ eslint.config.js                   # ESLint 配置文件
    ├─ index.html                         # 入口 HTML 文件
    ├─ package-lock.json                  # 锁定依赖包的版本
    ├─ package.json                       # 项目配置文件
    ├─ README.md                          # 项目说明文档
    └─ vite.config.js                     # Vite 配置文件
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

### 安装 pinia

```bash
npm install pinia
```

## 📱 Capacitor 打包部署

> 项目已从 Cordova 迁移到 Capacitor 8.0，更多详细说明请查看 [CAPACITOR.md](./CAPACITOR.md)

### 快速开始

```bash
# 1. 构建并同步到原生项目
npm run cap:sync

# 2. 在模拟器/真机运行
npm run cap:run:ios        # iOS
npm run cap:run:android    # Android
```

### 打包发布

#### iOS 打包（macOS）

```bash
# 1. 同步最新代码
npm run cap:sync

# 2. 打开 Xcode
npm run cap:open:ios

# 3. 在 Xcode 中操作：
# - Product → Archive
# - 前往~/Library/Developer/Xcode/Archives/
# - 选择最新的 Archive 右键点击它 → 显示包内容
# 依次打开Products → Applications
# 选择 .app 文件右键点击 → 显示包内容
# 创建 Payload 文件夹
# 将 .app 文件拖入 Payload 文件夹
# 压缩 Payload 文件夹为 Payload.zip
# 将 Payload.zip 后缀改为 .ipa
# 发送至手机使用altstore安装
```

#### Android 打包

```bash
# 1. 同步最新代码
npm run cap:sync

# 2. 打开 Android Studio
npm run cap:open:android

# 3. 在 Android Studio 中操作：
# - Build → Generate Signed Bundle / APK
# - 选择 APK 或 AAB
# - 配置签名信息
# - 生成发布包
```

### 配合 AltStore 安装到 iPhone

```bash
# 1. 在 Xcode 中导出 .ipa 文件（选择 Development 方式）
# 2. 使用 AltStore 安装 .ipa 到手机
```
