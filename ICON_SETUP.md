# 应用图标配置指南

## 📱 iOS 图标配置

### 方法一：使用现有图标文件（推荐）

你已经准备好了 iOS 图标，位于 `public/iosBuildIcon/`。

#### 步骤：

1. **打开 Xcode**
   ```bash
   npm run cap:open:ios
   ```

2. **在 Xcode 中配置图标**
   - 在左侧项目导航器中，点击 `App` 项目
   - 选择 `App` target
   - 点击 `General` 标签
   - 找到 `App Icons and Launch Screen` 部分
   - 点击 `App Icon` 下拉菜单，选择 `AppIcon`

3. **替换图标文件**
   - 在 Xcode 左侧导航器中，找到 `App/Assets.xcassets/AppIcon.appiconset`
   - 将你的图标文件拖入对应的尺寸框中

#### 图标尺寸对应关系：

| 文件名 | 尺寸 | 用途 |
|--------|------|------|
| `ios_icon_1024x1024.png` | 1024×1024 | App Store |
| `ios_icon_180x180.png` | 180×180 | iPhone (60pt @3x) |
| `ios_icon_120x120.png` | 120×120 | iPhone (60pt @2x) |
| `ios_icon_152x152.png` | 152×152 | iPad (76pt @2x) |
| `ios_icon_167x167.png` | 167×167 | iPad Pro (83.5pt @2x) |
| `ios_icon_80x80.png` | 80×80 | iPhone Spotlight (40pt @2x) |
| `ios_icon_87x87.png` | 87×87 | iPhone Settings (29pt @3x) |
| `ios_icon_60x60.png` | 60×60 | iPhone (60pt @1x) |
| `ios_icon_58x58.png` | 58×58 | iPhone Settings (29pt @2x) |
| `ios_icon_40x40.png` | 40×40 | iPad/iPhone Spotlight (40pt @1x) |
| `ios_icon_29x29.png` | 29×29 | Settings (29pt @1x) |
| `ios_icon_20x20.png` | 20×20 | Notifications (20pt @1x) |

---

### 方法二：使用脚本自动复制（快速）

创建一个脚本自动复制图标文件：

```bash
# 在项目根目录创建脚本
cat > copy-icons.sh << 'EOF'
#!/bin/bash

# iOS 图标源目录
IOS_ICON_SOURCE="public/iosBuildIcon"
IOS_ICON_DEST="ios/App/App/Assets.xcassets/AppIcon.appiconset"

# 复制 iOS 图标
echo "📱 复制 iOS 图标..."

# 1024x1024 - App Store
cp "$IOS_ICON_SOURCE/ios_icon_1024x1024.png" "$IOS_ICON_DEST/AppIcon-1024.png"

# iPhone 图标
cp "$IOS_ICON_SOURCE/ios_icon_180x180.png" "$IOS_ICON_DEST/AppIcon-60@3x.png"
cp "$IOS_ICON_SOURCE/ios_icon_120x120.png" "$IOS_ICON_DEST/AppIcon-60@2x.png"
cp "$IOS_ICON_SOURCE/ios_icon_87x87.png" "$IOS_ICON_DEST/AppIcon-29@3x.png"
cp "$IOS_ICON_SOURCE/ios_icon_80x80.png" "$IOS_ICON_DEST/AppIcon-40@2x.png"
cp "$IOS_ICON_SOURCE/ios_icon_58x58.png" "$IOS_ICON_DEST/AppIcon-29@2x.png"
cp "$IOS_ICON_SOURCE/ios_icon_40x40.png" "$IOS_ICON_DEST/AppIcon-40.png"
cp "$IOS_ICON_SOURCE/ios_icon_20x20.png" "$IOS_ICON_DEST/AppIcon-20.png"

# iPad 图标
cp "$IOS_ICON_SOURCE/ios_icon_152x152.png" "$IOS_ICON_DEST/AppIcon-76@2x.png"
cp "$IOS_ICON_SOURCE/ios_icon_76x76.png" "$IOS_ICON_DEST/AppIcon-76.png"

echo "✅ iOS 图标复制完成！"
EOF

# 添加执行权限
chmod +x copy-icons.sh

# 运行脚本
./copy-icons.sh
```

---

## 🤖 Android 图标配置

Android 需要多个分辨率的图标。

### 生成 Android 图标

1. **使用在线工具生成**
   - 访问：https://icon.kitchen/ 或 https://romannurik.github.io/AndroidAssetStudio/
   - 上传你的 1024x1024 图标
   - 下载生成的资源包

2. **或手动创建不同尺寸**

   需要以下尺寸：
   ```
   mipmap-mdpi/     48×48
   mipmap-hdpi/     72×72
   mipmap-xhdpi/    96×96
   mipmap-xxhdpi/   144×144
   mipmap-xxxhdpi/  192×192
   ```

3. **复制到 Android 项目**
   ```bash
   # 解压下载的资源包，复制到
   android/app/src/main/res/
   ```

### 手动创建 Android 图标脚本

如果你有 ImageMagick 工具：

```bash
# 安装 ImageMagick
brew install imagemagick

# 创建脚本
cat > create-android-icons.sh << 'EOF'
#!/bin/bash

SOURCE="public/iosBuildIcon/ios_icon_1024x1024.png"
ANDROID_RES="android/app/src/main/res"

# 创建目录
mkdir -p "$ANDROID_RES/mipmap-mdpi"
mkdir -p "$ANDROID_RES/mipmap-hdpi"
mkdir -p "$ANDROID_RES/mipmap-xhdpi"
mkdir -p "$ANDROID_RES/mipmap-xxhdpi"
mkdir -p "$ANDROID_RES/mipmap-xxxhdpi"

# 生成不同尺寸
echo "🤖 生成 Android 图标..."

convert "$SOURCE" -resize 48x48 "$ANDROID_RES/mipmap-mdpi/ic_launcher.png"
convert "$SOURCE" -resize 72x72 "$ANDROID_RES/mipmap-hdpi/ic_launcher.png"
convert "$SOURCE" -resize 96x96 "$ANDROID_RES/mipmap-xhdpi/ic_launcher.png"
convert "$SOURCE" -resize 144x144 "$ANDROID_RES/mipmap-xxhdpi/ic_launcher.png"
convert "$SOURCE" -resize 192x192 "$ANDROID_RES/mipmap-xxxhdpi/ic_launcher.png"

# 圆形图标
convert "$SOURCE" -resize 48x48 "$ANDROID_RES/mipmap-mdpi/ic_launcher_round.png"
convert "$SOURCE" -resize 72x72 "$ANDROID_RES/mipmap-hdpi/ic_launcher_round.png"
convert "$SOURCE" -resize 96x96 "$ANDROID_RES/mipmap-xhdpi/ic_launcher_round.png"
convert "$SOURCE" -resize 144x144 "$ANDROID_RES/mipmap-xxhdpi/ic_launcher_round.png"
convert "$SOURCE" -resize 192x192 "$ANDROID_RES/mipmap-xxxhdpi/ic_launcher_round.png"

echo "✅ Android 图标生成完成！"
EOF

chmod +x create-android-icons.sh
./create-android-icons.sh
```

---

## 🎨 使用 Capacitor Assets 插件（最简单）

Capacitor 官方推荐使用 `@capacitor/assets` 工具：

### 安装

```bash
npm install -D @capacitor/assets
```

### 配置

1. 创建 `assets` 目录结构：
   ```
   resources/
   ├── icon.png          # 1024x1024 或更大
   └── splash.png        # 2732x2732 启动屏（可选）
   ```

2. 复制你的图标：
   ```bash
   mkdir -p resources
   cp public/iosBuildIcon/ios_icon_1024x1024.png resources/icon.png
   ```

3. 生成所有平台图标：
   ```bash
   npx capacitor-assets generate
   ```

4. 这会自动生成：
   - iOS 所有尺寸的图标
   - Android 所有尺寸的图标
   - 启动屏（如果提供）

---

## 🔄 同步到原生项目

配置完图标后，记得同步：

```bash
npm run cap:sync
```

---

## 📝 在 package.json 中添加图标脚本

```json
{
  "scripts": {
    "icons:generate": "npx capacitor-assets generate",
    "icons:copy": "./copy-icons.sh",
    "cap:sync:icons": "npm run icons:generate && npm run cap:sync"
  }
}
```

---

## ✅ 验证图标

### iOS
1. 在 Xcode 中查看 Assets.xcassets
2. 运行应用在模拟器查看主屏幕图标

### Android
1. 在 Android Studio 中查看 `res/mipmap-*` 目录
2. 运行应用在模拟器查看启动器图标

---

## 💡 推荐流程

**最简单的方式（推荐）：**

```bash
# 1. 安装 assets 工具
npm install -D @capacitor/assets

# 2. 准备图标
mkdir -p resources
cp public/iosBuildIcon/ios_icon_1024x1024.png resources/icon.png

# 3. 自动生成所有尺寸
npx capacitor-assets generate

# 4. 同步到原生项目
npm run cap:sync

# 5. 在 Xcode/Android Studio 中验证
npm run cap:open:ios
npm run cap:open:android
```

这样就完成了！🎉
