# 自用笔记小软件

## 版本号

v0.5.6 todo - 回收站，回收站真删除

v0.5.5 添加任务组完了，一键删除完了任务

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

- Vue3.x
- javascript
- pinia 状态管理
- vue-router 路由管理
- nutui UI 框架 <https://nutui.jd.com/h5/vue/4x/#/zh-CN/component/button>
- vant UI 框架 <https://vant-ui.github.io/vant/#/zh-CN/quickstart>
- axios 网络请求（暂无后台）
- indexDB 本地存储数据库
- cordova 跨平台打包
- 字体图标转换 <https://icomoon.io/>
- 工具函数库 lodash

## 项目启动

```bash
npm install
npm run dev
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

### cordova 打包手机端

```bash
npm install -g cordova
```

#### cordova 创建项目

```bash
cordova create SkuMemo com.skumemo SkuMemo
```

#### cordova 添加平台

```bash
cordova platform add android
# 或者
cordova platform add ios
```

#### 本体项目打包

```bash
npm run build
```

然后把 dist 包复制到 cordova 的 www 目录下

也可以配置 vite.config.js 的 build.outDir 来指定输出目录

```javascript
export default defineConfig({
  build: {
    outDir: "../cordova/www",
  },
});
```

或者在 packge 配置自动化脚本

```json
{
  "scripts": {
    "build": "vite build",
    "cordova-copy": "cp -r dist/* ../my-cordova-app/www/",
    "cordova-build": "npm run build && npm run cordova-copy"
  }
}
```

#### cordova 打包

```bash
cordova build android
# 或者
cordova build ios
```

#### 配合 altstore 安装到手机

打包完成后，放入 cordova 的 platforms/ios/www 中

打开 xcode，点击 product->archive，然后打包完成后，在弹出的 Archives 中，选择在 finder 中打开，展开包，进入 Products -> Applications，新建 Payload 文件夹，将 app 放入其中，然后压缩，改后缀为.ipa，然后用 altstore 安装到手机
