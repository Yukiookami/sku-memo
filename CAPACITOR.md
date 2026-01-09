# Capacitor 脚本说明文档

## 📝 NPM Scripts 详解

### 开发相关脚本

#### `npm run dev`

- **作用**：启动 Vite 开发服务器，用于浏览器端开发调试
- **使用场景**：日常开发 Web 版本时使用
- **端口**：默认 http://localhost:5173

#### `npm run build`

- **作用**：构建生产版本，将 Vue 项目打包到 `dist/` 目录
- **使用场景**：
  - 准备部署 Web 版本
  - 打包原生 App 前必须先构建（生成 dist 目录）
- **输出**：`dist/` 目录（包含优化后的 HTML、CSS、JS）

#### `npm run preview`

- **作用**：本地预览构建后的生产版本
- **使用场景**：在本地测试生产构建是否正常

---

## 📱 Capacitor 跨平台脚本

### `npm run cap:sync`

**完整命令**：`npm run build && npx cap sync`

**作用**：

1. 先执行 `npm run build` 构建 Web 项目
2. 将构建产物同步到 iOS 和 Android 原生项目
3. 自动复制 `dist/` 目录内容到：
   - iOS: `ios/App/App/public/`
   - Android: `android/app/src/main/assets/public/`
4. 更新原生项目的 Capacitor 插件依赖

**使用场景**：

- 每次修改代码后，需要在原生设备上测试时
- 添加或更新 Capacitor 插件后
- 修改 `capacitor.config.json` 配置后

**注意事项**：

- 首次使用 Capacitor 前必须运行此命令
- 每次代码修改后都需要重新同步才能在原生 App 中看到变化

---

### `npm run cap:open:ios`

**完整命令**：`npx cap open ios`

**作用**：

- 在 Xcode 中打开 iOS 原生项目（`ios/App/App.xcworkspace`）

**使用场景**：

- 需要在 Xcode 中进行 iOS 原生开发或调试
- 配置 iOS 证书、签名、权限等
- 打包发布到 App Store
- 在 iOS 模拟器或真机上运行测试

**前置要求**：

- macOS 系统
- 已安装 Xcode
- 已运行过 `npm run cap:sync`

**操作流程**：

1. 运行此命令打开 Xcode
2. 在 Xcode 中选择目标设备（模拟器或真机）
3. 点击运行按钮（▶️）启动应用

---

### `npm run cap:open:android`

**完整命令**：`npx cap open android`

**作用**：

- 在 Android Studio 中打开 Android 原生项目（`android/` 目录）

**使用场景**：

- 需要在 Android Studio 中进行原生开发或调试
- 配置 Android 签名、权限、gradle 等
- 打包发布到 Google Play
- 在 Android 模拟器或真机上运行测试

**前置要求**：

- 已安装 Android Studio
- 已配置 Android SDK
- 已运行过 `npm run cap:sync`

**操作流程**：

1. 运行此命令打开 Android Studio
2. 等待 Gradle 同步完成
3. 选择目标设备（模拟器或真机）
4. 点击运行按钮启动应用

---

### `npm run cap:run:ios`

**完整命令**：`npm run cap:sync && npx cap run ios`

**作用**：

1. 自动执行 `cap:sync`（构建 + 同步）
2. 在 iOS 模拟器上启动应用（不打开 Xcode）

**使用场景**：

- 快速在 iOS 模拟器上测试最新代码
- 不需要打开 Xcode 的快速测试流程

**前置要求**：

- macOS 系统
- 已安装 Xcode 和 iOS 模拟器
- 已配置好开发证书

**可选参数**：

```bash
# 指定模拟器设备
npx cap run ios --target="iPhone 15 Pro"

# 在真机上运行
npx cap run ios --target="设备名称"
```

---

### `npm run cap:run:android`

**完整命令**：`npm run cap:sync && npx cap run android`

**作用**：

1. 自动执行 `cap:sync`（构建 + 同步）
2. 在 Android 模拟器或连接的真机上启动应用

**使用场景**：

- 快速在 Android 设备上测试最新代码
- 不需要打开 Android Studio 的快速测试流程

**前置要求**：

- 已安装 Android Studio 和 SDK
- Android 模拟器已启动，或真机已连接并开启 USB 调试

**可选参数**：

```bash
# 列出可用设备
npx cap run android --list

# 指定设备
npx cap run android --target="设备ID"
```

---

## 🔄 典型开发流程

### Web 开发调试

```bash
npm run dev
# 在浏览器中访问 http://localhost:5173 进行开发
```

### iOS 真机测试流程

```bash
# 方式一：使用脚本（推荐）
npm run cap:run:ios

# 方式二：手动操作
npm run cap:sync          # 1. 构建并同步
npm run cap:open:ios      # 2. 打开 Xcode
# 3. 在 Xcode 中选择设备并运行
```

### Android 真机测试流程

```bash
# 方式一：使用脚本（推荐）
npm run cap:run:android

# 方式二：手动操作
npm run cap:sync          # 1. 构建并同步
npm run cap:open:android  # 2. 打开 Android Studio
# 3. 在 Android Studio 中选择设备并运行
```

### 打包发布流程

```bash
# iOS
npm run cap:sync          # 1. 同步最新代码
npm run cap:open:ios      # 2. 打开 Xcode
# 3. 在 Xcode 中 Product -> Archive 进行打包

# Android
npm run cap:sync          # 1. 同步最新代码
npm run cap:open:android  # 2. 打开 Android Studio
# 3. 在 Android Studio 中 Build -> Generate Signed Bundle/APK
```

---

## ⚠️ 常见问题

### 1. 运行 cap:sync 报错 "missing dist directory"

**原因**：未执行过 `npm run build`，没有 dist 目录

**解决**：先运行 `npm run build`

### 2. iOS 运行报错 "No profiles for ... were found"

**原因**：缺少开发证书和描述文件

**解决**：在 Xcode 中配置签名，或使用自动管理签名

### 3. Android 构建失败

**原因**：Gradle 配置问题或 SDK 版本不匹配

**解决**：

- 确保 Android Studio 已安装最新 SDK
- 检查 `android/build.gradle` 配置
- 尝试在 Android Studio 中 File -> Invalidate Caches / Restart

### 4. 修改代码后原生 App 没变化

**原因**：未重新同步代码

**解决**：每次修改后运行 `npm run cap:sync`

---

## 📚 更多资源

- [Capacitor 官方文档](https://capacitorjs.com/docs)
- [iOS 开发指南](https://capacitorjs.com/docs/ios)
- [Android 开发指南](https://capacitorjs.com/docs/android)
- [Capacitor 插件市场](https://capacitorjs.com/docs/plugins)
