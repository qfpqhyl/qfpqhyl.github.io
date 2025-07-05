# qfpqhyl 个人作品集

一个现代化的个人作品集网站，使用 Vue 3 和 Vite 构建，展示 qfpqhyl 的项目作品和技能。

## 🌟 功能特性

- ✨ 现代化响应式设计
- 🎯 动态项目展示，支持分类筛选
- 📱 完全响应式布局，适配所有设备
- 🎨 优美的动画效果和交互体验
- ⚡ 基于 Vue 3 Composition API
- 📊 项目统计和技能展示
- 🌐 GitHub API 集成
- 📧 联系表单集成
- 📝 **博客功能**，支持 Markdown 文章管理

## 🛠️ 技术栈

- **前端框架**: Vue 3 (Composition API)
- **构建工具**: Vite
- **样式**: CSS3 (Grid & Flexbox)
- **JavaScript**: ES6+
- **数据**: JSON 配置文件
- **Markdown 解析**: marked

## 📁 项目结构

```
qfpqhyl-portfolio/
├── src/
│   ├── components/          # Vue 组件
│   │   ├── HeaderNav.vue    # 导航栏
│   │   ├── HeroSection.vue  # 英雄区域
│   │   ├── AboutSection.vue # 关于我
│   │   ├── SkillsSection.vue # 技能展示
│   │   ├── ProjectsSection.vue # 项目展示
│   │   ├── BlogSection.vue  # 博客文章
│   │   ├── ContactSection.vue # 联系方式
│   │   └── ScrollToTop.vue  # 回到顶部
│   ├── assets/
│   │   └── main.css        # 全局样式
│   ├── App.vue             # 主应用组件
│   └── main.js             # 应用入口
├── blogs/                   # 博客文章 (Markdown)
│   ├── welcome-to-blog.md
│   ├── vue3-development-tips.md
│   └── python-data-analysis-tips.md
├── public/                 # 静态资源
│   └── blogs/              # 博客文章公共访问
├── projects-config.json    # 项目配置文件
├── package.json           # 项目依赖
└── vite.config.js         # Vite 配置
```

## 🚀 开始使用

### 克隆项目
```bash
git clone https://github.com/qfpqhyl/VueTest.git
cd VueTest
```

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

### 预览生产版本
```bash
npm run preview
```

## ⚙️ 配置说明

项目的主要配置信息存储在 `projects-config.json` 文件中，包括：

- **用户信息**: 个人资料、联系方式、技能
- **项目分类**: 不同类型项目的分类配置
- **项目列表**: 所有项目的详细信息

### 自定义配置

1. 修改 `projects-config.json` 中的用户信息
2. 更新项目列表和分类
3. 调整技能水平和描述
4. 自定义联系方式和社交链接

## 🎨 主要区域

### 🏠 英雄区 (Hero)
- 个人介绍和头像展示
- 关键统计数据
- 行动号召按钮

### 👤 关于我 (About)
- 个人背景和技能概述
- 项目分类展示
- 社交链接

### 💪 技能 (Skills)
- 技术栈可视化展示
- 技能熟练度进度条
- 技能统计和标签

### 💼 作品 (Projects)
- 项目分类筛选
- 特色项目突出展示
- 项目详细信息和链接
- 项目统计数据

### 📞 联系 (Contact)
- 多种联系方式
- 交互式联系表单
- 工作状态展示

## 📊 项目统计

- **总项目数**: 10 个
- **GitHub Stars**: 60+
- **编程语言**: 6 种
- **项目分类**: 4 大类

## 🌐 在线预览

[查看在线演示](https://vue-test-weld-nine.vercel.app)

## 📝 开发说明

### 添加新项目

1. 在 `projects-config.json` 的 `projects` 数组中添加新项目
2. 设置项目基本信息：名称、描述、分类、语言等
3. 配置项目链接和标签

### 管理博客文章

1. 在 `blogs/` 目录中创建新的 Markdown 文件
2. 在 `BlogSection.vue` 的 `articles` 数组中添加文章信息
3. 复制文章到 `public/blogs/` 目录供访问
4. 文章支持完整的 Markdown 语法，包括代码高亮、列表、链接等

### 修改样式

- 全局样式：修改 `src/assets/main.css`
- 组件样式：修改对应组件的 `<style scoped>` 部分
- 主题色彩：在 CSS 变量中调整主题色

### 部署

项目可以部署到任何静态网站托管服务：

- **Vercel**: 推荐，自动部署
- **Netlify**: 简单配置
- **GitHub Pages**: 免费选择

## 🤝 贡献

欢迎提交 Issues 和 Pull Requests！

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 👨‍💻 作者

**qfpqhyl**
- GitHub: [@qfpqhyl](https://github.com/qfpqhyl)
- 邮箱: qfpqhyl@gmail.com
- 网站: [qfpqhyl.github.io](https://qfpqhyl.github.io)

---

⭐ 如果这个项目对你有帮助，请给它一个 Star！