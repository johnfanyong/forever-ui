# Forever UI Demo

这是 Forever UI 组件库的本地开发演示环境。

## 启动开发服务器

```bash
# 在 demo 目录下
pnpm install
pnpm dev
```

## 目录结构

```
demo/
├── src/
│   ├── App.vue           # 主应用组件
│   ├── main.ts          # 入口文件
│   └── examples/        # 各组件演示页面
│       ├── Home.vue     # 首页
│       ├── ButtonDemo.vue    # Button 组件演示
│       └── QueryBuilderDemo.vue # QueryBuilder 组件演示
├── index.html           # HTML 模板
└── vite.config.ts      # Vite 配置
```

## 开发流程

1. 在 `src/examples/` 目录下创建对应组件的演示页面
2. 在 `App.vue` 中添加导航路由
3. 实时预览组件效果
4. 测试组件的各种使用场景

## 注意事项

- 演示环境直接引用 `../src` 目录下的源码
- 修改源码后会实时热更新
- 可以用来测试组件的各种边界情况
