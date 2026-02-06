# Forever UI

一个基于 Vue 3 和 TypeScript 的现代化 UI 组件库。

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

## 开发指南

```bash
# 安装依赖
pnpm install

# 启动组件库开发服务器
pnpm dev

# 启动演示环境
pnpm demo:dev

# 构建生产版本
pnpm build

# 运行测试
pnpm test

# 代码检查
pnpm lint
```

## 浏览器支持

- Chrome ≥ 80
- Firefox ≥ 74
- Safari ≥ 13
- Edge ≥ 80

## License

MIT
