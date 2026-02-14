# 插画作者个人作品站

一个专业的插画作品展示网站，采用深色主题设计，具有现代化的交互体验和响应式布局。

## 🎨 功能特色

### 核心功能
- **瀑布流布局** - Pinterest风格的图片展示，自动适应不同尺寸
- **图片查看器** - 点击放大查看，支持键盘导航和触摸手势
- **无限滚动加载** - 平滑的滚动加载更多内容体验
- **分类筛选** - 按作品类型快速筛选展示
- **响应式设计** - 完美适配桌面、平板和移动设备

### 交互体验
- **流畅动画** - 使用Anime.js实现丰富的过渡效果
- **悬停效果** - 图片悬停时显示详细信息和放大效果
- **加载动画** - 优雅的加载状态和进度指示
- **移动端优化** - 触摸友好的交互设计

## 📁 项目结构

```
/
├── index.html              # 主页面 - 作品展示
├── about.html              # 关于页面 - 艺术家介绍
├── contact.html            # 联系页面 - 联系方式表单
├── main.js                 # 主要JavaScript功能
├── resources/              # 资源文件夹
│   ├── images/            # 本地图片存储
│   │   ├── illustration1.png
│   │   ├── illustration2.png
│   │   └── ...
│   └── data/
│       └── images.json    # 图片配置文件
├── design.md              # 设计文档
├── interaction.md         # 交互设计文档
└── outline.md             # 项目大纲
```

## 🚀 使用方法

### 1. 添加新作品

#### 方法一：使用配置文件（推荐）
编辑 `resources/data/images.json` 文件，添加新的作品信息：

```json
{
  "id": 16,
  "title": "新作品标题",
  "url": "图片链接或本地路径",
  "category": "作品分类",
  "date": "2024-10-11",
  "description": "作品描述",
  "tags": ["标签1", "标签2"],
  "width": 1024,
  "height": 1536
}
```

#### 方法二：添加本地图片
1. 将图片文件放入 `resources/images/` 目录
2. 在 `images.json` 中添加对应的配置信息

### 2. 管理分类

在 `images.json` 中的 `categories` 数组可以管理作品分类：

```json
{
  "categories": ["All", "Fantasy", "Sci-Fi", "Portrait", "Abstract", "Surreal"]
}
```

### 3. 调整加载数量

修改 `images.json` 中的 `loadMoreCount` 值，控制每次加载的作品数量：

```json
{
  "loadMoreCount": 6
}
```

## 🎨 设计特色

### 视觉风格
- **深色主题** - 专业的深灰色背景，突出作品展示
- **金色点缀** - 温暖的金色作为强调色，增加艺术感
- **现代字体** - Playfair Display + Inter 字体组合
- **毛玻璃效果** - 导航栏和卡片使用backdrop-filter效果

### 技术实现
- **HTML5 + CSS3** - 语义化标记和现代CSS特性
- **Tailwind CSS** - 快速样式开发框架
- **Vanilla JavaScript** - 原生JavaScript实现交互
- **Anime.js** - 流畅的动画效果库
- **Masonry布局** - 响应式瀑布流布局

## 📱 响应式支持

### 断点设计
- **桌面端** (1200px+) - 4-5列瀑布流布局
- **平板端** (768px-1200px) - 3列布局
- **移动端** (480px-768px) - 2列布局
- **小屏幕** (<480px) - 1列布局

### 设备优化
- **触摸友好** - 移动端优化的按钮和交互
- **性能优化** - 图片懒加载和无限滚动
- **键盘支持** - 完整的键盘导航功能

## 🔧 自定义配置

### 修改主题色彩
在CSS中修改CSS变量：

```css
:root {
  --bg-primary: #1a1a1a;      /* 主背景色 */
  --accent-gold: #d4af37;     /* 强调色 */
  --text-primary: #e5e5e5;    /* 主文字色 */
}
```

### 调整动画效果
在 `main.js` 中修改动画配置：

```javascript
// 修改动画时长和缓动函数
anime({
  duration: 1000,        // 动画时长
  easing: 'easeOutExpo'  // 缓动函数
});
```

## 🌐 部署说明

### 本地运行
1. 下载所有文件到本地目录
2. 使用Python启动本地服务器：
   ```bash
   python -m http.server 8000
   ```
3. 访问 `http://localhost:8000`

### 生产部署
- 支持静态网站托管（GitHub Pages, Netlify, Vercel等）
- 确保所有资源文件路径正确
- 建议使用CDN加速图片加载

## 📋 浏览器支持

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 📝 许可证

本项目仅供学习和展示使用，所有作品版权归原作者所有。

## 🤝 贡献

欢迎提交Issue和Pull Request来改进这个项目。

---

**享受您的艺术创作之旅！** 🎨✨