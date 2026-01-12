#!/bin/bash

# echo-diary GitHub 部署脚本
# 使用方法: bash deploy.sh YOUR_GITHUB_USERNAME

set -e

GITHUB_USERNAME=${1:-"yourusername"}
REPO_NAME="echo-diary"
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "🚀 开始部署 echo-diary 到 GitHub..."
echo "📁 项目目录: $PROJECT_DIR"
echo "👤 GitHub 用户名: $GITHUB_USERNAME"
echo ""

# 检查是否在项目目录
if [ ! -f "$PROJECT_DIR/package.json" ]; then
  echo "❌ 错误: 找不到 package.json，请确保在项目根目录运行此脚本"
  exit 1
fi

cd "$PROJECT_DIR"

# 检查 Git 是否初始化
if [ ! -d ".git" ]; then
  echo "📦 初始化 Git 仓库..."
  git init
fi

# 重命名分支为 main
echo "🌿 重命名分支为 main..."
git branch -M main

# 创建 README 如果不存在
if [ ! -f "README.md" ]; then
  echo "📝 创建 README.md..."
  cat > README.md << 'EOF'
# echo-diary

基于 AI 的个人日记应用

## 功能特性

- 📝 事件记录
- 🤖 AI 采访
- 📖 日记生成
- 🎨 多风格选择
- 📅 历史回顾
- 🌙 暗色主题

## 快速开始

```bash
pnpm install
pnpm dev
```
EOF
fi

# 添加远程仓库
echo "🔗 添加远程仓库..."
git remote remove origin 2>/dev/null || true
git remote add origin "https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"

# 提交所有更改
echo "💾 提交代码..."
git add .
git commit -m "feat: initialize project" 2>/dev/null || echo "✓ 已是最新版本"

# 推送代码
echo "📤 推送到 GitHub..."
git push -u origin main

echo ""
echo "✅ 部署完成！"
echo ""
echo "📋 下一步操作:"
echo "   1. 访问 https://github.com/$GITHUB_USERNAME/$REPO_NAME"
echo "   2. 进入 Settings → Pages"
echo "   3. 启用 GitHub Pages"
echo "   4. 等待 CI/CD 自动部署"
echo ""
echo "🔗 项目地址: https://$GITHUB_USERNAME.github.io/$REPO_NAME/"
