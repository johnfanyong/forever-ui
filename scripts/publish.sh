#!/bin/bash

# Forever UI 发布脚本

set -e

echo "🚀 开始发布 Forever UI 到 npm..."

# 1. 检查 Git 状态
echo "1️⃣ 检查 Git 状态..."
if [[ $(git diff --stat) != '' ]]; then
  echo "❌ 有未提交的更改，请先提交所有更改"
  exit 1
fi

# 2. 运行测试
echo "2️⃣ 运行测试..."
pnpm test:run

# 3. 类型检查
echo "3️⃣ 类型检查..."
pnpm type-check

# 4. 构建项目
echo "4️⃣ 构建项目..."
pnpm build

# 5. 更新版本号
echo "5️⃣ 更新版本号..."
echo "请选择版本更新类型:"
echo "1) Patch (0.0.1)"
echo "2) Minor (0.1.0)"
echo "3) Major (1.0.0)"
read -p "请输入选择 (1-3): " choice

case $choice in
  1) npm version patch ;;
  2) npm version minor ;;
  3) npm version major ;;
  *) echo "无效选择"; exit 1 ;;
esac

# 6. 准备发布文件
echo "6️⃣ 准备发布文件..."

# 复制发布专用的 README
cp README.publish.md README.md

# 复制发布专用的 package.json
cp package.publish.json package.json

# 7. 发布到 npm
echo "7️⃣ 发布到 npm..."

# 检查是否有 NPM_TOKEN 环境变量
if [ -n "$NPM_TOKEN" ]; then
  echo "检测到 NPM_TOKEN 环境变量，使用令牌发布"
  npm config set //registry.npmjs.org/:_authToken $NPM_TOKEN
  npm publish --access public
elif [ -f ".env" ]; then
  echo "检测到 .env 文件，加载环境变量"
  source .env
  if [ -n "$NPM_TOKEN" ]; then
    npm config set //registry.npmjs.org/:_authToken $NPM_TOKEN
    npm publish --access public
  else
    echo "❌ .env 文件中未找到 NPM_TOKEN"
    exit 1
  fi
else
  echo "请选择发布方式:"
  echo "1) 正式发布到 npm (需要 2FA 或已配置令牌)"
  echo "2) 发布到测试注册表"
  echo "3) 仅构建和验证 (dry-run)"
  read -p "请输入选择 (1-3): " publish_choice
  
  case $publish_choice in
    1) npm publish --access public ;;
    2) npm publish --registry https://registry.npmjs.org/ --tag test ;;
    3) npm publish --dry-run ;;
    *) echo "无效选择"; exit 1 ;;
  esac
fi

# 8. 推送 Git 标签
echo "8️⃣ 推送 Git 标签..."
git push origin main --tags

# 9. 恢复开发环境文件
echo "9️⃣ 恢复开发环境文件..."
git checkout HEAD -- README.md package.json

echo "✅ 发布完成！"
echo "📦 包已成功发布到 npm"
echo "🌐 访问 https://www.npmjs.com/package/forever-ui 查看"