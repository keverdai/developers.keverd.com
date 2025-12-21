# Deployment Guide - developers.keverd.com

## Overview

This is a Next.js documentation site that can be deployed to a VPS or Vercel.

## GitHub Actions Workflow

The repository includes GitHub Actions workflows for automated CI/CD:

- **CI Workflow** (`.github/workflows/ci.yml`): Runs on pull requests and non-main branches
  - Lints code
  - Builds the application
  - Does not deploy

- **Deploy Workflow** (`.github/workflows/deploy.yml`): Runs on push to main/master
  - Lints code
  - Builds the application
  - Deploys to VPS via SSH

## Required GitHub Secrets

Configure the following secrets in your GitHub repository settings (Settings → Secrets and variables → Actions):

- `VPS_HOST`: Your VPS hostname or IP address
- `VPS_USER`: SSH username for the VPS
- `VPS_SSH_KEY`: Private SSH key for authentication
- `NEXT_PUBLIC_SITE_URL` (optional): The production URL (defaults to `https://developers.keverd.com`)

### Setting up SSH Key

1. Generate an SSH key pair (if you don't have one):
   ```bash
   ssh-keygen -t ed25519 -C "github-actions" -f ~/.ssh/github_actions_deploy
   ```

2. Copy the public key to your VPS:
   ```bash
   ssh-copy-id -i ~/.ssh/github_actions_deploy.pub user@your-vps-host
   ```

3. Add the private key to GitHub Secrets:
   - Go to your repository → Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `VPS_SSH_KEY`
   - Value: Contents of `~/.ssh/github_actions_deploy` (the private key)

## VPS Setup

### 1. Install Node.js and npm

```bash
# Using NodeSource repository (recommended)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

### 2. Create Application Directory

```bash
sudo mkdir -p /var/www/developers.keverd.com
sudo chown -R $USER:$USER /var/www/developers.keverd.com
cd /var/www/developers.keverd.com
```

### 3. Clone Repository (Initial Setup)

```bash
git clone https://github.com/your-org/developers.keverd.com.git .
```

### 4. Install Dependencies

```bash
npm ci
```

### 5. Build Application

```bash
export NODE_ENV=production
export NEXT_PUBLIC_SITE_URL=https://developers.keverd.com
npm run build
```

### 6. Set up Systemd Service

Create a systemd service file:

```bash
sudo nano /etc/systemd/system/developers-keverd-com.service
```

Add the following configuration:

```ini
[Unit]
Description=Keverd Developers Documentation Site
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/developers.keverd.com
Environment=NODE_ENV=production
Environment=NEXT_PUBLIC_SITE_URL=https://developers.keverd.com
ExecStart=/usr/bin/npm start
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

Enable and start the service:

```bash
sudo systemctl daemon-reload
sudo systemctl enable developers-keverd-com
sudo systemctl start developers-keverd-com
sudo systemctl status developers-keverd-com
```

### 7. Set up Nginx Reverse Proxy

Create Nginx configuration:

```bash
sudo nano /etc/nginx/sites-available/developers.keverd.com
```

Add configuration:

```nginx
server {
    listen 80;
    server_name developers.keverd.com;

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
}
```

Enable and test:

```bash
sudo ln -s /etc/nginx/sites-available/developers.keverd.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 8. Set up SSL with Let's Encrypt

```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d developers.keverd.com
```

## Alternative: PM2 Setup

If you prefer PM2 over systemd:

```bash
# Install PM2 globally
sudo npm install -g pm2

# Start the application
cd /var/www/developers.keverd.com
pm2 start npm --name "developers-keverd-com" -- start

# Save PM2 configuration
pm2 save

# Set up PM2 to start on boot
pm2 startup
# Follow the instructions provided
```

## Manual Deployment

If you need to deploy manually:

```bash
# SSH into server
ssh user@your-vps-host
cd /var/www/developers.keverd.com

# Pull latest changes
git pull origin main

# Install dependencies
npm ci

# Build application
export NODE_ENV=production
export NEXT_PUBLIC_SITE_URL=https://developers.keverd.com
npm run build

# Restart service
sudo systemctl restart developers-keverd-com
# OR if using PM2
pm2 restart developers-keverd-com
```

## Environment Variables

Create a `.env.production` file (optional, can also use systemd environment):

```bash
cd /var/www/developers.keverd.com
nano .env.production
```

Add:

```
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://developers.keverd.com
```

## Troubleshooting

### Build fails
- Check Node.js version (should be 18+)
- Verify all dependencies are installed: `npm ci`
- Check for TypeScript errors: `npm run build`

### Service won't start
- Check logs: `sudo journalctl -u developers-keverd-com -f`
- Verify Node.js path: `which node`
- Check file permissions: `ls -la /var/www/developers.keverd.com`

### Nginx 502 Bad Gateway
- Verify Next.js is running: `curl http://localhost:3000`
- Check Nginx error logs: `sudo tail -f /var/log/nginx/error.log`
- Verify proxy_pass URL matches Next.js port

### Port already in use
- Check what's using port 3000: `sudo lsof -i :3000`
- Kill the process or change Next.js port in systemd service

## Monitoring

### Check service status
```bash
sudo systemctl status developers-keverd-com
```

### View logs
```bash
# Systemd logs
sudo journalctl -u developers-keverd-com -f

# PM2 logs
pm2 logs developers-keverd-com
```

### Health check
```bash
curl http://localhost:3000
curl https://developers.keverd.com
```

