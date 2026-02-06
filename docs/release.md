# 发布流程

## 版本号规范

遵循 [Semantic Versioning](https://semver.org/) 规范：

- **MAJOR**: 不兼容的 API 修改
- **MINOR**: 向后兼容的功能新增
- **PATCH**: 向后兼容的问题修复

## 发布步骤

### 1. 准备发布

```bash
# 确保所有测试通过
pnpm test

# 检查类型
pnpm type-check

# 构建项目
pnpm build

# 验证构建产物
pnpm demo:build
```

### 2. 更新版本号

```bash
# 更新 package.json 版本
npm version patch  # 或 minor, major

# 这会自动创建 git tag
```

### 3. 发布到 npm

```bash
# 登录 npm
npm login

# 发布
npm publish
```

### 4. 推送代码

```bash
# 推送代码和标签
git push origin main --tags
```

## 自动化发布

推荐使用 GitHub Actions 实现自动化发布：

```yaml
# .github/workflows/release.yml
name: Release
on:
  push:
    tags:
      - "v*"

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          registry-url: https://registry.npmjs.org/

      - run: pnpm install
      - run: pnpm test
      - run: pnpm build
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{secrets.NPM_TOKEN}}
```

## 发布检查清单

- [ ] 所有测试通过
- [ ] 类型检查通过
- [ ] 构建成功
- [ ] 演示环境正常
- [ ] 文档已更新
- [ ] CHANGELOG 已更新
- [ ] 版本号已更新
- [ ] Git 标签已创建
