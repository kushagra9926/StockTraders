# AWS Deployment Guide

## Architecture

```
Internet
    |
CloudFront CDN
    |
S3 Bucket (Frontend React App + Admin Dashboard)
    |
EC2 Instance (Node.js Backend API)
    |
MongoDB Atlas (Database)
```

## Step 1: Setup MongoDB Atlas
1. Go to https://www.mongodb.com/atlas
2. Create a free cluster
3. Get connection string: `mongodb+srv://user:pass@cluster.mongodb.net/stocktrading`
4. Whitelist all IPs or your EC2 IP

## Step 2: Launch EC2 Instance
1. Go to AWS Console → EC2
2. Launch instance → Ubuntu 22.04 → t2.micro (free tier)
3. Create key pair and download .pem file
4. In Security Group, allow port 22 (SSH) and 5000 (API)

## Step 3: Setup Backend on EC2
```bash
# SSH into EC2
ssh -i your-key.pem ubuntu@YOUR_EC2_IP

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 (process manager)
sudo npm install -g pm2

# Clone repo
git clone https://github.com/yourname/stock-trading-platform.git
cd stock-trading-platform/backend

# Setup .env
cp .env.example .env
nano .env  # Fill in your values

# Install dependencies and start
npm install --production
pm2 start server.js --name stock-api
pm2 startup  # Auto-start on reboot
pm2 save
```

## Step 4: Deploy Frontend to S3
```bash
# Build frontend
cd frontend
npm run build

# Create S3 bucket
# AWS Console → S3 → Create bucket
# Enable static website hosting
# Set index.html as index document

# Upload build folder
aws s3 sync build/ s3://your-bucket-name --acl public-read
```

## Step 5: Setup CloudFront (Optional but recommended)
1. AWS Console → CloudFront → Create Distribution
2. Origin: your S3 bucket
3. Enable HTTPS
4. Set default root object: index.html

## Environment Variables for Production

### Backend (.env on EC2)
```
PORT=5000
MONGO_URI=mongodb+srv://...
JWT_SECRET=a_very_long_random_secret_key
NODE_ENV=production
```

### Frontend (set at build time)
```
REACT_APP_API_URL=http://YOUR_EC2_IP:5000
```

## Cost Estimate (Free Tier)
- EC2 t2.micro: FREE (750 hrs/month)
- S3: FREE (5GB storage)
- MongoDB Atlas: FREE (512MB)
- CloudFront: ~$0 for low traffic

Total for small project: **~$0/month** 🎉
