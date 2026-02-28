# DevisPro Deployment Guide

## Prerequisites

### Required Software
- **Node.js 16+** and npm
- **PowerShell 7+** (for OpenClaw automation)
- **Git** for version control
- **Linux/Windows Server** with public IP

### Recommended
- **Nginx** or **Apache** as reverse proxy
- **SSL Certificate** (Let's Encrypt)
- **Domain Name** (e.g., devispro.qc.ca)
- **PostgreSQL** or **MongoDB** (for production database)

---

## Production Deployment

### 1. Server Setup

#### Ubuntu/Debian Server
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18 LTS
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PowerShell
wget -q https://packages.microsoft.com/config/ubuntu/22.04/packages-microsoft-prod.deb
sudo dpkg -i packages-microsoft-prod.deb
sudo apt update
sudo apt install -y powershell

# Install Nginx
sudo apt install -y nginx

# Install certbot for SSL
sudo apt install -y certbot python3-certbot-nginx
```

### 2. Clone and Setup Application

```bash
# Create application directory
sudo mkdir -p /var/www/devispro
cd /var/www/devispro

# Clone repository
git clone https://github.com/brandonlacoste9-tech/thumbstack-.git .

# Install dependencies
npm install --production

# Create environment file
cp .env.example .env
nano .env  # Edit with production values
```

### 3. Configure Environment Variables

Edit `/var/www/devispro/.env`:

```bash
# Production Settings
PORT=3000
NODE_ENV=production

# RBQ API (GET REAL CREDENTIALS)
RBQ_API_ENDPOINT=https://api.rbq.gouv.qc.ca/licenses
RBQ_API_KEY=your_production_rbq_api_key

# WhatsApp Business API
WHATSAPP_ENABLED=true
WHATSAPP_API_KEY=your_production_whatsapp_key
WHATSAPP_API_URL=https://api.whatsapp.com/send

# Twilio SMS
SMS_ENABLED=true
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_PHONE_NUMBER=+15145551234

# Interac e-Transfer
INTERAC_ENABLED=true
INTERAC_API_KEY=your_interac_key
COMMISSION_RATE=0.15

# Security (GENERATE STRONG SECRETS)
JWT_SECRET=$(openssl rand -base64 32)
SESSION_SECRET=$(openssl rand -base64 32)

# Email (Production SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=noreply@devispro.qc.ca
SMTP_PASSWORD=your_email_password

# Frontend URL
FRONTEND_URL=https://devispro.qc.ca

# Admin
ADMIN_EMAIL=admin@devispro.qc.ca
ADMIN_PASSWORD=$(openssl rand -base64 16)
```

### 4. Setup Nginx Reverse Proxy

Create `/etc/nginx/sites-available/devispro`:

```nginx
server {
    listen 80;
    server_name devispro.qc.ca www.devispro.qc.ca;

    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name devispro.qc.ca www.devispro.qc.ca;

    # SSL certificates (managed by certbot)
    ssl_certificate /etc/letsencrypt/live/devispro.qc.ca/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/devispro.qc.ca/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;

    # Proxy to Node.js backend
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Static files caching
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        proxy_pass http://localhost:3000;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Logging
    access_log /var/log/nginx/devispro_access.log;
    error_log /var/log/nginx/devispro_error.log;
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/devispro /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 5. Setup SSL Certificate

```bash
sudo certbot --nginx -d devispro.qc.ca -d www.devispro.qc.ca
```

### 6. Setup Systemd Services

#### Backend Service

Create `/etc/systemd/system/devispro-backend.service`:

```ini
[Unit]
Description=DevisPro Backend Server
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/devispro
Environment=NODE_ENV=production
ExecStart=/usr/bin/node /var/www/devispro/src/backend/server.js
Restart=always
RestartSec=10
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=devispro-backend

[Install]
WantedBy=multi-user.target
```

#### OpenClaw Automation Service

Create `/etc/systemd/system/devispro-automation.service`:

```ini
[Unit]
Description=DevisPro OpenClaw Automation Engine
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/devispro
ExecStart=/usr/bin/pwsh /var/www/devispro/src/automation/openclaw-engine.ps1
Restart=always
RestartSec=10
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=devispro-automation

[Install]
WantedBy=multi-user.target
```

Enable and start services:
```bash
sudo systemctl daemon-reload
sudo systemctl enable devispro-backend
sudo systemctl enable devispro-automation
sudo systemctl start devispro-backend
sudo systemctl start devispro-automation
```

### 7. Setup Log Rotation

Create `/etc/logrotate.d/devispro`:

```
/var/log/nginx/devispro_*.log {
    daily
    missingok
    rotate 14
    compress
    delaycompress
    notifempty
    create 0640 www-data adm
    sharedscripts
    postrotate
        [ -f /var/run/nginx.pid ] && kill -USR1 `cat /var/run/nginx.pid`
    endscript
}
```

### 8. Setup Firewall

```bash
# Allow SSH, HTTP, and HTTPS
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

### 9. Setup Backup Script

Create `/var/www/devispro/backup.sh`:

```bash
#!/bin/bash
BACKUP_DIR="/var/backups/devispro"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR

# Backup data files
tar -czf $BACKUP_DIR/data_$DATE.tar.gz /var/www/devispro/src/data/

# Keep only last 30 days of backups
find $BACKUP_DIR -name "data_*.tar.gz" -mtime +30 -delete

echo "Backup completed: $DATE"
```

Make executable and add to crontab:
```bash
chmod +x /var/www/devispro/backup.sh

# Run daily at 2 AM
sudo crontab -e
0 2 * * * /var/www/devispro/backup.sh
```

### 10. Monitoring Setup

Install PM2 for process monitoring (alternative to systemd):
```bash
npm install -g pm2

# Start with PM2
pm2 start src/backend/server.js --name devispro-backend
pm2 start src/automation/openclaw-engine.ps1 --name devispro-automation --interpreter pwsh

# Save PM2 configuration
pm2 save
pm2 startup
```

---

## Post-Deployment Checklist

- [ ] All environment variables configured
- [ ] SSL certificate installed and working
- [ ] Backend service running and accessible
- [ ] OpenClaw automation engine running
- [ ] Nginx reverse proxy configured
- [ ] Firewall rules in place
- [ ] Log rotation configured
- [ ] Backup script scheduled
- [ ] Monitoring/alerting setup
- [ ] DNS records pointing to server
- [ ] Test all API endpoints
- [ ] Test contractor registration
- [ ] Test lead submission
- [ ] Test RBQ license validation
- [ ] Test WhatsApp/SMS notifications

---

## Verification

### Check Services
```bash
sudo systemctl status devispro-backend
sudo systemctl status devispro-automation
sudo systemctl status nginx
```

### Test API
```bash
curl https://devispro.qc.ca/api/health
```

### View Logs
```bash
sudo journalctl -u devispro-backend -f
sudo journalctl -u devispro-automation -f
sudo tail -f /var/log/nginx/devispro_access.log
```

---

## Maintenance

### Update Application
```bash
cd /var/www/devispro
git pull origin main
npm install --production
sudo systemctl restart devispro-backend
sudo systemctl restart devispro-automation
```

### Database Backup (when using real DB)
```bash
# PostgreSQL
pg_dump devispro > /var/backups/devispro/db_$(date +%Y%m%d).sql

# MongoDB
mongodump --db devispro --out /var/backups/devispro/db_$(date +%Y%m%d)
```

---

## Troubleshooting

### Backend not starting
```bash
# Check logs
sudo journalctl -u devispro-backend -n 50

# Check if port is already in use
sudo netstat -tulpn | grep 3000

# Test manually
cd /var/www/devispro
node src/backend/server.js
```

### Automation engine not running
```bash
# Check if PowerShell is installed
pwsh --version

# Test manually
pwsh src/automation/openclaw-engine.ps1
```

### SSL certificate issues
```bash
# Renew certificate
sudo certbot renew --dry-run
sudo certbot renew

# Check certificate expiry
sudo certbot certificates
```

---

## Support

For deployment support:
- Email: support@devispro.qc.ca
- Documentation: https://github.com/brandonlacoste9-tech/thumbstack-
