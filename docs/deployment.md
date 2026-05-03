# Deploy — Anxiu Online Client-v2

> 目标机：**Debian 12** | 部署方式：**Next.js Standalone + PM2 + nginx**

---

## 0. 前置修改

在本地修改 `next.config.ts`，添加 `output: "standalone"`：

```ts
const nextConfig: NextConfig = {
  output: "standalone",   // <-- 新增
  reactStrictMode: true,
  images: { /* ... */ },
};
```

提交并推送到仓库，服务器上拉取即可。

---

## 1. 服务器初始化

```bash
apt update && apt upgrade -y
apt install -y curl git ufw
ufw allow OpenSSH
ufw enable
```

---

## 2. 安装 Node.js 20 LTS

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs
node -v   # 预期 v20.x
npm install -g yarn pm2
```

---

## 3. 安装 nginx

```bash
apt install -y nginx
ufw allow Nginx Full
systemctl enable nginx
```

---

## 4. 部署项目

```bash
mkdir -p /var/www/anxiu
cd /var/www/anxiu
git clone https://github.com/<user>/<repo>.git .
yarn install --ignore-engines
yarn gen
yarn build
```

---

## 5. 准备 Standalone 运行环境

```bash
cd /var/www/anxiu
cp -r public .next/standalone/
cp -r .velite .next/standalone/
mkdir -p .next/standalone/node_modules
cp -r node_modules/sharp .next/standalone/node_modules/

# 测试启动（Ctrl+C 停止）
cd .next/standalone
NODE_ENV=production PORT=3000 HOSTNAME=127.0.0.1 node server.js
```

---

## 6. PM2 进程守护

```bash
cd /var/www/anxiu

cat > ecosystem.config.cjs << "PM2EOF"
module.exports = {
  apps: [{
    name: "anxiu-blog",
    cwd: "/var/www/anxiu/.next/standalone",
    script: "server.js",
    env: {
      NODE_ENV: "production",
      PORT: 3000,
      HOSTNAME: "127.0.0.1",
    },
    instances: 1,
    exec_mode: "fork",
  }]
}
PM2EOF

pm2 start ecosystem.config.cjs
pm2 save
pm2 startup
```

验证：

```bash
curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:3000
# 预期: 200
```

---

## 7. Nginx 反向代理

```nginx
# /etc/nginx/sites-available/anxiu
server {
    listen 15457;
    server_name _;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";
    add_header X-XSS-Protection "1; mode=block";

    location /_next/static {
        alias /var/www/anxiu/.next/standalone/.next/static;
        expires 365d;
        add_header Cache-Control "public, immutable";
    }

    location /images {
        alias /var/www/anxiu/.next/standalone/public/images;
        expires 30d;
    }

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
ln -s /etc/nginx/sites-available/anxiu /etc/nginx/sites-enabled/
rm /etc/nginx/sites-enabled/default
nginx -t
systemctl reload nginx
```

验证：

```bash
curl -s -o /dev/null -w "%{http_code}" http://<服务器IP>
# 预期: 200
```

---

## 8. 部署脚本

创建 `/var/www/anxiu/deploy.sh`：

```bash
#!/bin/bash
set -e
cd /var/www/anxiu
git pull
yarn install --ignore-engines --frozen-lockfile
yarn gen
yarn build
cp -r public .next/standalone/
cp -r .velite .next/standalone/
cp -r node_modules/sharp .next/standalone/node_modules/
pm2 restart anxiu-blog
echo "Done"
```

```bash
chmod +x /var/www/anxiu/deploy.sh
```

后续更新：`cd /var/www/anxiu && bash deploy.sh`

---

## 9. 后续安全加固

### SSH 密钥登录

```bash
# 在本地执行
ssh-copy-id root@<服务器IP>
# 在服务器上禁用密码登录
sed -i 's/^#?PasswordAuthentication.*/PasswordAuthentication no/' /etc/ssh/sshd_config
systemctl restart sshd
```

### SSL 证书（有域名后）

```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d yourdomain.com
```

---

## 故障排查

| 现象 | 原因 | 解决 |
|------|------|------|
| 502 Bad Gateway | Node.js 未启动 | `pm2 status` 检查 |
| 403 Forbidden | nginx 权限 | 检查目录读取权限 |
| 图片 404 | public 未复制 | `cp -r public .next/standalone/` |
| 引擎错误 | Node 版本不兼容 | 使用 `--ignore-engines` |
