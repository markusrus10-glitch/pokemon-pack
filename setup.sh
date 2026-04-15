#!/bin/bash
set -e

echo "=== [1/6] Updating system ==="
apt-get update -qq

echo "=== [2/6] Installing Node.js 20 ==="
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

echo "=== [3/6] Installing PM2 ==="
npm install -g pm2

echo "=== [4/6] Installing Nginx ==="
apt-get install -y nginx

echo "=== [5/6] Installing dependencies ==="
cd /var/www/pokemon
npm install --production

echo "=== [6/6] Starting app with PM2 ==="
pm2 delete pokemon 2>/dev/null || true
pm2 start server.js --name pokemon
pm2 save
pm2 startup systemd -u root --hp /root | tail -1 | bash

echo "=== Configuring Nginx ==="
cat > /etc/nginx/sites-available/pokemon << 'EOF'
server {
    listen 80 default_server;
    server_name _;

    client_max_body_size 4m;

    location / {
        proxy_pass         http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade $http_upgrade;
        proxy_set_header   Connection 'upgrade';
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

ln -sf /etc/nginx/sites-available/pokemon /etc/nginx/sites-enabled/pokemon
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx

echo ""
echo "======================================"
echo " ГОТОВО! Сервер запущен."
echo " Открывай: http://178.236.16.183"
echo "======================================"
