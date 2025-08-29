#!/bin/bash

# Biến
APP_DIR="/var/www/semaglutide"
DEPLOY_DIR="$APP_DIR/dist"
BRANCH="main"

echo "🚀 Bắt đầu deploy Novo Nordisk Landing Page..."

# Di chuyển vào thư mục code
cd $APP_DIR || exit

# Pull code mới nhất
echo "📥 Pull code từ Git..."
git reset --hard
git pull origin $BRANCH

# Cài dependencies
echo "📦 Cài đặt dependencies bằng pnpm..."
pnpm install --frozen-lockfile

# Build project
echo "🏗️ Build project..."
pnpm build

# Đảm bảo quyền cho Nginx
echo "🔑 Set quyền cho Nginx..."
chown -R www-data:www-data $DEPLOY_DIR

echo "✅ Deploy hoàn tất! Vui lòng reload Nginx nếu cần."
