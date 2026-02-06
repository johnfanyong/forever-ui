# 贡献指南

感谢您对 Forever UI 的关注！我们欢迎任何形式的贡献。

## 开发环境搭建

```bash
# 克隆项目
git clone https://github.com/your-username/forever-ui.git
cd forever-ui

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 启动演示环境
pnpm demo:dev
```

## 代码规范

- 使用 TypeScript 编写所有代码
- 遵循 ESLint 和 Prettier 的代码风格
- 组件命名使用 PascalCase
- 文件命名使用 kebab-case

## 提交规范

提交信息遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```
<type>(<scope>): <subject>

<body>

<footer>
```

常用的 type 有：

- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 重构
- `test`: 测试相关
- `chore`: 构建过程或辅助工具的变动

## 开发流程

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'feat: add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 开启 Pull Request

## 组件开发要求

### 必须包含

- 组件实现文件 (`.vue`)
- 类型定义文件 (`.ts`)
- 测试文件 (`.test.ts`)
- 演示文件 (在 demo 目录下)
- 文档文件 (在 docs 目录下)

### 组件规范

```typescript
// 组件 Props 定义
interface Props {
  // 必须明确指定类型
  modelValue?: string;
  disabled?: boolean;
}

// 组件 Emits 定义
interface Emits {
  (e: "update:modelValue", value: string): void;
  (e: "change", value: string): void;
}

// 组件暴露的方法
interface Expose {
  focus: () => void;
  blur: () => void;
}
```

## 测试要求

- 每个组件都需要有对应的单元测试
- 测试覆盖率不低于 80%
- 包含边界情况测试

```bash
# 运行测试
pnpm test

# 运行测试并生成覆盖率报告
pnpm test:coverage
```

## 文档要求

- 每个组件必须有完整的 API 文档
- 包含基础用法和常见场景示例
- 提供在线演示链接
