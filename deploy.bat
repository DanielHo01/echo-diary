@echo off
REM echo-diary Windows 部署脚本
REM 使用方法: deploy.bat YOUR_GITHUB_USERNAME

setlocal

set GITHUB_USERNAME=%1
if "%GITHUB_USERNAME%"=="" set GITHUB_USERNAME=yourusername
set REPO_NAME=echo-diary

echo 🚀 开始部署 echo-diary 到 GitHub...
echo 📁 项目目录: %cd%
echo 👤 GitHub 用户名: %GITHUB_USERNAME%
echo.

REM 检查是否在项目目录
if not exist package.json (
  echo ❌ 错误: 找不到 package.json，请确保在项目根目录运行此脚本
  exit /b 1
)

REM 重命名分支为 main
echo 🌿 重命名分支为 main...
git branch -M main

REM 添加远程仓库
echo 🔗 添加远程仓库...
git remote remove origin 2>nul
git remote add origin "https://github.com/%GITHUB_USERNAME%/%REPO_NAME%.git"

REM 提交所有更改
echo 💾 提交代码...
git add .
git commit -m "feat: initialize project" 2>nul || echo ✓ 已是最新版本

REM 推送代码
echo 📤 推送到 GitHub...
git push -u origin main

echo.
echo ✅ 部署完成！
echo.
echo 📋 下一步操作:
echo    1. 访问 https://github.com/%GITHUB_USERNAME%/%REPO_NAME%
echo    2. 进入 Settings ^→ Pages
echo    3. 启用 GitHub Pages
echo    4. 等待 CI/CD 自动部署
echo.
echo 🔗 项目地址: https://%GITHUB_USERNAME%.github.io/%REPO_NAME%/

endlocal
pause
