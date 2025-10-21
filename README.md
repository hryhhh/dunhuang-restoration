# 北齐壁画修复系统 (Beiqi Restoration System)

北齐壁画修复系统是一个基于现代Web技术构建的专业数字化修复平台，旨在为北齐壁画的数字化保护、修复和展示提供技术支持。

## 项目概述

本项目采用前沿的前端技术栈，包括 Vue 3、TypeScript 和 Vite，构建了一个高效、现代化的用户界面，用于北齐壁画的数字化修复工作。系统提供了直观的操作界面和强大的图像处理功能，帮助专业修复人员进行精确的壁画修复工作。

## 技术栈

- **Vue 3**: 渐进式JavaScript框架，提供响应式数据绑定和组件化开发
- **TypeScript**: JavaScript的超集，提供静态类型检查和更好的开发体验
- **Vite**: 新一代前端构建工具，提供快速的开发服务器和构建能力
- **Vue Test Utils & Vitest**: 单元测试工具链

## 开发环境配置

### 必需软件

在开始开发之前，请确保您的系统已安装以下软件：

- **Node.js** (版本 16.0 或更高): https://nodejs.org/
- **Git**: https://git-scm.com/
- **代码编辑器**: 推荐使用 [VSCode](https://code.visualstudio.com/)

### VSCode 配置推荐

我们强烈推荐使用 VSCode 作为主要开发工具，并安装以下扩展来获得最佳开发体验：

1. [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) - Vue 3 官方推荐的语言支持插件
2. [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) - JavaScript/TypeScript 代码规范检查
3. [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) - 代码格式化工具
4. [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) - 跨编辑器代码风格统一

## TypeScript 支持

由于 TypeScript 默认无法处理 `.vue` 导入的类型信息，项目使用 `vue-tsc` 替代 `tsc` 进行类型检查。在编辑器中需要安装 [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) 来使 TypeScript 语言服务识别 `.vue` 类型。

## 项目配置

详细配置请参考 [Vite 配置参考](https://vite.dev/config/)

## 快速开始

### 安装依赖

```
npm install
```

### 启动开发服务器

```
npm run dev
```

启动本地开发服务器，支持热重载功能，方便实时预览代码更改效果。

### 构建生产版本

```
npm run build
```

执行类型检查、编译并生成优化压缩的生产版本。


### 代码规范检查

```
npm run lint
```

使用 ESLint 检查代码规范。

## 目录结构

```
beiqi-restoration/
├── src/                 # 源代码目录
├── public/              # 静态资源目录
├── tests/               # 测试文件目录
├── vite.config.ts       # Vite 配置文件
├── tsconfig.json        # TypeScript 配置文件
└── package.json         # 项目依赖和脚本配置

```

## 功能特性

- 壁画图像高精度显示与缩放
- 多层次修复工具集
- 修复历史记录与撤销功能
- 图像对比分析工具
- 修复成果导出功能
- 响应式设计，适配多种设备屏幕

## 开发指南

1. 克隆项目仓库
2. 安装依赖: `npm install`
3. 启动开发服务器: `npm run dev`
4. 在浏览器中访问 `http://localhost:5173`

## 贡献指南

欢迎对北齐壁画修复系统进行贡献。在提交 Pull Request 前，请确保：

- 代码符合项目的 ESLint 规范
- 添加了相应的单元测试
- 更新了相关文档

## 许可证

MIT License

