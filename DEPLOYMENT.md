# 部署指南

## 前置要求

- GitHub 账户
- Git 已安装

## 部署步骤

### 方法 1：使用部署脚本（推荐）

**Windows 用户：**
```bash
deploy.bat YOUR_GITHUB_USERNAME
```

**Mac/Linux 用户：**
```bash
bash deploy.sh YOUR_GITHUB_USERNAME
```

### 方法 2：手动部署

**步骤 1：在 GitHub 创建仓库**

1. 打开 https://github.com/new
2. Repository name: `echo-diary`
3. Description: `基于 AI 的个人日记应用`
4. 选择 **Public**
5. **不要**勾选 "Add a README file"
6. 点击 "Create repository"

**步骤 2：推送代码**

```bash
cd echo-diary

# 重命名分支为 main
git branch -M main

# 添加远程仓库
git remote add origin https://github.com/YOUR_USERNAME/echo-diary.git

# 推送代码
git push -u origin main
```

**步骤 3：启用 GitHub Pages**

1. 进入仓库的 "Settings" 页面
2. 左侧菜单点击 "Pages"
3. 在 "Build and deployment" 部分：
   - Source: 选择 "GitHub Actions"
4. 等待 CI/CD 完成部署（约 2-5 分钟）

### 方法 3：使用 GitHub CLI

```bash
# 安装 GitHub CLI（如果未安装）
# Windows: winget install GitHub.cli
# macOS: brew install gh

# 登录 GitHub
gh auth login

# 创建仓库
gh repo create echo-diary --public --description "基于 AI 的个人日记应用"

# 推送代码
git branch -M main
git push -u origin main
```

## 验证部署

### 检查 CI/CD 状态

1. 进入仓库的 "Actions" 页面
2. 查看 "CI/CD Pipeline" 工作流状态
3. 确认所有步骤通过（绿色勾选）

### 访问部署的网站

- 开发环境: `http://localhost:5173`
- 生产环境: `https://YOUR_USERNAME.github.io/echo-diary/`

## 常见问题

### Q: GitHub Pages 没有更新？

A: 请检查以下内容：
1. CI/CD 是否成功运行
2. 分支是否为 `main`
3. 是否选择了正确的部署源

### Q: 部署后样式丢失？

A: 确保 `vite.config.ts` 中的 `base` 配置正确：
```typescript
export default defineConfig({
  base: '/echo-diary/',
  // ...
})
```

### Q: 如何更新已部署的网站？

A: 只需推送新代码到 `main` 分支，CI/CD 会自动重新部署：
```bash
git add .
git commit -m "feat: your changes"
git push
```

## 部署架构

```
GitHub Repository (main branch)
        │
        ▼
┌───────────────────┐
│  GitHub Actions   │
│  - Install deps   │
│  - Run lint       │
│  - Run tests      │
│  - Build          │
└────────┬──────────┘
         │
         ▼
┌───────────────────┐
│  GitHub Pages     │
│  (Production)     │
└───────────────────┘
         │
         ▼
   https://yourusername.github.io/echo-diary/
```

## 环境变量

项目不需要额外的环境变量即可构建。API Key 在运行时由用户输入。

## 性能监控

部署后可以监控以下指标：
- Lighthouse 分数
- 构建时间
- 包体积
- 页面加载时间

## 下一步

部署完成后，您可以：
1. 配置自定义域名（可选）
2. 启用 HTTPS
3. 配置 CDN 加速
4. 设置监控告警

## 相关文档

- [项目概述](./docs/PROJECT.md)
- [技术架构](./docs/ARCHITECTURE.md)
- [实施计划](./docs/IMPLEMENTATION-PLAN.md)
