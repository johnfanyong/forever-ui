# Forever UI

一个基于 Vue 3 和 TypeScript 的现代化 UI 组件库。

[![npm version](https://img.shields.io/npm/v/forever-ui.svg)](https://www.npmjs.com/package/forever-ui)
[![License](https://img.shields.io/npm/l/forever-ui.svg)](https://github.com/your-username/forever-ui/blob/main/LICENSE)
[![Downloads](https://img.shields.io/npm/dt/forever-ui.svg)](https://www.npmjs.com/package/forever-ui)

## 特性

- 🎯 基于 Vue 3 Composition API
- 💪 完整的 TypeScript 支持
- 📦 按需引入，支持 Tree Shaking
- 🎨 支持主题定制
- 🧪 完整的单元测试覆盖
- 📚 详细的文档说明

## 安装

```bash
# npm
npm install forever-ui

# yarn
yarn add forever-ui

# pnpm
pnpm add forever-ui
```

## 快速开始

### 全量引入

```javascript
import { createApp } from "vue";
import ForeverUI from "forever-ui";
import "forever-ui/style.css";

const app = createApp(App);
app.use(ForeverUI);
```

### 按需引入

```javascript
import { Button } from "forever-ui";
import "forever-ui/style.css";

// 或者
import Button from "forever-ui/button";
```

## 组件列表

- [Button 按钮](./docs/components/button.md)
- [QueryBuilder 查询构建器](./docs/components/query-builder.md)

## 浏览器支持

- Chrome ≥ 80
- Firefox ≥ 74
- Safari ≥ 13
- Edge ≥ 80

## 开发

```bash
# 克隆项目
git clone https://github.com/your-username/forever-ui.git
cd forever-ui

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 运行测试
pnpm test
```

## 贡献

欢迎提交 Issue 和 Pull Request！

## License

MIT
